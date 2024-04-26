import CloseFlowStepInputsButton from './tools/CloseFlowStepInputsButton';
import WorkflowZoomTools from './tools/WorkflowZoomTools';
import EditTitleField from '../../../common/components/EditTItleField';
import { selectIsPaneOpen } from '../../app/app.selectors';
import TogglePaneButton from '../../app/components/TogglePaneButton';
import { HEADER_HEIGHT } from '../../app/constants';
import useWorkflowActions from '../hooks/useWorkflowActions';
import useWorkflowContext from '../hooks/useWorkflowContext';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function WorkflowToolbar() {
    const { title } = useWorkflowContext();
    const { handleTitleChange } = useWorkflowActions();
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
                    color="text.secondary"
                    pr={1}
                    variant="body2"
                    onChange={handleTitleChange}
                />
            </Box>

            <WorkflowZoomTools />

            <CloseFlowStepInputsButton />

            {!isPaneOpen && (<TogglePaneButton />)}

        </Box>
    );
}
