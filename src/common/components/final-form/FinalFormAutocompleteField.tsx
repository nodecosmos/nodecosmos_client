import FinalFormAutocompleteInputField from './FinalFormAutocompleteInputField';
import { Autocomplete } from '@mui/material';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';
import React, { useCallback } from 'react';
import { useForm } from 'react-final-form';

interface FinalFormAutocompleteFieldProps {
    freeSolo?: boolean;
    options: ReadonlyArray<string>;
    name: string;
    placeholder: string;
    renderOption?: (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: string,
    ) => React.ReactNode;
    startAdornment?: React.ReactNode;
    setAutocompleteValue: (value: string) => void;
}

export default function FinalFormAutocompleteField(props: FinalFormAutocompleteFieldProps) {
    const {
        freeSolo = false,
        options,
        name,
        placeholder,
        renderOption,
        startAdornment = null,
        setAutocompleteValue,
    } = props;
    const { change } = useForm();

    const onChange = useCallback((_event: React.SyntheticEvent, value: string | null) => {
        if (value) {
            change(name, value);
            setAutocompleteValue(value);
        }
    }, [change, name, setAutocompleteValue]);

    const renderInput = useCallback((params: AutocompleteRenderInputParams) => (
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
    ), [name, placeholder, startAdornment]);

    return (
        <Autocomplete
            freeSolo={freeSolo}
            selectOnFocus
            options={options}
            renderOption={renderOption}
            onChange={onChange}
            renderInput={renderInput}
        />
    );
}
