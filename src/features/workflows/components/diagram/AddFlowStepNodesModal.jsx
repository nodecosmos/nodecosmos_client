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
import { createFlowStep } from '../../../flow-steps/flowSteps.thunks';
import ImportSearchField from '../../../nodes/components/importer/ImportSearchField';
/* nodecosmos */
import {
  selectChildIdsByParentId, selectNodesById,
} from '../../../nodes/nodes.selectors';
import { selectWorkflowAttribute } from '../../workflows.selectors';

// Dumb implementation of import feature
export default function AddFlowStepNodesModal({
  flowId, workflowId, open, onClose,
}) {
  const [loading, setLoading] = React.useState(false);

  const allNodesById = useSelector(selectNodesById);
  const nodeId = useSelector(selectWorkflowAttribute(workflowId, 'nodeId'));
  const childIdsByParentId = useSelector(selectChildIdsByParentId(nodeId));
  const dispatch = useDispatch();

  if (!childIdsByParentId) return null;

  const childIds = childIdsByParentId[nodeId];

  const onSubmit = async (formValues) => {
    setLoading(true);

    const importedNodeIds = Object.keys(formValues.importedNodeIds).filter(
      (impNodeId) => formValues.importedNodeIds[impNodeId],
    );

    const payload = {
      nodeIds: importedNodeIds,
      nodeId,
      workflowId,
      flowId,
    };

    try {
      await dispatch(createFlowStep(payload));
      setLoading(false);
      onClose();
    } catch (e) {
      dispatch(setAlert({ isOpen: true, severity: 'error', message: 'Failed to add node' }));
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

  childIdsByParentId[nodeId].forEach((childId) => {
    checkboxTreeOptions.push(addCheckboxTreeOptions(childId));
  });

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          p: 3,
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
      <DialogContent>
        <Box mt={2}>
          <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
            {({ handleSubmit }) => (
              <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                <Typography color="text.tertiary" mb={2}>
                  Select nodes to add to flow step
                </Typography>
                <Box mb={2}>
                  <ImportSearchField />
                </Box>
                <FinalFormCheckboxTree name="importedNodeIds" options={checkboxTreeOptions} />
                <Button
                  sx={{ mt: 3, float: 'right' }}
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

AddFlowStepNodesModal.propTypes = {
  workflowId: PropTypes.string.isRequired,
  flowId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
