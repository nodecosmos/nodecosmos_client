import {
    setDensity, setShowAncestorChain, setShowTreeColors,
} from '../../../nodes.actions';
import {
    selectDensity, selectShowAncestorChain, selectShowTreeColors, 
} from '../../../nodes.selectors';
import { TreeDensity } from '../../../nodes.types';
import { faEllipsisVertical } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    FormLabel,
    FormControl,
    Tooltip,
    FormControlLabel,
    Radio,
    RadioGroup,
    IconButton, Switch,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import React, {
    MouseEvent, useCallback, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SLOT_PROPS = {
    paper: {
        elevation: 4,
        sx: {
            p: 0,
            m: 0.25,
            width: 300,
            '.MuiList-root': { p: 0 },
            '.MuiListItemButton-root': { minHeight: 62 },
            '.MuiSlider-markLabel': {
                fontSize: 12,
                textTransform: 'capitalize',
            },
        },
    },
};

const SX_COLOR = { color: 'toolbar.default' };

export default function Options() {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const density = useSelector(selectDensity);
    const showAncestorChain = useSelector(selectShowAncestorChain);
    const showTreeColors = useSelector(selectShowTreeColors);
    const open = Boolean(anchorEl);
    const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = useCallback(() => { setAnchorEl(null); }, []);
    const handleDensityChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDensity(event.target.value as TreeDensity));
    }, [dispatch]);
    const handleShowAncestorChainChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowAncestorChain(event.target.checked));
    }, [dispatch]);
    const handleShowTreeColorsChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowTreeColors(event.target.checked));
    }, [dispatch]);

    return (
        <Box component="div" textAlign="end">
            <Tooltip title="Tree Options" placement="top">
                <IconButton
                    className="Item"
                    aria-label="Options"
                    sx={SX_COLOR}
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={SLOT_PROPS}
            >
                <Box p={2} fontSize={14}>
                    <FormControl fullWidth>
                        <FormLabel>Density</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={density}
                            onChange={handleDensityChange}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value={TreeDensity.Default} control={<Radio />} label="Default" />
                            <FormControlLabel value={TreeDensity.Compact} control={<Radio />} label="Compact" />
                        </RadioGroup>
                        <FormLabel className="mt-2">Show Ancestor Chain</FormLabel>
                        <FormControlLabel
                            className="mt-1"
                            id="ancestor-chain-label"
                            value={showAncestorChain}
                            control={<Switch onChange={handleShowAncestorChainChange} checked={showAncestorChain} />}
                            label="True" />
                        <FormLabel className="mt-2">Show Tree Colors</FormLabel>
                        <FormControlLabel
                            className="mt-1"
                            id="tree-colors-label"
                            value={showAncestorChain}
                            control={<Switch onChange={handleShowTreeColorsChange} checked={showTreeColors} />}
                            label="True" />
                    </FormControl>
                </Box>
            </Menu>
        </Box>
    );
}
