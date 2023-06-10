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
import { deleteFlow } from '../../../flows/flows.thunks';
import { selectWorkflowAttribute } from '../../workflows.selectors';
import FlowStepNodesModal from './FlowStepNodesModal';

export default function FlowStepToolbar({ flowId, workflowId, wfStepHovered }) {
  const nodeId = useSelector(selectWorkflowAttribute(workflowId, 'nodeId'));
  const dispatch = useDispatch();
  const handleFlowDeletion = () => {
    dispatch(deleteFlow({
      nodeId,
      workflowId,
      id: flowId,
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
              true && (
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
        flowId={flowId}
        workflowId={workflowId}
        open={addFlopStepNodesModalOpen}
        onClose={() => setAddFlowStepNodesModalOpen(false)}
      />
    </>
  );
}

FlowStepToolbar.propTypes = {
  flowId: PropTypes.string.isRequired,
  workflowId: PropTypes.string.isRequired,
  wfStepHovered: PropTypes.bool.isRequired,
};
