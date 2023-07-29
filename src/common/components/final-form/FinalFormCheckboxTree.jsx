import React from 'react';
import {
  Box, FormControlLabel, Checkbox, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

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
          <Box display="flex" alignItems="center">
            {
              nestedLevel > 1
              && (
              <Box
                ml={-4}
                height="0px"
                width="50px"
                borderTop="1px dashed"
                borderColor="borders.5"
              />
              )
            }
            <FormControlLabel
              sx={{
                borderColor: nodeBackgroundColors[nestedLevel % bgCount],
                borderRadius: 1,
              }}
              componentsProps={{
                typography: {
                  whiteSpace: 'nowrap',
                  ml: 1,
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
          </Box>
          <Box
            sx={{ borderLeft: '1px dashed', borderColor: 'borders.5' }}
            ml={nestedLevel > 1 ? 3.5 : 1}
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
