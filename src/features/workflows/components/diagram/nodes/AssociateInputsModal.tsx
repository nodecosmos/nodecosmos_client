import AssociateInputCheckboxField from './AssocateInputCheckboxField';
import DefaultModalFormButton from '../../../../../common/components/buttons/DefaultModalFormButton';
import CloseModalButton from '../../../../../common/components/modal/CloseModalButton';
import DefaultModal from '../../../../../common/components/modal/DefaultModal';
import { NodecosmosDispatch } from '../../../../../store';
import { UUID } from '../../../../../types';
import { flattenValues } from '../../../../../utils/group';
import { setAlert } from '../../../../app/appSlice';
import { updateFlowStepInputs } from '../../../../flow-steps/flowSteps.thunks';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useDiagramContext from '../../../hooks/diagram/useDiagramContext';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { faSave } from '@fortawesome/pro-light-svg-icons';
import {
    DialogTitle,
    DialogContent,
    Box,
} from '@mui/material';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
/* nodecosmos */

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function AssociateInputsModal(props: Props) {
    const { open, onClose } = props;
    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();

    const { initialInputIds } = useWorkflowContext();
    const diagram = useDiagramContext();
    const { wfStepIndex: workflowStepIndex } = useWorkflowStepContext();
    const { flowStepPrimaryKey, inputIdsByNodeId: currentFlowStepInputIds } = useFlowStepContext();
    const { id: nodeId } = useFlowStepNodeContext();

    let prevStepOutputIds: UUID[] = [];

    if (workflowStepIndex === 0) {
        prevStepOutputIds = initialInputIds;
    } else {
        const prevWorkflowStep = diagram.workflowSteps[workflowStepIndex - 1];
        const prevStepOutputs = flattenValues(prevWorkflowStep.outputsById);
        prevStepOutputIds = prevStepOutputs.map((output) => output.id);
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
        <DefaultModal open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle
                sx={{
                    borderBottom: 1,
                    borderColor: 'borders.1',
                }}
            >
                Associate Inputs
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <DialogContent sx={{
                '.WorkflowOutputButton': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 200,
                    height: 38,
                    ml: 1,
                    mt: 1,
                    borderRadius: 1,
                    px: 2,
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    outline: 'none',
                    border: '1px solid',
                    borderColor: 'toolbar.default',
                    // boxShadow: 'buttons.1',
                    '.WorkflowOutputCheckbox': { p: 0 },
                    '.IOButtonText': {
                        flex: 1,
                        textAlign: 'left',
                        color: 'text.secondary',
                        mx: 1,
                        p: 0,
                        letterSpacing: '0.02857em',
                        minWidth: 40,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        fontWeight: 500,
                    },
                },
            }}>
                <Form
                    keepDirtyOnReinitialize
                    onSubmit={onSubmit}
                    subscription={{ submitting: true }}
                    initialValues={{ inputIds: currentFlowStepInputIds[nodeId] || [] }}
                >
                    {({ handleSubmit }) => (
                        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                            {
                                prevStepOutputIds.map((inputId) => (
                                    <Box key={inputId}>
                                        <AssociateInputCheckboxField inputId={inputId} />
                                    </Box>
                                ))
                            }
                            <DefaultModalFormButton startIcon={faSave} loading={loading} title="Save" />
                        </form>
                    )}
                </Form>
            </DialogContent>
        </DefaultModal>
    );
}
