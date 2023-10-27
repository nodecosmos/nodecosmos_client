import React, { useCallback } from 'react';
import {
    faPenToSquare, faTrash, faRectangleCode, faDisplay,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    IconButton, Tooltip, Typography, Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../../app/constants';
import ToggleWorkflowPaneButton from '../../../workflows/components/pane/ToggleWorkflowPaneButton';
import { selectSelectedWorkflowObject } from '../../../workflows/workflows.selectors';
import {
    selectInputOutputById, selectInputOutputPrimaryKey, selectIOPaneContent,
} from '../../inputOutputs.selectors';
import { deleteIO } from '../../inputOutputs.thunks';
import { setIOPaneContent } from '../../inputOutputsSlice';
import { WorkflowDiagramObject } from '../../../workflows/types';
import { NodecosmosDispatch } from '../../../../store';
import { IOPaneContent } from '../../types';

export default function IOPaneToolbar() {
    const { id } = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;
    const io = useSelector(selectInputOutputById(id));
    const dispatch: NodecosmosDispatch = useDispatch();
    const ioPaneContent = useSelector(selectIOPaneContent);

    const primaryKey = useSelector(selectInputOutputPrimaryKey(id));

    const handleDeleteIO = useCallback(() => {
        dispatch(deleteIO(primaryKey));
    }, [dispatch, primaryKey]);

    const setMarkdown = useCallback(() => {
        dispatch(setIOPaneContent(IOPaneContent.Markdown));
    }, [dispatch]);

    const setEditor = useCallback(() => {
        dispatch(setIOPaneContent(IOPaneContent.Editor));
    }, [dispatch]);

    const setDescription = useCallback(() => {
        dispatch(setIOPaneContent(IOPaneContent.Description));
    }, [dispatch]);

    const hasShadow = ioPaneContent === IOPaneContent.Description;

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height={HEADER_HEIGHT}
            borderBottom={1}
            borderColor="borders.2"
            boxShadow={hasShadow ? '1' : 0}
        >
            <ToolbarContainer>
                <ToolbarItem
                    title="Edit Description Markdown"
                    icon={faRectangleCode}
                    color="toolbar.lightRed"
                    active={ioPaneContent === IOPaneContent.Markdown}
                    onClick={setMarkdown}
                />
                <ToolbarItem
                    title="Edit Description"
                    icon={faPenToSquare}
                    color="toolbar.green"
                    active={ioPaneContent === IOPaneContent.Editor}
                    onClick={setEditor}
                />
                <ToolbarItem
                    title="View Description"
                    icon={faDisplay}
                    color="toolbar.blue"
                    active={ioPaneContent === IOPaneContent.Description}
                    onClick={setDescription}
                />
            </ToolbarContainer>

            <Box
                display="flex"
                alignItems="center"
                sx={{ svg: { color: 'background.list.defaultColor', mr: 0.5, ml: 1 } }}>
                <Typography
                    align="center"
                    variant="body1"
                    color="text.secondary"
                    ml={1}
                    sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {io.title}
                </Typography>

                <Box
                    display="flex"
                    sx={{
                        ml: 1,
                        '.Item': {
                            width: 31,
                            height: 1,
                            mx: 0.25,
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'toolbar.hover' },
                        },
                        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 16 },
                    }}
                >
                    <Tooltip title="Edit IO Title" placement="top">
                        <IconButton
                            className="Item"
                            aria-label="Edit IO Title"
                            sx={{ svg: { color: 'toolbar.green' } }}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete IO" placement="top">
                        <IconButton
                            className="Item"
                            aria-label="Delete Flow"
                            sx={{ svg: { color: 'toolbar.blue' } }}
                            onClick={handleDeleteIO}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box>
                <ToggleWorkflowPaneButton />
            </Box>
        </Box>
    );
}
