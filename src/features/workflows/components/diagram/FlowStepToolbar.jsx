import React from 'react';
import PropTypes from 'prop-types';
import { faPenToSquare, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
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

export default function FlowStepToolbar({ flowId, workflowId }) {
  const nodeId = useSelector(selectWorkflowAttribute(workflowId, 'nodeId'));
  const dispatch = useDispatch();
  const handleFlowDeletion = () => {
    dispatch(deleteFlow({
      nodeId,
      workflowId,
      id: flowId,
    }));
  };

  return (
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
      <Tooltip title="Add Node" placement="top">
        <IconButton className="Item" aria-label="Add Node" sx={{ color: 'toolbar.red' }}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Next Flow Step" placement="top">
        <IconButton className="Item" aria-label="Add Next Flow Step" sx={{ color: 'toolbar.yellow' }}>
          <FontAwesomeIcon icon={faDiagramSubtask} />
        </IconButton>
      </Tooltip>
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
    </Box>
  );
}

FlowStepToolbar.propTypes = {
  flowId: PropTypes.string.isRequired,
  workflowId: PropTypes.string.isRequired,
};
