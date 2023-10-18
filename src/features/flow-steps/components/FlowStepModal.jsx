import React, { useState } from 'react';

import {
  Box, DialogContent, Typography, Dialog, DialogTitle, IconButton,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { faSave } from '@fortawesome/pro-light-svg-icons';
import { setAlert } from '../../app/appSlice';
import { createFlowStep, updateFlowStepNodes } from '../flowSteps.thunks';
/* nodecosmos */
import { selectWorkflowAttribute } from '../../workflows/workflows.selectors';
import Tree from '../../trees/components/Tree';
import { TREES_TYPES } from '../../trees/trees.constants';
import { selectFlowStepAttribute } from '../flowSteps.selectors';
import { selectNodeAttribute, selectNodesById } from '../../nodes/nodes.selectors';
import DefaultModalFormButton from '../../../common/components/buttons/DefaultModalFormButton';

// Dumb implementation of import feature
export default function FlowStepModal({
  wfStepFlow, open, onClose,
}) {
  const [loading, setLoading] = React.useState(false);
  const nodeId = useSelector(selectWorkflowAttribute(wfStepFlow.workflowId, 'nodeId'));
  const tmpNodeId = useSelector(selectNodeAttribute(nodeId, 'tmpNodeId'));
  const nodeIds = useSelector(selectFlowStepAttribute(wfStepFlow.workflowId, wfStepFlow.flowStep?.id, 'nodeIds'));
  const allNodes = useSelector(selectNodesById);
  const dispatch = useDispatch();
  const [flowStepNodeIds, setFlowStepNodeIds] = useState(nodeIds);

  const onSubmit = async () => {
    setLoading(true);

    const filteredNodes = flowStepNodeIds.filter((flowNodeId) => !!allNodes[flowNodeId]);

    const payload = {
      nodeIds: filteredNodes,
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

      setTimeout(() => setLoading(false), 500);
      onClose();
    } catch (error) {
      dispatch(setAlert({ isOpen: true, severity: 'error', message: 'Failed to add node' }));
      console.error(error);
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      onClose={onClose}
      open={open}
      PaperProps={{
        elevation: 8,
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
          <CloseOutlined sx={{ color: 'background.3' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ overflow: 'hidden', height: 1 }}>
        <Box mt={2} height="calc(100% - 75px)">
          <Box height={1} sx={{ mx: -3, borderBottom: 1, borderColor: 'borders.4' }}>
            <Tree
              rootNodeId={tmpNodeId || nodeId}
              type={TREES_TYPES.checkbox}
              onChange={setFlowStepNodeIds}
              value={flowStepNodeIds}
            />
          </Box>
          <DefaultModalFormButton
            loading={loading}
            startIcon={faSave}
            title="Save"
            onSubmit={onSubmit}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

FlowStepModal.propTypes = {
  wfStepFlow: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
