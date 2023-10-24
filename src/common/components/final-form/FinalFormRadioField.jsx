import React from 'react';
import * as PropTypes from 'prop-types';
import { Field } from 'react-final-form';
/* mui */
import {
    FormControlLabel, Radio, RadioGroup, 
} from '@mui/material';

function FinalFormRadioField(props) {
    const {
        name, defaultValue, values, labels, 
    } = props;

    return (
        <Field
            name={name}
            type="radio"
            subscription={{
                touched: true,
                error: true,
                value: true,
                submitError: true,
                dirtySinceLastSubmit: true,
            }}
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

FinalFormRadioField.defaultProps = {
    defaultValue: null,
    labels: null,
};

FinalFormRadioField.propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    labels: PropTypes.array,
    defaultValue: PropTypes.string,
};

export default FinalFormRadioField;
