import { ValidatorConfig } from '@app/shared/models/form-config.model';

export const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const MOBILE_REGEX = /^[0-9]{10}$/;

// Check for at least one lowercase letter
export const LOWER_CASE_REGEX = /[a-z]/;

// Check for at least one uppercase letter
export const UPPER_CASE_REGEX = /[A-Z]/;

// Check for at least one digit
export const DIGIT_REGEX = /\d/;

// Check for at least one special character(@!$%&*#)
export const SPECIAL_CHAR_REGEX = /^(?=.*[@!$%&*#]).*/;

// Combine all the regexes into a single regex
const passwordRegex = new RegExp(
  `${LOWER_CASE_REGEX.source}${UPPER_CASE_REGEX.source}${DIGIT_REGEX.source}`
);

// Check for a password length of at least 8 characters
export const PASSWORD_LENGTH_REGEX = /.{8, }/;

// Combine all the individual regexes to validate the password
export const PASSWORD_REGEX = new RegExp(`${passwordRegex.source}${PASSWORD_LENGTH_REGEX.source}`);

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
      message: 'Password must contain at least one special character',
    },
  ],
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long',
  },
};
