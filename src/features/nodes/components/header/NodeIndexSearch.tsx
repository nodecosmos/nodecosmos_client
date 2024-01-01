import { NodecosmosDispatch } from '../../../../store';
import { indexNodes } from '../../nodes.thunks';
import { IndexNodesPayload } from '../../nodes.types';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import React, {
    ChangeEvent, KeyboardEventHandler, KeyboardEvent, useCallback, useRef,
} from 'react';
import { useDispatch } from 'react-redux';

export default function NodeIndexSearch() {
    const dispatch: NodecosmosDispatch = useDispatch();

    const dispatchTimeout = useRef<number | null>(null);

    const execSearch = useCallback((value: string) => {
        if (dispatchTimeout.current) clearTimeout(dispatchTimeout.current);

        const payload: IndexNodesPayload = { q: value };

        dispatch(indexNodes(payload));
    }, [dispatch]);

    const onChange = useCallback((event: ChangeEvent<HTMLElement>) => {
        if (dispatchTimeout.current) clearTimeout(dispatchTimeout.current);

        dispatchTimeout.current = setTimeout(() => {
            const { value } = event.target as HTMLInputElement;

            execSearch(value);
        }, 500);
    }, [execSearch]);

    const onEnter: KeyboardEventHandler<HTMLElement> = useCallback((event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            const { value } = event.target as HTMLInputElement;

            execSearch(value);
        }
    }, [execSearch]);

    return (
        <TextField
            sx={{
                ml: 1.25,
                height: 1,
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
                autoComplete: 'off',
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
            onKeyDown={onEnter}
            onChange={onChange}
        />
    );
}
