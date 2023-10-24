import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Field } from 'react-final-form';

export default function FinalFormCheckbox({
    name, label, value, 
}) {
    return (
        <Field
            name={name}
            type="checkbox"
            value={value}
            render={({ input }) => (
                <FormControlLabel
                    sx={{
                        mt: 1,
                        pr: 2,
                        borderRadius: 1,
                    }}
                    componentsProps={{
                        typography: {
                            ml: 1,
                            color: 'text.primary',
                            fontWeight: 700,
                            sx: {
                                '&:hover': {
                                    color: 'text.link',
                                    textDecoration: 'underline',
                                },
                            },
                        },
                    }}
                    label={label}
                    control={(
                        <Checkbox
                            checked={input.checked}
                            value={value}
                            onChange={input.onChange}
                            name={input.name}
                        />
                    )}
                />
            )}
        />
    );
}

FinalFormCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};
