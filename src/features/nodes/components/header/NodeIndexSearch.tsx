import useDebounce from '../../../../common/hooks/useDebounce';
import { NodecosmosDispatch } from '../../../../store';
import { setIndexSearchTerm } from '../../nodes.actions';
import { indexNodes } from '../../nodes.thunks';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, {
    ChangeEvent, KeyboardEventHandler, KeyboardEvent, useCallback, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';

const SX = {
    ml: 1.25,
    height: 1,
    py: 0.75,
    maxWidth: '100%',
    width: '350px',
    svg: { color: 'toolbar.default' },
    flex: 1,
    '.MuiInputBase-root': {
        borderColor: 'transparent',
        height: 1,
        borderRadius: 1,
        pl: 0.5,
    },
};

export default function NodeIndexSearch() {
    const dispatch: NodecosmosDispatch = useDispatch();

    const execSearch = useCallback((value: string) => {
        let payload = null;
        if (value) {
            payload = { query: { q: value } };
        }

        dispatch(indexNodes(payload));
        dispatch(setIndexSearchTerm(value));
    }, [dispatch]);

    const onChange = useCallback((event: ChangeEvent<HTMLElement>) => {
        const { value } = event.target as HTMLInputElement;

        execSearch(value);
    }, [execSearch]);

    const [handleChange, inProgress] = useDebounce(onChange, 500);

    const onEnter: KeyboardEventHandler<HTMLElement> = useCallback((event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            const { value } = event.target as HTMLInputElement;

            execSearch(value);
        }
    }, [execSearch]);

    const slotProps = useMemo(() => ({
        input: {
            id: 'search',
            name: 'search',
            autoComplete: 'search',
            endAdornment: (
                inProgress ? <CircularProgress size={20} />
                    : <FontAwesomeIcon icon={faMagnifyingGlass} />
            ),
        },
    }), [inProgress]);

    return (
        <TextField
            sx={SX}
            slotProps={slotProps}
            color="primary"
            variant="outlined"
            placeholder="Search"
            onKeyDown={onEnter}
            onChange={handleChange}
        />);
}
