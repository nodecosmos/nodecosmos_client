import useIsMobile from '../../../app/hooks/useIsMobile';
import useWorkflowContext from '../../hooks/useWorkflowContext';
import { faClose } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import React from 'react';

export default function CloseFlowStepInputsButton() {
    const { inputsAdditionActive, deactivateInputsAddition } = useWorkflowContext();
    const isMobile = useIsMobile();

    if (!inputsAdditionActive) return null;

    return (
        <Button
            variant="outlined"
            color="error"
            onClick={deactivateInputsAddition}
            startIcon={<FontAwesomeIcon icon={faClose} />}
            sx={{ mr: 1 }}
        >
            {isMobile ? 'Finish IO' : 'Finish Adding Inputs'}
        </Button>
    );
}
