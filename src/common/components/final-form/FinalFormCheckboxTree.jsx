import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormControlLabel, Checkbox } from '@mui/material';

function FinalFormCheckboxTree({
  options,
  name,
}) {
  const renderOption = (option) => (
    <Field
      type="checkbox"
      key={option.value}
      name={`${name}.${option.value}`}
      render={({ input }) => (
        <Box ml={2}>
          <FormControlLabel
            label={option.label}
            control={(
              <Checkbox onChange={input.onChange} name={input.name} />
            )}
          />
          {option.children && option.children.map((child) => renderOption(child))}
        </Box>
      )}
    />
  );

  return (
    <Box ml={-2}>
      {options.map((option) => renderOption(option))}
    </Box>
  );
}

FinalFormCheckboxTree.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.array,
  })).isRequired,
  name: PropTypes.string.isRequired,
};

export default FinalFormCheckboxTree;
