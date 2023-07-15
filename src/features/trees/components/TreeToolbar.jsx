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
      borderBottom={1}
      borderColor="borders.2"
      // boxShadow="2"
      sx={{
        svg: {
          color: 'toolbar.default',
        },
      }}
    >
      <TextField
        sx={{
          width: '350px',
          '.MuiInputBase-root': {
            pl: 1,
            borderRadius: 0,
            height: `calc(${HEADER_HEIGHT} - 1px)`,
            backgroundColor: 'toolbar.searchField',
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
