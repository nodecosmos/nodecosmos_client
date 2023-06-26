import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { faPlus, faChartNetwork } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSelectedWorkflowDiagramObject } from '../../workflows.selectors';
import CreateIOModal, { ASSOCIATED_OBJECT_TYPES } from '../../../input-outputs/component/CreateIOModal';
import AssociateInputsModal from './AssociateInputsModal';

export default function WorkflowNodeButtonToolbar({
  diagramId, nodeId, workflowId, flowStepId, workflowStepIndex,
}) {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);
  const isSelected = selectedWorkflowDiagramObject?.diagramId === diagramId;

  const [createIOModalOpen, setCreateIOModalOpen] = React.useState(false);
  const [associateInputsModalOpen, setAssociateInputsModalOpen] = React.useState(false);

  return (
    <>
      {
        isSelected && (
          <Box
            display="flex"
            sx={{
              ml: 1,
              '.Item': {
                width: 32,
                height: 32,
                mx: 0.5,
                borderRadius: 1,
                '&:hover': { backgroundColor: 'toolbar.hover' },
              },
              '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 18 },
            }}
          >

            <Tooltip title="Add input from previous step" placement="top">
              <IconButton
                className="Item"
                aria-label="Add Outputs"
                sx={{ color: 'secondary.main' }}
                onClick={() => setAssociateInputsModalOpen(true)}
              >
                <FontAwesomeIcon icon={faChartNetwork} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Outputs" placement="top">
              <IconButton
                className="Item"
                aria-label="Add Outputs"
                sx={{ color: 'toolbar.red' }}
                onClick={() => setCreateIOModalOpen(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
      <CreateIOModal
        open={createIOModalOpen}
        onClose={() => setCreateIOModalOpen(false)}
        workflowId={workflowId}
        associatedObject={ASSOCIATED_OBJECT_TYPES.flowStep}
        flowStepId={flowStepId}
        flowStepOutputNodeId={nodeId}
      />
      <AssociateInputsModal
        open={associateInputsModalOpen}
        onClose={() => setAssociateInputsModalOpen(false)}
        workflowId={workflowId}
        flowStepId={flowStepId}
        flowStepInputNodeId={nodeId}
        workflowStepIndex={workflowStepIndex}
      />
    </>
  );
}

WorkflowNodeButtonToolbar.propTypes = {
  diagramId: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
  workflowId: PropTypes.string.isRequired,
  flowStepId: PropTypes.string.isRequired,
  workflowStepIndex: PropTypes.number.isRequired,
};
