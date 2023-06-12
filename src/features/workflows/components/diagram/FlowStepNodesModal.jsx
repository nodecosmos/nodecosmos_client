import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import AddRounded from '@mui/icons-material/AddRounded';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';

/* mui */
import {
  Button,
  DialogContent, Typography,
} from '@mui/material';
import FinalFormCheckboxTree from '../../../../common/components/final-form/FinalFormCheckboxTree';
import { setAlert } from '../../../app/appSlice';
import { selectFlowStepAttribute } from '../../../flow-steps/flowSteps.selectors';
import { createFlowStep, updateFlowStepNodes } from '../../../flow-steps/flowSteps.thunks';
import ImportSearchField from '../../../nodes/components/importer/ImportSearchField';
/* nodecosmos */
import {
  selectChildIdsByParentId, selectNodesById,
} from '../../../nodes/nodes.selectors';
import { selectWorkflowAttribute } from '../../workflows.selectors';

// Dumb implementation of import feature
export default function FlowStepNodesModal({
  wfStepFlow, open, onClose,
}) {
  const [loading, setLoading] = React.useState(false);

  const allNodesById = useSelector(selectNodesById);
  const nodeId = useSelector(selectWorkflowAttribute(wfStepFlow.workflowId, 'nodeId'));
  const childIdsByParentId = useSelector(selectChildIdsByParentId(nodeId));
  const nodeIds = useSelector(selectFlowStepAttribute(wfStepFlow.workflowId, wfStepFlow.flowStep?.id, 'nodeIds'));
  const dispatch = useDispatch();

  if (!childIdsByParentId) return null;

  const childIds = childIdsByParentId[nodeId];

  const onSubmit = async (formValues) => {
    setLoading(true);

    const { flowStepNodeIds } = formValues;

    const payload = {
      nodeIds: flowStepNodeIds,
      nodeId,
      workflowId: wfStepFlow.workflowId,
      flowId: wfStepFlow.id,
    };

    try {
      if (wfStepFlow.flowStep) {
        payload.id = wfStepFlow.flowStep.id;
        await dispatch(updateFlowStepNodes(payload));
      } else {
        await dispatch(createFlowStep(payload));
      }

      setLoading(false);
      onClose();
    } catch (e) {
      dispatch(setAlert({ isOpen: true, severity: 'error', message: 'Failed to add node' }));
      console.error(e);
      setLoading(false);
    }
  };

  const checkboxTreeOptions = [];

  const addCheckboxTreeOptions = (currNodeId) => ({
    value: currNodeId,
    label: allNodesById[currNodeId].title,
    children: childIdsByParentId[currNodeId].filter((childId) => childId !== nodeId && childIds.indexOf(childId) < 0)
      .map((childId) => addCheckboxTreeOptions(childId)),
  });

  childIdsByParentId[nodeId] && childIdsByParentId[nodeId].forEach((childId) => {
    checkboxTreeOptions.push(addCheckboxTreeOptions(childId));
  });

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          p: 0,
          height: '100%',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography
            align="center"
            variant="body1"
            fontWeight="bold"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            Add Flow Step Nodes
          </Typography>
        </Box>
        <IconButton
          disableRipple
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseOutlined sx={{ color: 'background.4' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ overflow: 'hidden', height: 1 }}>
        <Box mt={2} height={1}>
          <Form
            initialValues={{
              flowStepNodeIds: nodeIds || [],
            }}
            onSubmit={onSubmit}
            subscription={{ submitting: true }}
          >
            {({ handleSubmit }) => (
              <form style={{ height: 'calc(100% - 136px)' }} onSubmit={handleSubmit}>
                <Box mb={2}>
                  <ImportSearchField rootNodeId={nodeId} />
                </Box>
                <Box
                  pl={2}
                  overflow="auto"
                  height={1}
                  borderTop={1}
                  borderBottom={1}
                  borderColor="borders.1"
                >
                  <FinalFormCheckboxTree
                    name="flowStepNodeIds"
                    options={checkboxTreeOptions}
                  />
                </Box>
                <Button
                  sx={{ mt: 2, float: 'right' }}
                  color="success"
                  variant="contained"
                  disableElevation
                  type="submit"
                  disabled={loading}
                  startIcon={loading
                    ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} /> : <AddRounded />}
                >
                  Import
                </Button>
              </form>
            )}
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

FlowStepNodesModal.propTypes = {
  wfStepFlow: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
