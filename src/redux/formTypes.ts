export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  isEmail?: boolean;
  isPassword?: boolean;
}

export interface DerivedField {
  parentFields: string[];
  formula: string;
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  defaultValue?: string;
  options?: string[];
  validations?: ValidationRules;
  derived?: DerivedField;
}

export interface FormSchema {
  name: string;
  createdAt: string;
  fields: FormField[];
}
