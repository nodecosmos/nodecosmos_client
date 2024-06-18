import useThreadsContext from '../../hooks/thread/useThreadsContext';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import React, {
    ChangeEvent, useCallback, useEffect,
} from 'react';

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

export default function ThreadSearchInput() {
    const { setSearchTerm } = useThreadsContext();
    const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, [setSearchTerm]);

    useEffect(() => () => {
        setSearchTerm(null);
    }, [setSearchTerm]);

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
