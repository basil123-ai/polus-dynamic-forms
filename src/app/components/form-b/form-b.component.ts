import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { schemaFormB } from '../../constants/form-schemas';
import type { FormFieldSchema } from '../../interfaces/form-schema.interface';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-form-b',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './form-b.component.html',
  styleUrl: './form-b.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBComponent {
  readonly schema: FormFieldSchema[] = schemaFormB;
  readonly formId = 'formB';

  constructor(private readonly toast: ToastService) {}

  onSubmitted(): void {
    this.toast.show('Professional information submitted successfully.');
  }
}
