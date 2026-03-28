import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { schemaFormA } from '../../constants/form-schemas';
import type { FormFieldSchema } from '../../interfaces/form-schema.interface';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-form-a',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './form-a.component.html',
  styleUrl: './form-a.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAComponent {
  readonly schema: FormFieldSchema[] = schemaFormA;
  readonly formId = 'formA';

  constructor(private readonly toast: ToastService) {}

  onSubmitted(): void {
    this.toast.show('Personal information submitted successfully.');
  }
}
