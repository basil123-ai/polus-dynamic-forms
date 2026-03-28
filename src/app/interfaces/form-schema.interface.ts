export type FormFieldType = 'text' | 'email' | 'password' | 'textarea' | 'checkbox';

export interface FormFieldSchema {
  type: FormFieldType;
  label: string;
  name: string;
  required?: boolean;
}
