import ToolsContainer from './tools/ToolsContainer';
import nodecosmos from '../../api/nodecosmos-server';
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
    onChange?: (value: string) => void;
    onClose: () => void;
    endpoint: string;
    reqData?: object;
    maxWidth?: number | string;
    inputHeight?: number | string;
    inputFontSize?: number | string;
    inputFontWeight?: number | string;
    inputBorder?: number | string;
    inputP?: number ;
}

export default function EditTitleFieldInput(props: EditTitleFieldInputProps) {
    const {
        title, onChange, onClose, endpoint,
        reqData = {},
        inputHeight = 32,
        inputFontSize = 'inherit',
        maxWidth = '350px',
        inputFontWeight = 'inherit',
        inputBorder = 'borders.4',
        inputP = 1,
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
            if (onChange) {
                onChange(value);
            }
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
            width={1}
            display="flex"
            alignItems="center"
            justifyContent="start"
        >
            <TextField
                inputRef={inputRef}
                sx={{
                    width: maxWidth,
                    '.MuiInputBase-root': {
                        borderColor: 'transparent',
                        height: inputHeight,
                        borderRadius: 1,
                        backgroundColor: 'transparent',
                        '.MuiOutlinedInput-notchedOutline': {
                            borderWidth: 1,
                            borderColor: inputBorder,
                        },
                    },

                    '.MuiInputBase-input': {
                        color: 'text.secondary',
                        fontWeight: inputFontWeight,
                        fontSize: inputFontSize,
                        p: inputP,
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
