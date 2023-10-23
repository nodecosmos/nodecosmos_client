import React, { useCallback } from 'react';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../app/constants';
import { searchNode } from '../../nodes/nodeActions';
import useTreeCommands from '../hooks/useTreeCommands';
import useTreeContext from '../hooks/useTreeContext';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';

export default function TreeShowToolbar() {
    const dispatch = useDispatch();
    const { rootNodeId } = useTreeContext();
    const { rebuildTree } = useTreeCommands();

    const rootId = useSelector(selectNodeAttribute(rootNodeId, 'rootId'));

    const handleSearch = useCallback((event) => {
        dispatch(searchNode({
            rootId,
            value: event.target.value,
        }));
        requestAnimationFrame(() => rebuildTree());
    }, [dispatch, rebuildTree, rootId]);

    return (
        <Box
            height={HEADER_HEIGHT}
            width={1}
            display="flex"
            alignItems="center"
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
                    svg: {
                        color: 'toolbar.default',
                    },
                    '.MuiInputBase-root': {
                        borderRadius: 1,
                        borderColor: 'transparent',
                        height: 1,
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        '&, &:hover, &:focus': {},
                    },
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
