
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { NodecosmosDispatch } from '../../../../store';
import TogglePaneButton from '../../../app/components/TogglePaneButton';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectSelectedWorkflowObject } from '../../../workflows/workflow.selectors';
import { WorkflowDiagramObject } from '../../../workflows/workflow.types';
import {
    selectFlowAttribute, selectFlowPaneContent, selectFlowPrimaryKey,
} from '../../flows.selectors';
import { deleteFlow } from '../../flows.thunks';
import { FlowPaneContent } from '../../flows.types';
import { setFlowPaneContent } from '../../flowsSlice';
import {
    faPenToSquare, faTrash, faRectangleCode, faCodeCommit, faDisplay,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    IconButton, Tooltip, Typography, Box,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FlowPaneToolbar() {
    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;
    const { branchId, id } = selectedWorkflowDiagramObject;
    const dispatch: NodecosmosDispatch = useDispatch();
    const ioPaneContent = useSelector(selectFlowPaneContent) as FlowPaneContent;

    const title = useSelector(selectFlowAttribute(branchId, id, 'title'));
    const primaryKey = useSelector(selectFlowPrimaryKey(branchId, id));

    const handleDeleteFlow = useCallback(() => {
        dispatch(deleteFlow(primaryKey));
    }, [dispatch, primaryKey]);

    const setMarkdown = useCallback(() => {
        dispatch(setFlowPaneContent(FlowPaneContent.Markdown));
    }, [dispatch]);

    const setEditor = useCallback(() => {
        dispatch(setFlowPaneContent(FlowPaneContent.Editor));
    }, [dispatch]);

    const setDescription = useCallback(() => {
        dispatch(setFlowPaneContent(FlowPaneContent.Description));
    }, [dispatch]);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height={HEADER_HEIGHT}
            borderBottom={1}
            borderColor="borders.2"
        >
            <ToolbarContainer>
                <ToolbarItem
                    title="Edit Description Markdown"
                    icon={faRectangleCode}
                    color="toolbar.lightRed"
                    active={ioPaneContent === FlowPaneContent.Markdown}
                    onClick={setMarkdown}
                />
                <ToolbarItem
                    title="Edit Description Markdown"
                    icon={faPenToSquare}
                    color="toolbar.green"
                    active={ioPaneContent === FlowPaneContent.Editor}
                    onClick={setEditor}
                />
                <ToolbarItem
                    title="View Description"
                    icon={faDisplay}
                    color="toolbar.blue"
                    active={ioPaneContent === FlowPaneContent.Description}
                    onClick={setDescription}
                />
            </ToolbarContainer>

            <Box
                display="flex"
                alignItems="center"
                sx={{
                    svg: {
                        color: 'background.list.defaultColor',
                        mr: 0.5,
                        ml: 1,
                    },
                }}>
                {title && <FontAwesomeIcon icon={faCodeCommit} />}
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
                    {title}
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
                    <Tooltip title="Delete Flow" placement="top">
                        <IconButton
                            className="Item"
                            aria-label="Delete Flow"
                            sx={{ svg: { color: 'toolbar.blue' } }}
                            onClick={handleDeleteFlow}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box>
                <TogglePaneButton />
            </Box>

        </Box>
    );
}
