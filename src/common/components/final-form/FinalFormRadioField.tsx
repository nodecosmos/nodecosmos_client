import {
    FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import React from 'react';
import { Field } from 'react-final-form';
/* mui */

interface Props {
    name: string;
    values: string[] | boolean[] | number[];
    labels?: string[];
    disabled?: boolean[];
}

const FIELD_SUBSCRIPTION = {
    touched: true,
    error: true,
    value: true,
    submitError: true,
    initial: true,
    dirtySinceLastSubmit: true,
};

export default function FinalFormRadioField(props: Props) {
    const {
        name, values, labels = null, disabled = [],

    } = props;

    return (
        <Field
            name={name}
            type="radio"
            subscription={FIELD_SUBSCRIPTION}
        >
            {({ input, meta }) => (
                <RadioGroup
                    defaultValue={meta.initial}
                    aria-label={name}
                    name={input.name}
                    value={input.value}
                    onChange={input.onChange}
                >
                    {values.map((value, index) => (
                        <FormControlLabel
                            disabled={disabled[index]}
                            key={value.toString()}
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
