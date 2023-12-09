import { setSearchTerm } from '../contributionRequestsSlice';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import React, {
    ChangeEvent, useCallback, useEffect, 
} from 'react';
import { useDispatch } from 'react-redux';

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
            sx={{
                ml: 1.25,
                height: 32,
                width: '350px',
                svg: { color: 'toolbar.default' },
                '.MuiInputBase-root': {
                    borderColor: 'transparent',
                    height: 32,
                    borderRadius: 1,
                    pl: 0.5,
                },
                '.MuiOutlinedInput-notchedOutline': { '&, &:hover, &:focus': {} },
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
