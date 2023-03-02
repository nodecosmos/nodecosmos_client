import React from 'react';
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { HEADER_HEIGHT } from '../../app/constants';
import { searchNode } from '../../nodes/nodesSlice';

export default function TreeToolbar({ rootNodeId }) {
  const dispatch = useDispatch();

  return (
    <Box
      height={HEADER_HEIGHT}
      px={2}
      width={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      sx={{
        svg: {
          color: 'toolbar.default',
        },
      }}
    >
      <TextField
        sx={{
          '.MuiInputBase-root': {
            borderRadius: 10,
            height: 40,
            backgroundColor: 'toolbar.searchField',
          },
          '.MuiOutlinedInput-notchedOutline': {
            '&, &:hover, &:focus': {},
          },
          input: { fontFamily: 'Roboto' },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
              />
            </InputAdornment>
          ),
        }}
        color="primary"
        variant="outlined"
        placeholder="Search"
        onChange={(event) => dispatch(searchNode({
          rootId: rootNodeId,
          value: event.target.value,
        }))}
      />
    </Box>
  );
}

TreeToolbar.propTypes = {
  rootNodeId: PropTypes.string.isRequired,
};
