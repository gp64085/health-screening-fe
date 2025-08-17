export type FormFieldType =
  | 'inputText'
  | 'inputNumber'
  | 'inputTextarea'
  | 'password'
  | 'calendar'
  | 'dropdown'
  | 'radioButton'
  | 'checkbox'
  | 'multiSelect';

export type InputType = 'text' | 'number' | 'email' | 'url' | 'tel' | 'date' | 'time' | 'color';

type PatternValidation = {
  value: RegExp;
  message: string;
};

export interface ValidatorConfig {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  pattern?: PatternValidation | PatternValidation[];
  email?: boolean | string;
  custom?: { validator: (value: unknown) => boolean; message: string };
}

export interface FormFieldOption {
  value: unknown;
  label: string;
  disabled?: boolean;
  icon?: string;
}

export interface FormFieldConfig<T = unknown> {
  type: FormFieldType;
  inputType?: InputType;
  name: string;
  label: string;
  placeholder?: string;
  value?: T;
  validation?: ValidatorConfig;
  options?: FormFieldOption[];
  disabled?: boolean;
  visible?: boolean;
  styleClass?: string;
  optionLabel?: string; // For dropdown/multiSelect
  optionValue?: string; // For dropdown/multiSelect
  filter?: boolean; // For dropdown/multiSelect
  rows?: number; // For textarea
  cols?: number; // For textarea
  dateFormat?: string; // For calendar
  showTime?: boolean; // For calendar
  hourFormat?: '12' | '24'; // For calendar
  dependencies?: string[];
  showClearButton?: boolean; // For calendar and select
}

export interface FormButtonConfig {
  type: 'submit' | 'button' | 'reset';
  label: string;
  disabled?: boolean;
  styleClass?: string;
  icon?: string;
  onClick?: () => void;
}

export interface FormConfig<T = Record<string, unknown>> {
  id: string;
  fields: FormFieldConfig[];
  buttons: FormButtonConfig[];
  styleClass?: string;
  initialData?: Partial<T>;
  autoReset?: boolean;
  responsive?: boolean;
}

export type FormData<T extends FormConfig> = {
  [K in T['fields'][number]['name']]: unknown;
};
