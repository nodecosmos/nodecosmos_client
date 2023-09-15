import React, { useEffect } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../contributionRequestsSlice';

export default function ContributionRequestSearchInput() {
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  useEffect(() => () => {
    dispatch(setSearchTerm(null));
  }, [dispatch]);

  return (
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
          height: 1,
        },
        '.MuiOutlinedInput-notchedOutline': {
          backgroundColor: 'transparent',
          '&, &:hover, &:focus': {},
        },
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
      onChange={handleSearch}
    />
  );
}
