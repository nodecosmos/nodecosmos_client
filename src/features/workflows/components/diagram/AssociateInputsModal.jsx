import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import AddRounded from '@mui/icons-material/AddRounded';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from '@mui/material';
/* nodecosmos */
import { setAlert } from '../../../app/appSlice';
import { selectFlowStepAttribute } from '../../../flow-steps/flowSteps.selectors';
import { updateFlowStepInputs } from '../../../flow-steps/flowSteps.thunks';
import { selectWorkflowDiagram } from '../../workflows.selectors';
import AssociateInputCheckboxField from './AssocateInputCheckboxField';

export default function AssociateInputsModal({
  open, onClose, workflowId, flowStepId, flowStepInputNodeId, workflowStepIndex,
}) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const currentFlowStepInputIds = useSelector(selectFlowStepAttribute(workflowId, flowStepId, 'inputIdsByNodeId'));
  const flowId = useSelector(selectFlowStepAttribute(workflowId, flowStepId, 'flowId'));
  const nodeId = useSelector(selectFlowStepAttribute(workflowId, flowStepId, 'nodeId'));
  const workflow = useSelector(selectWorkflowDiagram(workflowId, flowId, nodeId));

  const workflowStep = workflow.workflowSteps[workflowStepIndex - 1];
  let workflowStepInputIds = [];

  if (workflowStepIndex === 0) {
    workflowStepInputIds = workflow.initialInputIds;
  } else {
    workflowStepInputIds = workflowStep && workflowStep.wfStepOutputIds;
  }

  const onSubmit = async (formValues) => {
    setLoading(true);

    try {
      const inputIdsByNodeId = (currentFlowStepInputIds && { ...currentFlowStepInputIds }) || {};
      inputIdsByNodeId[flowStepInputNodeId] = formValues.inputIds;

      inputIdsByNodeId[flowStepInputNodeId] = await dispatch(updateFlowStepInputs({
        nodeId,
        workflowId,
        flowId,
        id: flowStepId,
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
  };

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
            inputIds: (currentFlowStepInputIds && currentFlowStepInputIds[flowStepInputNodeId]) || [],
          }}
        >
          {({ handleSubmit }) => (
            <form style={{ height: '100%' }} onSubmit={handleSubmit}>
              {
                workflowStepInputIds.map((inputId) => (
                  <Box ml={1.5} key={inputId}>
                    <AssociateInputCheckboxField inputId={inputId} />
                  </Box>
                ))
              }
              <Button
                sx={{ mt: 3, float: 'right' }}
                color="success"
                variant="contained"
                disableElevation
                type="submit"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} /> : <AddRounded />}
              >
                Save
              </Button>
            </form>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}

AssociateInputsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  workflowId: PropTypes.string.isRequired,
  flowStepId: PropTypes.string.isRequired,
  flowStepInputNodeId: PropTypes.string.isRequired,
  workflowStepIndex: PropTypes.number.isRequired,
};
