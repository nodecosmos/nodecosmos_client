import ToolsContainer from '../../../../common/components/tools/ToolsContainer';
import { selectWorkflowScale } from '../../workflow.selectors';
import { setWorkflowScale } from '../../workflowsSlice';
import { faCircleMinus, faCirclePlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Tooltip, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WorkflowZoomTools() {
    const dispatch = useDispatch();
    const workflowScale = useSelector(selectWorkflowScale);

    const zoomIn = useCallback(() => {
        const newScale = Math.round((workflowScale + 0.1) * 10) / 10;

        if (newScale > 2) return;

        dispatch(setWorkflowScale(newScale));
    }, [dispatch, workflowScale]);

    const zoomOut = useCallback(() => {
        const newScale = Math.round((workflowScale - 0.1) * 10) / 10;

        if (newScale < 0.5) return;

        dispatch(setWorkflowScale(newScale));
    }, [dispatch, workflowScale]);

    return (
        <Box flex={1}>
            <ToolsContainer>
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
                    sx={{
                        borderBottom: 1,
                        pb: 0.05,
                    }}
                >
                    {workflowScale}
                </Typography>
                <Tooltip title="Zoom out" placement="top">
                    <IconButton
                        className="Item"
                        aria-label="Delete Flow"
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
