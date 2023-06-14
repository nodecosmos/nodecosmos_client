import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import { searchNode } from '../../nodesSlice';

export default function ImportSearchField({ rootNodeId }) {
  const dispatch = useDispatch();

  return (
    <TextField
      sx={{
        width: '350px',
        '.MuiInputBase-root': {
          borderRadius: 1,
          height: 50,
          backgroundColor: 'toolbar.searchField',
        },
        input: { fontFamily: 'Roboto' },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ p: 1, color: 'toolbar.default' }}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
            />
          </InputAdornment>
        ),
      }}
      onChange={(event) => dispatch(searchNode({
        rootId: rootNodeId,
        value: event.target.value,
      }))}
      color="primary"
      variant="outlined"
      placeholder="Search"
    />
  );
}

ImportSearchField.propTypes = {
  rootNodeId: PropTypes.string.isRequired,
};
