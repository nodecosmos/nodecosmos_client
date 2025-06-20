import useBooleanStateValue from '../hooks/useBooleanStateValue';
import useDebounce from '../hooks/useDebounce';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, TextField, Tooltip,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';

interface EditTitleFieldInputProps {
    title: string;
    onChange: (value: string) => void;
    onClose: () => void;
    className?: string;
    placeholder?: string;
    maxWidth?: number | string;
    inputHeight?: number | string;
    inputFontSize?: number | string;
    inputFontWeight?: number | string;
    inputBorder?: number | string;
}

export default function EditTitleFieldInput(props: EditTitleFieldInputProps) {
    const {
        title,
        onChange,
        onClose,
        className,
        placeholder,
        inputHeight = 32,
        inputFontSize = 'inherit',
        maxWidth = '350px',
        inputFontWeight = 'inherit',
        inputBorder = 'borders.4',
    } = props;

    const [value, setValue] = React.useState(title);
    const [shouldClose, setShouldClose] = useBooleanStateValue();
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const [debounce, debounceInProgress] = useDebounce(onChange);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        debounce(event.target.value);
    }, [debounce]);

    useEffect(() => {
        if (!debounceInProgress && shouldClose) {
            onClose();
        }
    }, [debounceInProgress, onClose, shouldClose]);

    useEffect(() => { inputRef.current?.focus(); }, []);

    const onEnterDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setShouldClose();
        }
    }, [setShouldClose]);

    const slotProps = useMemo(() => {
        const SaveIcon = () => {
            if (debounceInProgress && shouldClose) {
                return (
                    <CircularProgress size={20} />
                );
            } else {
                return (
                    <Tooltip title="Save title" placement="top">
                        <IconButton
                            className="Item toolbar-green fs-18"
                            onClick={setShouldClose}
                            aria-label="Save title"
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </IconButton>
                    </Tooltip>
                );
            }
        };

        return {
            input: {
                endAdornment: (
                    <Box display="flex" alignItems="center" justifyContent="center" pr={1}><SaveIcon /></Box>
                ),
            },
        };
    }, [debounceInProgress, setShouldClose, shouldClose]);

    const sx = useMemo(() => ({
        width: maxWidth,
        '.MuiInputBase-root': {
            borderColor: 'transparent',
            height: inputHeight,
            borderRadius: 1,
            backgroundColor: 'transparent',
            p: 0,
            '.MuiOutlinedInput-notchedOutline': {
                borderWidth: 1,
                borderColor: inputBorder,
            },
            '.MuiInputBase-adornedEnd': { mr: 1 },
        },
        '.MuiInputBase-input': {
            color: 'texts.secondary',
            fontWeight: inputFontWeight,
            fontSize: inputFontSize,
            px: 1,
        },
    }), [inputBorder, inputFontSize, inputFontWeight, inputHeight, maxWidth]);

    return (
        <Box
            className={`background-2 ${className}`}
            width={1}
            display="flex"
            alignItems="center"
            justifyContent="start"
        >
            <TextField
                placeholder={placeholder}
                inputRef={inputRef}
                sx={sx}
                variant="outlined"
                focused
                value={value}
                onInput={handleChange}
                onBlur={setShouldClose}
                onKeyDown={onEnterDown}
                slotProps={slotProps}
            />
        </Box>
    );
}
