import { NodecosmosDispatch } from '../../../../store';
import { HEADER_HEIGHT } from '../../../app/constants';
import { search } from '../../actions';
import useTreeContext from '../../hooks/useTreeContext';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, InputAdornment, TextField,
} from '@mui/material';
import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function TreeShowToolbar() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { treeBranchId, rootNodeId } = useTreeContext();

    const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(search({
            treeBranchId,
            rootId: rootNodeId,
            value: event.target.value,
        }));
    }, [dispatch, treeBranchId, rootNodeId]);

    return (
        <Box
            height={HEADER_HEIGHT}
            width={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
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
                    svg: { color: 'toolbar.default' },
                    '.MuiInputBase-root': {
                        borderRadius: 1,
                        borderColor: 'transparent',
                        height: 1,
                    },
                    '.MuiOutlinedInput-notchedOutline': { '&, &:hover, &:focus': {} },
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
                onChange={handleSearch}
            />
        </Box>
    );
}
