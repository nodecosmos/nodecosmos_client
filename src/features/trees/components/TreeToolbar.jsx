import React from 'react';
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { HEADER_HEIGHT } from '../../app/constants';
import { searchNode } from '../../nodes/nodesSlice';

export default function TreeToolbar({ rootNodeId }) {
  const dispatch = useDispatch();

  return (
    <Box
      height={HEADER_HEIGHT}
      width={1}
      display="flex"
      alignItems="center"
      position="relative"
      boxShadow="2"
      borderBottom={1}
      borderColor="borders.1"
      zIndex={3}
    >
      <TextField
        sx={{
          ml: 1,
          height: 32,
          width: '350px',
          svg: {
            color: 'toolbar.default',
          },
          '.MuiInputBase-root': {
            borderRadius: 1,
            borderColor: 'transparent',
            height: 1,
          },
          '.MuiOutlinedInput-notchedOutline': {
            '&, &:hover, &:focus': {},
          },
          input: { fontFamily: 'Roboto' },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ p: 1 }}>
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
