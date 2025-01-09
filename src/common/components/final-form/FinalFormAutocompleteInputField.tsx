
import { TextField } from '@mui/material';
import { FieldValidator } from 'final-form';
import React from 'react';
import { Field } from 'react-final-form';
/* mui */

function composeValidators<FieldValue>(validators: FieldValidator<FieldValue>[]) {
    return (value: FieldValue, values: object) => (
        validators.reduce((error, validator) => error || validator(value, values), undefined)
    );
}

function requiredValidator<FieldValue>(value: FieldValue) {
    return value ? undefined : 'is required';
}

function maxLengthValidator(maxLength: number) {
    return (value: string) => (
        (value && (value.length > maxLength)) ? `${value.length}/${maxLength} length limit` : undefined
    );
}

function minLengthValidator(minLength: number) {
    return (value: string) => (
        (value && (value.length < minLength)) ? `${value.length}/${minLength} minimum length` : undefined
    );
}

interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    validate?: ((value: string) => string) | ((value: string) => string)[];
    type?: string;
    disabled?: boolean;
    multiline?: boolean;
    fullWidth?: boolean;
    sx?: object;
    InputProps?: object;
    InputLabelProps?: object;
    inputProps?: object;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
}

export default function FinalFormAutocompleteInputField(props: Props) {
    const {
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
    } = props;

    const validators = [];

    if (required) validators.push(requiredValidator);
    if (maxLength) validators.push(maxLengthValidator(maxLength));
    if (minLength) validators.push(minLengthValidator(minLength));
    if (validate) [validate].flat().forEach((validator) => validators.push(validator));

    const validateFun = (validators.length && composeValidators(validators)) || undefined;

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
                        '& .MuiInputBase-input': { p: label ? '28px 14px 14px' : 2 },
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
