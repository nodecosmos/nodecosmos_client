import React from 'react';
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectFlowAttribute } from '../../../flows/flows.selectors';
import { WORKFLOW_STEP_WIDTH, FLOW_STEP_SIZE } from '../../workflows.constants';
import InputPipe from '../../../input-outputs/components/InputPipe';
import NodeOutputsBranch from './NodeOutputsBranch';
import WorkflowNodeButton from './WorkflowNodeButton';
import WorkflowOutputButton from './WorkflowOutputButton';
import FlowStepToolbar from './FlowStepToolbar';

export default function FlowStep({
  flowStep, wfStepIndex, flowStepIndex, wfStepHovered,
}) {
  const flowTitle = useSelector(selectFlowAttribute(flowStep.workflowId, flowStep.flowId, 'title'));

  return (
    <g>
      <foreignObject
        x={WORKFLOW_STEP_WIDTH * (wfStepIndex + 1)}
        y={FLOW_STEP_SIZE * flowStepIndex + wfStepIndex * FLOW_STEP_SIZE + 55}
        width={WORKFLOW_STEP_WIDTH + 1}
        height={FLOW_STEP_SIZE}
      >
        <Box
          display="flex"
          alignItems="end"
          height={1}
          pl={2}
          pb={1}
          borderBottom={2}
          borderColor="workflow.default"
          color="text.tertiary"
          zIndex={1}
          position="relative"
        >
          <Typography
            fontSize={18.75}
            variant="body1"
            fontFamily="'Roboto', sans-serif"
            fontWeight={700}
            color="text.tertiary"
            textAlign="left"
          >
            {flowTitle}
          </Typography>
          {wfStepHovered && <FlowStepToolbar />}
        </Box>
      </foreignObject>
      {
        flowStep.nodes.map((node) => (
          <g key={node.diagramId}>
            {
              flowStep.inputsByNodeId[node.id]?.map((input) => (
                <g key={input.id}>
                  <InputPipe
                    nodeDiagramId={input.nodeDiagramId}
                    id={input.id}
                  />
                </g>
              ))
            }
            <WorkflowNodeButton diagramId={node.diagramId} id={node.id} />
            <NodeOutputsBranch diagramId={node.diagramId} />
            {
              flowStep.outputIdsByNodeId[node.id]?.map((input) => (
                <g key={input.id}>
                  <WorkflowOutputButton
                    diagramId={input.diagramId}
                    id={input.id}
                  />
                </g>
              ))
            }
          </g>
        ))
      }
    </g>
  );
}

FlowStep.propTypes = {
  flowStepIndex: PropTypes.number.isRequired,
  wfStepIndex: PropTypes.number.isRequired,
  flowStep: PropTypes.object.isRequired,
  wfStepHovered: PropTypes.bool.isRequired,
};
