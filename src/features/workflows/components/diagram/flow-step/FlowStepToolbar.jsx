import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faDiagramProject, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* mui */
import {
  IconButton,
  Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import FlowStepModal from '../../../../flow-steps/components/FlowStepModal';
import { deleteFlowStep } from '../../../../flow-steps/flowSteps.thunks';
import FlowModal from '../../../../flows/components/FlowModal';
import { selectWorkflowAttribute } from '../../../workflows.selectors';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';

export default function FlowStepToolbar({ wfStepFlow }) {
  const nodeId = useSelector(selectWorkflowAttribute(wfStepFlow.workflowId, 'nodeId'));
  const { wfStepIndex: workflowStepIndex } = useWorkflowStepContext();

  const dispatch = useDispatch();

  const handleFlowStepDeletion = () => {
    dispatch(deleteFlowStep({
      nodeId,
      workflowId: wfStepFlow.workflowId,
      workflowIndex: workflowStepIndex,
      id: wfStepFlow.flowStep.id,
    }));
  };

  const [addFlopStepNodesModalOpen, setAddFlowStepNodesModalOpen] = useState(false);
  const [editFlowModalOpen, setEditFlowModalOpen] = useState(false);

  const { hovered } = useWorkflowStepContext();

  return (
    <div>
      {
        hovered && (
          <ToolsContainer>
            <Tooltip title="Flow Step Nodes" placement="top">
              <IconButton
                className="Item"
                aria-label="Add Node"
                sx={{ color: 'toolbar.lightRed' }}
                onClick={() => setAddFlowStepNodesModalOpen(true)}
              >
                <FontAwesomeIcon icon={faDiagramProject} />
              </IconButton>
            </Tooltip>
            {
              wfStepFlow.flowStep && (
                <Tooltip title="Delete Flow Step" placement="top">
                  <IconButton
                    className="Item"
                    aria-label="Delete Flow Step"
                    sx={{ color: 'toolbar.blue' }}
                    onClick={handleFlowStepDeletion}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Tooltip>
              )
            }
          </ToolsContainer>
        )
      }

      <FlowModal
        workflowId={wfStepFlow.workflowId}
        open={editFlowModalOpen}
        onClose={() => { setEditFlowModalOpen(false); }}
        id={wfStepFlow.id}
      />
      <FlowStepModal
        wfStepFlow={wfStepFlow}
        open={addFlopStepNodesModalOpen}
        onClose={() => setAddFlowStepNodesModalOpen(false)}
      />
    </div>
  );
}

FlowStepToolbar.propTypes = {
  wfStepFlow: PropTypes.object.isRequired,
};
