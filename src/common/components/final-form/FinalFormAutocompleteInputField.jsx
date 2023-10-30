/* eslint-disable react/jsx-no-duplicate-props */
import { TextField } from '@mui/material';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
/* mui */

const composeValidators = (validators) => (value, values) => (
    validators.reduce((error, validator) => error || validator(value, values), undefined)
);

const requiredValidator = (value) => (
    value ? undefined : 'is required'
);

const maxLengthValidator = (maxLength) => (value) => (
    (value && (value.length > maxLength)) ? `${value.length}/${maxLength} length limit` : undefined
);

const minLengthValidator = (minLength) => (value) => (
    (value && (value.length < minLength)) ? `${value.length}/${minLength} minimum length` : undefined
);

export default function FinalFormAutocompleteInputField({
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
    inputProps,
    placeholder,
    InputLabelProps,
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
                    placeholder={placeholder}
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
                    inputProps={inputProps}
                    InputLabelProps={InputLabelProps}
                />
            )}
        </Field>
    );
}

FinalFormAutocompleteInputField.defaultProps = {
    label: null,
    sx: null,
    validate: null,
    type: 'text',
    disabled: false,
    multiline: false,
    fullWidth: false,
    InputProps: null,
    inputProps: null,
    InputLabelProps: null,
    /* validators */
    required: false,
    maxLength: null,
    minLength: null,
    placeholder: null,
};

FinalFormAutocompleteInputField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    validate: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    type: PropTypes.string,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    fullWidth: PropTypes.bool,
    sx: PropTypes.object,
    InputProps: PropTypes.object,
    InputLabelProps: PropTypes.object,
    inputProps: PropTypes.object,
    /* validators */
    required: PropTypes.bool,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
};
