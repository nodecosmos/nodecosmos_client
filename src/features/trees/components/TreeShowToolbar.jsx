import React, { useEffect } from 'react';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { HEADER_HEIGHT } from '../../app/constants';
import { searchNode, setOriginalChildIds } from '../../nodes/nodesSlice';

export default function TreeShowToolbar({ rootNodeId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOriginalChildIds());

    return () => {
      dispatch(searchNode({
        rootId: rootNodeId,
        value: '',
      }));
    };
  }, [dispatch, rootNodeId]);

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
      pl={1.25}
    >
      <TextField
        sx={{
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
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 2 }}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
              />
            </InputAdornment>
          ),
        }}
        name="search"
        color="primary"
        variant="outlined"
        placeholder="Search"
        onChange={(event) => {
          dispatch(searchNode({
            rootId: rootNodeId,
            value: event.target.value,
          }));
        }}
      />
    </Box>
  );
}

TreeShowToolbar.propTypes = {
  rootNodeId: PropTypes.string.isRequired,
};
