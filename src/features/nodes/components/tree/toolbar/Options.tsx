import { setDensity } from '../../../nodes.actions';
import { selectDensity } from '../../../nodes.selectors';
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
    IconButton,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import React, {
    MouseEvent, useCallback, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Options() {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const density = useSelector(selectDensity);
    const open = Boolean(anchorEl);
    const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = useCallback(() => { setAnchorEl(null); }, []);
    const handleDensityChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDensity(event.target.value as TreeDensity));
    }, [dispatch]);

    return (
        <Box component="div" flex={1} textAlign="end">
            <Tooltip title="Tree Options" placement="top">
                <IconButton
                    className="Item"
                    aria-label="Options"
                    sx={{ color: 'toolbar.default' }}
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
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
                }}
            >
                <Box
                    p={2}
                    fontSize={14}
                >
                    <FormControl>
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
                    </FormControl>
                </Box>
            </Menu>
        </Box>
    );
}
