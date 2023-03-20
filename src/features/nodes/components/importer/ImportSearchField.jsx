import React from 'react';
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';

export default function ImportSearchField() {
  return (
    <TextField
      sx={{
        width: '350px',
        '.MuiInputBase-root': {
          pl: 1,
          borderRadius: 2,
          height: 40,
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
      color="primary"
      variant="outlined"
      placeholder="Search"
    />
  );
}
