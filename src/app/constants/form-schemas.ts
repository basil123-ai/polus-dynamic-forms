import type { FormFieldSchema } from '../interfaces/form-schema.interface';

export const schemaFormA: FormFieldSchema[] = [
  { type: 'text', label: 'Full Name', name: 'fullName', required: true },
  { type: 'email', label: 'Email Address', name: 'email', required: true },
  { type: 'text', label: 'Phone Number', name: 'phone' },
  { type: 'textarea', label: 'Address', name: 'address' },
  { type: 'textarea', label: 'Address Line 2', name: 'addressLine2' },
  { type: 'textarea', label: 'About You', name: 'about' },
  { type: 'checkbox', label: 'Subscribe to Newsletter', name: 'subscribe' },
];

export const schemaFormB: FormFieldSchema[] = [
  { type: 'text', label: 'Username', name: 'username', required: true },
  { type: 'email', label: 'Work Email', name: 'workEmail' },
  { type: 'text', label: 'Company Name', name: 'company' },
  { type: 'text', label: 'Job Title', name: 'jobTitle' },
  { type: 'textarea', label: 'Work Address', name: 'workAddress' },
  { type: 'checkbox', label: 'Available for Opportunities', name: 'available' },
];