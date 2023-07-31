import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import AddRounded from '@mui/icons-material/AddRounded';
import { useDispatch, useSelector } from 'react-redux';

/* mui */
import {
  Button,
  InputAdornment,
  DialogContent,
} from '@mui/material';
/* nodecosmos */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeCommit } from '@fortawesome/pro-solid-svg-icons';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import { setAlert } from '../../app/appSlice';
import { selectFlowStepAttribute } from '../../flow-steps/flowSteps.selectors';
import { updateFlowStepOutputs } from '../../flow-steps/flowSteps.thunks';
import { createIO } from '../inputOutputs.thunks';
import { selectWorkflowAttribute } from '../../workflows/workflows.selectors';
import { updateWorkflowInitialInputs } from '../../workflows/workflows.thunks';
import CloseModalButton from '../../../common/components/CloseModalButton';

export const ASSOCIATED_OBJECT_TYPES = {
  workflow: 'workflow',
  flowStep: 'flowStep',
};

export default function CreateIOModal({
  open, onClose, workflowId, associatedObject, flowStepId, flowStepOutputNodeId,
}) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const nodeId = useSelector(selectWorkflowAttribute(workflowId, 'nodeId'));
  const currentInitialInputIds = useSelector(selectWorkflowAttribute(workflowId, 'initialInputIds'));

  const currentFlowStepOutputs = useSelector(selectFlowStepAttribute(workflowId, flowStepId, 'outputIdsByNodeId'));
  const flowId = useSelector(selectFlowStepAttribute(workflowId, flowStepId, 'flowId'));
  const flowStepNodeId = useSelector(selectFlowStepAttribute(workflowId, flowStepId, 'nodeId'));

  const onSubmit = async (formValues) => {
    setLoading(true);

    const payload = {
      nodeId,
      workflowId,
      flowStepId,
      ...formValues,
    };

    await dispatch(createIO(payload)).then(async (data) => {
      const { inputOutput } = data.payload;

      try {
        if (associatedObject === ASSOCIATED_OBJECT_TYPES.workflow) {
          const initialInputIds = [...currentInitialInputIds, inputOutput.id] || [inputOutput.id];

          await dispatch(updateWorkflowInitialInputs({
            nodeId,
            id: workflowId,
            initialInputIds,
          }));
        }

        if (associatedObject === ASSOCIATED_OBJECT_TYPES.flowStep) {
          const outputIdsByNodeId = { ...currentFlowStepOutputs } || {};
          const currentOutputIds = outputIdsByNodeId[flowStepOutputNodeId] || [];

          outputIdsByNodeId[flowStepOutputNodeId] = [...currentOutputIds];
          outputIdsByNodeId[flowStepOutputNodeId].push(inputOutput.id);

          await dispatch(updateFlowStepOutputs({
            nodeId: flowStepNodeId,
            workflowId,
            flowId,
            id: flowStepId,
            outputIdsByNodeId,
          }));
        }
      } catch (e) {
        dispatch(setAlert({
          isOpen: true,
          severity: 'error',
          message: 'Failed to add output',
        }));

        console.error(e);
      }
    });

    setLoading(false);

    onClose();
  };

  const title = associatedObject === ASSOCIATED_OBJECT_TYPES.workflow
    ? 'Create Initial Input' : 'Create Output';

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        {title}
        <CloseModalButton onClose={onClose} />
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit }) => (
            <form style={{ height: '100%' }} onSubmit={handleSubmit}>
              <FinalFormInputField
                fullWidth
                name="title"
                placeholder="IO Title"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ svg: { color: 'tree.hashtag' } }}>
                      <FontAwesomeIcon icon={faCodeCommit} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                sx={{ mt: 3, float: 'right' }}
                color="success"
                variant="contained"
                disableElevation
                type="submit"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} /> : <AddRounded />}
              >
                Create
              </Button>
            </form>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}

CreateIOModal.defaultProps = {
  flowStepId: null,
  flowStepOutputNodeId: null,
};

CreateIOModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  workflowId: PropTypes.string.isRequired,
  associatedObject: PropTypes.string.isRequired,
  flowStepId: PropTypes.string,
  flowStepOutputNodeId: PropTypes.string,
};
