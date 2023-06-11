import React from 'react';
import PropTypes from 'prop-types';
import { faPenToSquare, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { faDiagramSubtask } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* mui */
import {
  IconButton,
  Box, Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectFlowAttribute } from '../../../flows/flows.selectors';
import { deleteFlow } from '../../../flows/flows.thunks';
import { selectWorkflowAttribute } from '../../workflows.selectors';
import FlowStepNodesModal from './FlowStepNodesModal';

export default function FlowStepToolbar({ wfStepFlow, wfStepHovered }) {
  const nodeId = useSelector(selectWorkflowAttribute(wfStepFlow.workflowId, 'nodeId'));
  const flowStartIndex = useSelector(selectFlowAttribute(wfStepFlow.workflowId, wfStepFlow.id, 'startIndex'));

  const dispatch = useDispatch();
  const handleFlowDeletion = () => {
    dispatch(deleteFlow({
      nodeId,
      workflowId: wfStepFlow.workflowId,
      id: wfStepFlow.id,
    }));
  };

  const [addFlopStepNodesModalOpen, setAddFlowStepNodesModalOpen] = React.useState(false);

  return (
    <>
      {
        wfStepHovered && (
          <Box
            display="flex"
            sx={{
              ml: 1,
              '.Item': {
                width: 31,
                height: 1,
                mx: 0.5,
                borderRadius: 1,
                '&:hover': { backgroundColor: 'toolbar.hover' },
              },
              '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 16 },
            }}
          >
            <Tooltip title="Edit Flow Step" placement="top">
              <IconButton
                className="Item"
                aria-label="Add Node"
                sx={{ color: 'toolbar.yellow' }}
                onClick={() => setAddFlowStepNodesModalOpen(true)}
              >
                <FontAwesomeIcon icon={faDiagramSubtask} />
              </IconButton>
            </Tooltip>
            {
              wfStepFlow.stepIndex === flowStartIndex && (
                <>
                  <Tooltip title="Edit Flow" placement="top">
                    <IconButton className="Item" aria-label="Edit Flow" sx={{ color: 'toolbar.green' }}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Flow" placement="top">
                    <IconButton
                      className="Item"
                      aria-label="Delete Flow"
                      sx={{ color: 'toolbar.blue' }}
                      onClick={handleFlowDeletion}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                  </Tooltip>
                </>
              )
            }

          </Box>
        )
      }
      <FlowStepNodesModal
        wfStepFlow={wfStepFlow}
        open={addFlopStepNodesModalOpen}
        onClose={() => setAddFlowStepNodesModalOpen(false)}
      />
    </>
  );
}

FlowStepToolbar.propTypes = {
  wfStepFlow: PropTypes.object.isRequired,
  wfStepHovered: PropTypes.bool.isRequired,
};
