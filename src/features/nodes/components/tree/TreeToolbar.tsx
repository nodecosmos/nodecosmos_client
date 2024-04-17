import Loader from '../../../../common/components/Loader';
import useDebounce from '../../../../common/hooks/useDebounce';
import { NodecosmosDispatch } from '../../../../store';
import { HEADER_HEIGHT } from '../../../app/constants';
import useTreeContext from '../../hooks/tree/useTreeContext';
import { search } from '../../nodes.actions';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, InputAdornment, TextField,
} from '@mui/material';
import React, {
    ChangeEvent, useCallback, useEffect, useRef,
} from 'react';
import { useDispatch } from 'react-redux';

export default function TreeToolbar() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { currentBranchId } = useTreeContext();
    const searchVal = useRef<string>('');

    const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(search({
            currentBranchId,
            value: event.target.value,
        }));

        searchVal.current = event.target.value;
    }, [dispatch, currentBranchId]);

    useEffect(() => {
        return () => {
            if (searchVal.current) {
                dispatch(search({
                    currentBranchId,
                    value: '',
                }));
            }
        };
    }, [dispatch, currentBranchId]);

    const [handleChange, inProgress] = useDebounce<ChangeEvent<HTMLInputElement>>(handleSearch, 100);

    return (
        <Box
            height={HEADER_HEIGHT}
            width={1}
            display="flex"
            alignItems="center"
            justifyContent="start"
            position="relative"
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
                    name: 'customSearch',
                    type: 'search',
                    autoComplete: 'off',
                    startAdornment: (
                        <InputAdornment position="start" sx={{ mr: 2 }}>
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                            />
                        </InputAdornment>
                    ),
                }}
                color="primary"
                variant="outlined"
                placeholder="Search"
                onChange={handleChange}
            />
            {inProgress && <Loader size={20} width={20} ml={1} />}
        </Box>
    );
}
