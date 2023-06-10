import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormControlLabel, Checkbox, useTheme } from '@mui/material';

function FinalFormCheckboxTree({
  options,
  name,
}) {
  const theme = useTheme();

  const nodeBackgroundColors = theme.palette.tree.backgrounds;
  const bgCount = nodeBackgroundColors.length;

  const renderOption = (option, nestedLevel = 0) => (
    <Field
      type="checkbox"
      key={option.value}
      name={`${name}.${option.value}`}
      render={({ input }) => (
        <Box>
          <FormControlLabel
            componentsProps={{ typography: { color: nodeBackgroundColors[nestedLevel % bgCount] } }}
            label={option.label}
            control={(
              <Checkbox
                onChange={input.onChange}
                name={input.name}
                sx={{ color: nodeBackgroundColors[nestedLevel % bgCount] }}
              />
            )}
          />
          <Box
            sx={{ borderLeft: '1px dashed', borderColor: nodeBackgroundColors[nestedLevel % bgCount] }}
            ml={1.125}
            pl={4}
          >
            {option.children && option.children.map((child) => renderOption(child, nestedLevel + 1))}
          </Box>
        </Box>
      )}
    />
  );

  return (
    <Box>
      {options && options.map((option) => renderOption(option))}
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
