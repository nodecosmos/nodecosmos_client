import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import { setScale } from '../../../nodes.actions';
import { selectScale } from '../../../nodes.selectors';
import { faCircleMinus, faCirclePlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Tooltip, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Zoom() {
    const dispatch = useDispatch();
    const treeScale = useSelector(selectScale);

    const zoomIn = useCallback(() => {
        const newScale = Math.round((treeScale + 0.1) * 10) / 10;

        if (newScale > 2) return;

        dispatch(setScale(newScale));
    }, [dispatch, treeScale]);

    const zoomOut = useCallback(() => {
        const newScale = Math.round((treeScale - 0.1) * 10) / 10;

        if (newScale < 0.5) return;

        dispatch(setScale(newScale));
    }, [dispatch, treeScale]);

    return (
        <Box component="div" flex={1}>
            <ToolsContainer justifyContent="center">
                <Tooltip title="Zoom in" placement="top">
                    <IconButton
                        className="Item"
                        aria-label="Zoom in"
                        sx={{ color: 'toolbar.default' }}
                        onClick={zoomIn}
                    >
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </IconButton>
                </Tooltip>
                <Typography
                    color="text.tertiary"
                    textAlign="center"
                    width={24}
                >
                    {treeScale}
                </Typography>
                <Tooltip title="Zoom out" placement="top">
                    <IconButton
                        className="Item"
                        aria-label="Zoom out"
                        sx={{ color: 'toolbar.default' }}
                        onClick={zoomOut}
                    >
                        <FontAwesomeIcon icon={faCircleMinus} />
                    </IconButton>
                </Tooltip>
            </ToolsContainer>
        </Box>
    );
}
