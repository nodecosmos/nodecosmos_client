import ToolsContainer from './tools/ToolsContainer';
import nodecosmos from '../../apis/nodecosmos-server';
import useBooleanStateValue from '../hooks/useBooleanStateValue';
import useDebounce from '../hooks/useDebounce';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, TextField, Tooltip,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect } from 'react';

interface EditTitleFieldInputProps {
    title: string;
    onChange: (value: string) => void;
    onClose: () => void;
    endpoint: string;
    reqData?: object;
}

export default function EditTitleFieldInput(props: EditTitleFieldInputProps) {
    const {
        title, onChange, onClose, endpoint, reqData = {},
    } = props;

    const [value, setValue] = React.useState(title);
    const [shouldClose, setShouldClose] = useBooleanStateValue();
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const storeTitle = useCallback(async (title: string) => {
        const response = await nodecosmos.put(endpoint, {
            ...reqData,
            title,
        });

        return response.data;
    }, [endpoint, reqData]);

    const [debounce, debounceInProgress] = useDebounce(storeTitle);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        debounce(event.target.value);
    }, [debounce]);

    useEffect(() => { inputRef.current?.focus(); }, []);
    useEffect(() => {
        if (!debounceInProgress && shouldClose) {
            onChange(value);
            onClose();
        }
    }, [onClose, onChange, shouldClose, value, debounceInProgress]);

    const onEnterDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setShouldClose();
        }
    }, [setShouldClose]);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <TextField
                inputRef={inputRef}
                sx={{
                    width: '350px',
                    '.MuiInputBase-root': {
                        borderColor: 'transparent',
                        height: 32,
                        borderRadius: 1,
                        pl: 0.5,
                    },
                }}
                variant="outlined"
                focused
                value={value}
                onChange={handleChange}
                onBlur={setShouldClose}
                onKeyDown={onEnterDown}
            />
            {debounceInProgress && shouldClose && <CircularProgress
                size={20}
                sx={{
                    ml: 1,
                    color: 'toolbar.green',
                }} /> }

            {!shouldClose && (
                <ToolsContainer>
                    <Tooltip title="Save title" placement="top">
                        <IconButton
                            className="Item"
                            onClick={setShouldClose}
                            aria-label="Save title"
                            sx={{
                                ml: 1,
                                color: 'toolbar.green',
                            }}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </IconButton>
                    </Tooltip>
                </ToolsContainer>
            )}
        </Box>
    );
}
