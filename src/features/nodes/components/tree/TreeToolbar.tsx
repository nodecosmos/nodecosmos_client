import Loader from '../../../../common/components/Loader';
import NcAvatar from '../../../../common/components/NcAvatar';
import useDebounce from '../../../../common/hooks/useDebounce';
import { NodecosmosDispatch } from '../../../../store';
import { HEADER_HEIGHT } from '../../../app/constants';
import useTreeContext from '../../hooks/tree/useTreeContext';
import { search } from '../../nodes.actions';
import { selectNode } from '../../nodes.selectors';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, InputAdornment, Link, TextField,
} from '@mui/material';
import React, {
    ChangeEvent, useCallback, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

export default function TreeToolbar() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { branchId, rootId } = useTreeContext();
    const searchVal = useRef<string>('');
    const node = useSelector(selectNode(branchId, rootId));

    const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(search({
            branchId,
            value: event.target.value,
        }));

        searchVal.current = event.target.value;
    }, [dispatch, branchId]);

    useEffect(() => {
        return () => {
            if (searchVal.current) {
                dispatch(search({
                    branchId,
                    value: '',
                }));
            }
        };
    }, [dispatch, branchId]);

    const [handleChange, inProgress] = useDebounce<ChangeEvent<HTMLInputElement>>(handleSearch, 100);

    if (!node) {
        return null;
    }

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
            <Link component={RouterLink} to={`/${node.owner?.username}`}>
                <NcAvatar
                    width={25}
                    height={25}
                    fontSize={14}
                    name={node.owner?.name || ''}
                    src={node.owner?.profileImageUrl} />
            </Link>

            <TextField
                sx={{
                    ml: 1,
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
