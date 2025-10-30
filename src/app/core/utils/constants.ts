import type { ValidatorConfig } from '@app/shared/models/form-config.model';

export const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const MOBILE_REGEX = /^[0-9]{10}$/;

// Check for at least one lowercase letter (anywhere in the string)
export const LOWER_CASE_REGEX = /(?=.*[a-z])/;

// Check for at least one uppercase letter (anywhere in the string)
export const UPPER_CASE_REGEX = /(?=.*[A-Z])/;

// Check for at least one digit (anywhere in the string)
export const DIGIT_REGEX = /(?=.*\d)/;

// Check for at least one special character (anywhere in the string)
export const SPECIAL_CHAR_REGEX = /(?=.*[!@#$%^&*])/;

// Check for a password length of 8-20 characters
export const PASSWORD_LENGTH_REGEX = /^.{8,20}$/;

export const EMAIL_FIELD_VALIDATION: ValidatorConfig = {
  required: '*Email is required',
  pattern: {
    value: EMAIL_REGEX,
    message: 'Please enter a valid email address',
  },
};

export const PASSWORD_FIELD_VALIDATION: ValidatorConfig = {
  required: '*Password is required',
  pattern: [
    {
      value: LOWER_CASE_REGEX,
      message: 'Password must contain at least one lowercase letter',
    },
    {
      value: UPPER_CASE_REGEX,
      message: 'Password must contain at least one uppercase letter',
    },
    {
      value: DIGIT_REGEX,
      message: 'Password must contain at least one number',
    },
    {
      value: SPECIAL_CHAR_REGEX,
      message: 'Password must contain one of the following special characters: @!$%&*^#',
    },
  ],
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long',
  },
  maxLength: {
    value: 20,
    message: 'Password must be at most 20 characters long',
  },
};
