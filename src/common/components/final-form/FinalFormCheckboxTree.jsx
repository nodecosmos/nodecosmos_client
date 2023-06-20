import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormControlLabel, Checkbox, useTheme } from '@mui/material';

function FinalFormCheckboxTree({
  options,
  name,
  initialNestedLevel,
}) {
  const theme = useTheme();

  const nodeBackgroundColors = theme.palette.tree.backgrounds;
  const bgCount = nodeBackgroundColors.length;

  const renderOption = (option, nestedLevel = initialNestedLevel) => (
    <Field
      key={option.value}
      name={name}
      type="checkbox"
      value={option.value}
      render={({ input }) => (
        <Box>
          <FormControlLabel
            sx={{
              mt: 1,
              borderColor: nodeBackgroundColors[nestedLevel % bgCount],
              pr: 2,
              borderRadius: 1,
            }}
            componentsProps={{
              typography: {
                color: 'text.secondary',
                sx: {
                  '&:hover': {
                    color: 'text.link',
                    textDecoration: 'underline',
                  },
                },
              },
            }}
            label={option.label}
            control={(
              <Checkbox
                checked={input.checked}
                value={option.value}
                onChange={input.onChange}
                name={input.name}
                sx={{
                  color: nodeBackgroundColors[nestedLevel % bgCount],
                }}
              />
              )}
          />
          <Box
            sx={{ borderLeft: '1px dashed', borderColor: 'borders.5' }}
            ml={1.125}
            pl={4}
          >
            {option.children && option.children.map((child) => renderOption(child, nestedLevel + 1))}
          </Box>
        </Box>
      )}
    />
  );

  return options && options.map((option) => renderOption(option));
}

FinalFormCheckboxTree.defaultProps = {
  initialNestedLevel: 0,
};

FinalFormCheckboxTree.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.array,
  })).isRequired,
  name: PropTypes.string.isRequired,
  initialNestedLevel: PropTypes.number,
};

export default FinalFormCheckboxTree;
