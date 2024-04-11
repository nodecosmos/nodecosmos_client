import { NodecosmosDispatch } from '../../../../store';
import { indexNodes } from '../../nodes.thunks';
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

        let payload = null;
        if (value) {
            payload = { q: value };
        }

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
        <>
            <input type="text" style={{ display: 'none' }} />
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
                    id: 'search',
                    name: 'search',
                    autoComplete: 'search',
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
        </>
    );
}
