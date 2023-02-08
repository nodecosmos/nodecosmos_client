import React from 'react';
import * as PropTypes from 'prop-types';
import { Field } from 'react-final-form';
/* mui */
import { TextField } from '@mui/material';

const composeValidators = (validators) => (value, values) => (
  validators.reduce((error, validator) => error || validator(value, values), undefined)
);

const requiredValidator = (value) => (
  value ? undefined : 'is required'
);

const maxLengthValidator = (maxLength) => (value) => (
  (value && value.length > maxLength) ? `${value.length}/${maxLength} length limit` : undefined
);

const minLengthValidator = (minLength) => (value) => (
  (value && value.length < minLength) ? `${value.length}/${minLength} minimum length` : undefined
);

export default function FinalFormInputField({
  name,
  label,
  validate,
  type,
  disabled,
  multiline,
  fullWidth,
  required,
  maxLength,
  minLength,
  sx,
  InputProps,
}) {
  const validators = [];

  if (required) validators.push(requiredValidator);
  if (maxLength) validators.push(maxLengthValidator(maxLength));
  if (minLength) validators.push(minLengthValidator(minLength));
  if (validate) [validate].flat().forEach((validator) => validators.push(validator));

  const validateFun = (validators.length && composeValidators(validators)) || null;

  return (
    <Field
      name={name}
      validate={validateFun}
      subscription={{
        touched: true,
        error: true,
        value: true,
        submitError: true,
        dirtySinceLastSubmit: true,
      }}
    >
      {({ input, meta }) => (
        <TextField
          sx={{
            '& .MuiInputBase-input': {
              p: label ? '28px 14px 14px' : 2,
            },
            ...sx,
          }}
          color="primary"
          variant="outlined"
          label={label}
          name={input.name}
          value={input.value}
          onChange={input.onChange}
          error={(meta.error || (!meta.dirtySinceLastSubmit && meta.submitError)) && meta.touched}
          helperText={meta.touched && (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))}
          type={type}
          disabled={disabled}
          multiline={multiline}
          fullWidth={fullWidth}
          rows={7}
          InputProps={InputProps}
        />
      )}
    </Field>
  );
}

FinalFormInputField.defaultProps = {
  label: null,
  sx: null,
  validate: null,
  type: 'text',
  disabled: false,
  multiline: false,
  fullWidth: false,
  InputProps: null,
  /* validators */
  required: false,
  maxLength: null,
  minLength: null,
};

FinalFormInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validate: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
  InputProps: PropTypes.object,
  /* validators */
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
};
