import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import type { FormFieldSchema } from '../../interfaces/form-schema.interface';
import type { FormValues } from '../../services/form-state.service';
import { FormStateService } from '../../services/form-state.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) schema!: FormFieldSchema[];
  @Input({ required: true }) formId!: string;

  @Output() readonly submitted = new EventEmitter<FormValues>();

  public form!: FormGroup;

  private valueChangesSub = Subscription.EMPTY;
  private clearedAllSub = Subscription.EMPTY;

  constructor(
    private readonly formState: FormStateService,
    private readonly toast: ToastService,
    private readonly cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.rebuildForm();
    const stored = this.formState.getFormState(this.formId);
    if (stored) {
      this.form.patchValue(stored, { emitEvent: false });
    }

    this.valueChangesSub = this.form.valueChanges.subscribe(() => {
      this.cdr.markForCheck();
    });

    this.clearedAllSub = this.formState.clearedAll$.subscribe(() => {
      this.resetToDefaults();
    });
  }

  ngOnDestroy(): void {
    this.valueChangesSub.unsubscribe();
    this.clearedAllSub.unsubscribe();
    this.persistCurrentValue();
  }

  trackField(_index: number, field: FormFieldSchema): string {
    return field.name;
  }

  saveToStore(): void {
    this.persistCurrentValue();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.cdr.markForCheck();
      return;
    }
    const value = this.form.getRawValue() as FormValues;
    this.formState.setFormState(this.formId, value);
    this.submitted.emit(value);
    this.cdr.markForCheck();
  }

  clearStoredAndReset(): void {
    this.formState.clearForm(this.formId);
    this.resetToDefaults();
  }

  clearAllStored(): void {
    this.formState.clearAll();
    this.toast.show('All saved form data cleared.');
    this.cdr.markForCheck();
  }

  /** Rebuild empty controls (no persisted values). */
  resetToDefaults(): void {
    this.rebuildForm();
    this.cdr.markForCheck();
  }

  private rebuildForm(): void {
    const controls: Record<string, ReturnType<FormBuilder['control']>> = {};
    for (const field of this.schema) {
      controls[field.name] = this.createControl(field);
    }
    this.form = this.fb.group(controls);
  }

  private createControl(field: FormFieldSchema) {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.type === 'email') {
      validators.push(Validators.email);
    }

    if (field.type === 'checkbox') {
      return this.fb.nonNullable.control(false, validators);
    }

    return this.fb.control<string | null>('', validators);
  }

  private persistCurrentValue(): void {
    if (!this.form) {
      return;
    }
    this.formState.setFormState(this.formId, this.form.getRawValue() as FormValues);
  }

  protected showFieldError(controlName: string): boolean {
    const c = this.form.get(controlName);
    return !!c && c.invalid && c.touched;
  }

  protected fieldErrorMessage(controlName: string): string {
    const c = this.form.get(controlName);
    if (!c?.errors || !c.touched) {
      return '';
    }
    if (c.errors['required']) {
      return 'This field is required.';
    }
    if (c.errors['email']) {
      return 'Enter a valid email address.';
    }
    return 'Invalid value.';
  }
}
