import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Tooltip } from '@mui/material';
import { faPlus, faChartNetwork } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { selectSelectedWorkflowDiagramObject } from '../../../workflows.selectors';
import CreateIOModal from '../../../../input-outputs/components/CreateIOModal';
import AssociateInputsModal from '../AssociateInputsModal';
import { ASSOCIATED_OBJECT_TYPES } from '../../../../input-outputs/inputOutputs.constants';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';

export default function WorkflowNodeButtonToolbar({
  diagramId, nodeId, flowStepId,
}) {
  const { wfStepIndex } = useWorkflowStepContext();

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

            <Tooltip title="Inputs" placement="top">
              <IconButton
                className="Item"
                aria-label="Inputs"
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
        associatedObject={ASSOCIATED_OBJECT_TYPES.flowStep}
        flowStepId={flowStepId}
        flowStepOutputNodeId={nodeId}
        workflowIndex={wfStepIndex}
      />
      <AssociateInputsModal
        open={associateInputsModalOpen}
        onClose={() => setAssociateInputsModalOpen(false)}
        flowStepId={flowStepId}
        flowStepInputNodeId={nodeId}
      />
    </>
  );
}

WorkflowNodeButtonToolbar.propTypes = {
  diagramId: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
  flowStepId: PropTypes.string.isRequired,
};
