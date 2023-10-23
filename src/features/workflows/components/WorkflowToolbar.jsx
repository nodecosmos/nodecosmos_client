import React, { useState } from 'react';
import { faTerminal } from '@fortawesome/pro-solid-svg-icons';
import {
    Button, Box, IconButton, Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash } from '@fortawesome/pro-light-svg-icons';
import ToolbarContainer from '../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../app/constants';
import { setIsWfPaneOpen } from '../workflowsSlice';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import EditTitleField from '../../../common/components/EditTItleField';
import useWorkflowCommands from '../hooks/useWorkflowCommands';
import useWorkflowContext from '../hooks/useWorkflowContext';
import { selectIsWfPaneOpen } from '../workflows.selectors';
import ToolsContainer from '../../../common/components/tools/ToolsContainer';
import CreateWorkflowModal from './CreateWorkflowModal';
import WorkflowZoomTools from './tools/WorkflowZoomTools';

export default function WorkflowToolbar() {
    const { nodeId, id, title } = useWorkflowContext();
    const hasWorkflow = !!id;
    const dispatch = useDispatch();
    const [openCreateWorkflowDialog, setOpenCreateWorkflowDialog] = useState(false);
    const { handleTitleChange, deleteWorkflow } = useWorkflowCommands();
    const isWfPaneOpen = useSelector(selectIsWfPaneOpen);

    return (
        <Box
            height={HEADER_HEIGHT}
            width={1}
            pl={1.25}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            boxShadow="2"
            borderBottom={1}
            borderColor="borders.1"
            zIndex={3}
        >
            <Box
                flex={1}
                display="flex"
                alignItems="center"
            >
                {
                    hasWorkflow && (
                        <>
                            <EditTitleField
                                title={title}
                                endpoint="/workflows/title"
                                reqData={{ nodeId, id }}
                                color="text.secondary"
                                pr={1}
                                variant="body2"
                                onChange={handleTitleChange}
                            />
                            <ToolsContainer>
                                <Tooltip title="Delete Workflow" placement="top">
                                    <IconButton
                                        className="Item"
                                        onClick={deleteWorkflow}
                                        aria-label="Delete Workflow"
                                        sx={{ color: 'toolbar.default' }}
                                        size="small"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </IconButton>
                                </Tooltip>
                            </ToolsContainer>
                        </>
                    )
                }
                {
                    !hasWorkflow && (
                        <DefaultButton
                            title="Add Workflow"
                            startIcon={<FontAwesomeIcon icon={faAdd} />}
                            onClick={() => setOpenCreateWorkflowDialog(true)}
                        />
                    )
                }
            </Box>

            {id && <WorkflowZoomTools />}

            {!isWfPaneOpen && (
                <Box flex={1}>
                    <ToolbarContainer round mr={0.5}>
                        <ToolbarItem
                            title={isWfPaneOpen ? 'Hide Workflow Pane' : 'Show Workflow Pane'}
                            icon={faTerminal}
                            color="toolbar.pink"
                            active={false}
                            onClick={() => dispatch(setIsWfPaneOpen(!isWfPaneOpen))}
                            flipX={!isWfPaneOpen}
                        />
                        <Button sx={{ display: 'none' }} />
                        {/* hack to get styles right */}
                    </ToolbarContainer>
                </Box>
            )}
            {isWfPaneOpen && <div />}

            <CreateWorkflowModal
                open={openCreateWorkflowDialog}
                onClose={() => setOpenCreateWorkflowDialog(false)}
                nodeId={nodeId}
            />
        </Box>
    );
}
