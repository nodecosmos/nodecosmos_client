import { setSearchTerm } from '../contributionRequestsSlice';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import React, {
    ChangeEvent, useCallback, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';

const INPUT_PROPS = {
    startAdornment: (
        <InputAdornment
            position="start"
            sx={{
                p: 1,
                pr: 1.5,
            }}>
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
            className="SearchInput"
            InputProps={INPUT_PROPS}
            color="primary"
            variant="outlined"
            placeholder="Search"
            onChange={handleSearch}
        />
    );
}
