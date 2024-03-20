import CloseFlowStepInputsButton from './tools/CloseFlowStepInputsButton';
import WorkflowZoomTools from './tools/WorkflowZoomTools';
import EditTitleField from '../../../common/components/EditTItleField';
import ToolsContainer from '../../../common/components/tools/ToolsContainer';
import { selectIsPaneOpen } from '../../app/app.selectors';
import TogglePaneButton from '../../app/components/TogglePaneButton';
import { HEADER_HEIGHT } from '../../app/constants';
import useWorkflowCommands from '../hooks/useWorkflowCommands';
import useWorkflowContext from '../hooks/useWorkflowContext';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Tooltip,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function WorkflowToolbar() {
    const {
        branchId, nodeId, id, title,
    } = useWorkflowContext();
    const { handleTitleChange, deleteWorkflow } = useWorkflowCommands();
    const isPaneOpen = useSelector(selectIsPaneOpen);

    return (
        <Box
            height={HEADER_HEIGHT}
            width={1}
            pl={1.25}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            borderBottom={1}
            borderColor="borders.1"
            zIndex={3}
        >
            <Box
                flex={1}
                display="flex"
                alignItems="center"
            >
                <EditTitleField
                    title={title}
                    endpoint="/workflows/title"
                    reqData={{
                        nodeId,
                        branchId,
                        id,
                    }}
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
            </Box>

            <WorkflowZoomTools />

            <CloseFlowStepInputsButton />

            {!isPaneOpen && (<TogglePaneButton />)}

        </Box>
    );
}
