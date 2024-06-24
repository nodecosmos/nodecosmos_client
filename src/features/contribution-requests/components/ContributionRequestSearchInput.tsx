import { setSearchTerm } from '../contributionRequestsSlice';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import React, {
    ChangeEvent, useCallback, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';

const SX = {
    height: 32,
    width: '350px',
    svg: { color: 'toolbar.default' },
    '.MuiInputBase-root': {
        borderRadius: 1,
        borderColor: 'transparent',
        height: 1,
    },
};

const INPUT_PROPS = {
    id: 'search',
    name: 'search',
    autoComplete: 'search',
    endAdornment: (
        <InputAdornment position="start">
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
            />
        </InputAdornment>
    ),
};

export default function ContributionRequestSearchInput() {
    const dispatch = useDispatch();
    const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
    }, [dispatch]);

    useEffect(() => () => {
        dispatch(setSearchTerm(null));
    }, [dispatch]);

    return (
        <TextField
            sx={SX}
            className="SearchInput"
            InputProps={INPUT_PROPS}
            color="primary"
            variant="outlined"
            placeholder="Search"
            onChange={handleSearch}
        />
    );
}
