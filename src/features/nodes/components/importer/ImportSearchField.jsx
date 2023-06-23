import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { searchNode } from '../../nodesSlice';

export default function ImportSearchField({ rootId }) {
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(searchNode({
      rootId,
      value: '',
    }));
  }, [dispatch, rootId]);

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
        rootId,
        value: event.target.value,
      }))}
      color="primary"
      variant="outlined"
      placeholder="Search"
    />
  );
}

ImportSearchField.propTypes = {
  rootId: PropTypes.string.isRequired,
};
