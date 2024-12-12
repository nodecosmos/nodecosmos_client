/* eslint-disable react/jsx-no-bind */
import { TextField } from '@mui/material';
import { FieldValidator } from 'final-form';
import React from 'react';
import { Field } from 'react-final-form';
/* mui */

function composeValidators<Val> (validators: FieldValidator<Val>[]): FieldValidator<Val> {
    return (value: Val, allValues: object) => validators.reduce(
        (error, validator) => error || validator(value, allValues), undefined,
    );
}

function requiredValidator<Val> (value: Val) {
    return value ? undefined : 'is required';
}

function maxLengthValidator (maxLength: number) {
    return (value: string) => (value && (value.length > maxLength))
        ? `${value.length}/${maxLength} length limit` : undefined;
}

function minLengthValidator (minLength: number) {
    return (value: string) => (value && (value.length < minLength))
        ? `${value.length}/${minLength} minimum length` : undefined;
}

interface FinalFormInputFieldProps<Val> {
    className?: string;
    name: string;
    label?: string;
    helperText?: string;
    validate?: FieldValidator<Val> | FieldValidator<Val>[];
    type?: string;
    disabled?: boolean;
    multiline?: boolean;
    fullWidth?: boolean;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    InputProps?: object;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FinalFormInputField<Val>(props: FinalFormInputFieldProps<Val>) {
    const {
        className,
        label = null,
        name,
        validate,
        type = 'text',
        helperText = null,
        disabled = false,
        multiline = false,
        fullWidth = false,
        InputProps,
        /* validators */
        required = false,
        maxLength = null,
        minLength = null,
        placeholder,
        onChange,
    } = props;

    const validators = [];

    if (required) validators.push(requiredValidator);
    if (maxLength) validators.push(maxLengthValidator(maxLength));
    if (minLength) validators.push(minLengthValidator(minLength));
    if (validate) [validate].flat().forEach((validator) => validators.push(validator));

    const validateFun = (validators.length && composeValidators(validators)) || undefined;
    const labelClassName = label ? 'InputFieldWithLabel' : 'InputField';
    const classN = className ? `${className} ${labelClassName}` : labelClassName;

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
                    // sx={{
                    //     '& .MuiInputBase-input': { p: label ? '24px 14px 14px' : 2 },
                    //     '.MuiInputAdornment-root': { color: 'texts.foreground' },
                    //     ...sx,
                    // }}
                    className={classN}
                    color="primary"
                    variant="outlined"
                    label={label}
                    placeholder={placeholder}
                    name={input.name}
                    value={input.value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        input.onChange(event);
                        if (onChange) onChange(event);
                    }}
                    error={(meta.error || (!meta.dirtySinceLastSubmit && meta.submitError)) && meta.touched}
                    helperText={
                        (meta.touched && (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))) || helperText
                    }
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
