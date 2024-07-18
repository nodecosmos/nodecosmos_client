import {
    FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import React from 'react';
import { Field } from 'react-final-form';
/* mui */

interface Props {
    name: string;
    values: string[];
    labels?: string[];
    defaultValue?: string;
    disabled?: boolean[];
}

const FIELD_SUBSCRIPTION = {
    touched: true,
    error: true,
    value: true,
    submitError: true,
    dirtySinceLastSubmit: true,
};

export default function FinalFormRadioField(props: Props) {
    const {
        name, defaultValue = null, values, labels = null, disabled = [],

    } = props;

    return (
        <Field
            name={name}
            type="radio"
            subscription={FIELD_SUBSCRIPTION}
        >
            {({ input }) => (
                <RadioGroup
                    defaultValue={defaultValue}
                    aria-label={name}
                    name={input.name}
                    value={input.value}
                    onChange={input.onChange}
                >
                    {values.map((value, index) => (
                        <FormControlLabel
                            disabled={disabled[index]}
                            key={value}
                            value={value}
                            control={<Radio color="primary" />}
                            label={(labels && labels[index]) || value}
                        />
                    ))}
                </RadioGroup>
            )}
        </Field>
    );
}
