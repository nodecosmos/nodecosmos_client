/* eslint-disable react/jsx-no-duplicate-props */
import FinalFormAutocompleteInputField from './FinalFormAutocompleteInputField';
import { Autocomplete } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-final-form';

export default function FinalFormAutocompleteField({
    freeSolo,
    options,
    name,
    placeholder,
    renderOption,
    startAdornment,
    setAutocompleteValue,
}) {
    const { change } = useForm();

    return (
        <Autocomplete
            freeSolo={freeSolo}
            selectOnFocus
            options={options}
            renderOption={renderOption}
            onChange={(event, value) => {
                if (value) {
                    change(name, value);
                    setAutocompleteValue(value);
                }
            }}
            renderInput={(params) => (
                <FinalFormAutocompleteInputField
                    name={name}
                    placeholder={placeholder}
                    required
                    disabled={params.disabled}
                    InputLabelProps={params.InputLabelProps}
                    fullWidth={params.fullWidth}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment,
                    }}
                    inputProps={params.inputProps}
                />
            )}
        />
    );
}

FinalFormAutocompleteField.defaultProps = {
    freeSolo: false,
    startAdornment: null,
    setAutocompleteValue: () => {},
};

FinalFormAutocompleteField.propTypes = {
    freeSolo: PropTypes.bool,
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    renderOption: PropTypes.func.isRequired,
    startAdornment: PropTypes.element,
    setAutocompleteValue: PropTypes.func,
};
