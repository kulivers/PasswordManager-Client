// Types for registration form
export interface RegistrationFormData {
  fullName: string;
  companyName: string;
}

// Types for validation
export interface FormValidation {
  fullName: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
  accountType: {
    required: boolean;
  };
  companyName: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
}

// Types for form errors
export interface FormErrors {
  fullName?: string;
  accountType?: string;
  companyName?: string;
}

// Types for select options
export interface SelectOption {
  value: string;
  label: string;
}

// Types for progress steps
export interface ProgressStep {
  number: number;
  title: string;
  active: boolean;
}

// Types for component props
export interface FormFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

export interface SelectFieldProps extends FormFieldProps {
  options: SelectOption[];
}

export interface ProgressIndicatorProps {
  steps: readonly ProgressStep[];
  currentStep: number;
}

