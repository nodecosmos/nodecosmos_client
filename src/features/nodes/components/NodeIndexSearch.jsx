import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { indexNodes } from '../nodes.thunks';

export default function NodeIndexSearch() {
  const dispatch = useDispatch();

  const dispatchTimeout = React.useRef(null);
  const onChange = (event) => {
    clearTimeout(dispatchTimeout.current);
    dispatchTimeout.current = setTimeout(() => {
      const { value } = event.target;
      const options = {};

      if (value) {
        options.params = { q: value };
      }

      dispatch(indexNodes(options));
    }, 500);
  };

  return (
    <TextField
      sx={{
        ml: 2,
        height: 1,
        width: '350px',
        svg: {
          color: 'toolbar.default',
        },
        '.MuiInputBase-root': {
          borderColor: 'transparent',
          backgroundColor: 'toolbar.searchField',
          height: 32,
          borderRadius: 1,
          pl: 0.5,
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
      onChange={onChange}
    />
  );
}
