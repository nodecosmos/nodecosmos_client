import CloseFlowStepInputsButton from './tools/CloseFlowStepInputsButton';
import WorkflowZoomTools from './tools/WorkflowZoomTools';
import EditTitleField from '../../../common/components/EditTItleField';
import { selectIsPaneOpen } from '../../app/app.selectors';
import TogglePaneButton from '../../app/components/TogglePaneButton';
import { HEADER_HEIGHT } from '../../app/constants';
import useIsMobile from '../../app/hooks/useIsMobile';
import DanglingIosButton from '../../input-outputs/components/DanglingIosButton';
import useWorkflowActions from '../hooks/useWorkflowActions';
import useWorkflowContext from '../hooks/useWorkflowContext';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function WorkflowToolbar() {
    const { inputsAdditionActive } = useWorkflowContext();
    const { title } = useWorkflowContext();
    const { handleTitleChange } = useWorkflowActions();
    const isPaneOpen = useSelector(selectIsPaneOpen);
    const isMobile = useIsMobile();

    return (
        <Box
            height={HEADER_HEIGHT}
            width={1}
            pl={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            borderBottom={1}
            borderColor="borders.1"
            zIndex={3}
        >
            <Box
                display="flex"
                alignItems="center"
            >
                <EditTitleField
                    maxWidth={isMobile ? '150px' : '350px'}
                    title={title}
                    color="texts.secondary"
                    variant="body2"
                    onChange={handleTitleChange}
                />
            </Box>

            <WorkflowZoomTools />

            <CloseFlowStepInputsButton />
            <DanglingIosButton />

            {!inputsAdditionActive && <div />}

            {!isPaneOpen && (<TogglePaneButton />)}

        </Box>
    );
}
