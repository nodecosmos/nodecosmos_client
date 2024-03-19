import useWorkflowContext from '../../hooks/useWorkflowContext';
import { faCodePullRequestClosed } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import React from 'react';

export default function CloseFlowStepInputsButton() {
    const { inputsAdditionActive, deactivateInputsAddition } = useWorkflowContext();

    if (!inputsAdditionActive) return null;

    return (
        <Button
            variant="outlined"
            color="error"
            onClick={deactivateInputsAddition}
            startIcon={<FontAwesomeIcon icon={faCodePullRequestClosed} />}
            sx={{ mr: 1 }}
        >
            Close Inputs Addition
        </Button>
    );
}
