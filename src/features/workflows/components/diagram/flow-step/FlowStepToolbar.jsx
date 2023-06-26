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
import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import FlowStepModal from '../../../../flow-steps/components/FlowStepModal';
import { deleteFlowStep } from '../../../../flow-steps/flowSteps.thunks';
import { selectFlowAttribute } from '../../../../flows/flows.selectors';
import { deleteFlow } from '../../../../flows/flows.thunks';
import { selectWorkflowAttribute } from '../../../workflows.selectors';

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

  const handleFlowStepDeletion = () => {
    dispatch(deleteFlowStep({
      nodeId,
      workflowId: wfStepFlow.workflowId,
      flowId: wfStepFlow.id,
      id: wfStepFlow.flowStep.id,
    }));
  };

  const [addFlopStepNodesModalOpen, setAddFlowStepNodesModalOpen] = React.useState(false);

  return (
    <Box>
      {
        wfStepHovered && (
          <ToolsContainer>
            {
              wfStepFlow.stepIndex === flowStartIndex && (
                <Box borderRight={1} borderColor="borders.3">
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
              )
            }
            <Tooltip title="Edit Flow Step" placement="top">
              <IconButton
                className="Item"
                aria-label="Add Node"
                sx={{ color: 'toolbar.lightRed' }}
                onClick={() => setAddFlowStepNodesModalOpen(true)}
              >
                <FontAwesomeIcon icon={faDiagramSubtask} />
              </IconButton>
            </Tooltip>
            {
              wfStepFlow.flowStep && (
                <Tooltip title="Delete Flow Step" placement="top">
                  <IconButton
                    className="Item"
                    aria-label="Delete Flow Step"
                    sx={{ color: 'toolbar.lightRed' }}
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

      <FlowStepModal
        wfStepFlow={wfStepFlow}
        open={addFlopStepNodesModalOpen}
        onClose={() => setAddFlowStepNodesModalOpen(false)}
      />
    </Box>
  );
}

FlowStepToolbar.propTypes = {
  wfStepFlow: PropTypes.object.isRequired,
  wfStepHovered: PropTypes.bool.isRequired,
};
