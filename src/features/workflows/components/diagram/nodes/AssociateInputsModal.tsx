import React, { useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import { Form } from 'react-final-form';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useDispatch } from 'react-redux';
import {
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
} from '@mui/material';
/* nodecosmos */
import { setAlert } from '../../../../app/appSlice';
import { updateFlowStepInputs } from '../../../../flow-steps/flowSteps.thunks';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import { NodecosmosDispatch } from '../../../../../store';
import DefaultModalFormButton from '../../../../../common/components/buttons/DefaultModalFormButton';
import { UUID } from '../../../../../types';
import AssociateInputCheckboxField from './AssocateInputCheckboxField';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function AssociateInputsModal(props: Props) {
    const { open, onClose } = props;
    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const { initialInputIds, diagram } = useWorkflowContext();
    const { wfStepIndex: workflowStepIndex } = useWorkflowStepContext();
    const {
        nodeId, flowStepPrimaryKey, inputIdsByNodeId: currentFlowStepInputIds, 
    } = useFlowStepContext();

    let prevStepInputIds: UUID[] = [];

    if (workflowStepIndex === 0) {
        prevStepInputIds = initialInputIds;
    } else {
        const prevWorkflowStep = diagram.workflowSteps[workflowStepIndex - 1];
        prevStepInputIds = prevWorkflowStep.outputs.map((output) => output.id);
    }

    const onSubmit = useCallback(async (formValues: {inputIds: UUID[]}) => {
        setLoading(true);

        try {
            const inputIdsByNodeId = (currentFlowStepInputIds && { ...currentFlowStepInputIds }) || {};
            inputIdsByNodeId[nodeId] = formValues.inputIds;

            await dispatch(updateFlowStepInputs({
                ...flowStepPrimaryKey,
                inputIdsByNodeId,
            }));
        } catch (e) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: 'Failed to add output',
            }));
        }

        setTimeout(() => setLoading(false), 500);

        onClose();
    }, [currentFlowStepInputIds, dispatch, flowStepPrimaryKey, nodeId, onClose]);

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
        >
            <DialogTitle>
                Inputs
                <IconButton
                    disableRipple
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 24,
                        top: 16,
                    }}
                >
                    <CloseOutlined sx={{ color: 'background.3' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Form
                    keepDirtyOnReinitialize
                    onSubmit={onSubmit}
                    subscription={{ submitting: true }}
                    initialValues={{
                        inputIds: currentFlowStepInputIds[nodeId] || [],
                    }}
                >
                    {({ handleSubmit }) => (
                        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                            {
                                prevStepInputIds.map((inputId) => (
                                    <Box key={inputId}>
                                        <AssociateInputCheckboxField inputId={inputId} />
                                    </Box>
                                ))
                            }
                            <DefaultModalFormButton loading={loading} />
                        </form>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
