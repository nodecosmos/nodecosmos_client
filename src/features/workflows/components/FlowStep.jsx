import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { faWaveSine } from '@fortawesome/pro-solid-svg-icons';
import { selectFlowAttribute } from '../../flows/flows.selectors';
import {
  WORKFLOW_STEP_HEIGHT, WORKFLOW_STEP_WIDTH, MARGIN_TOP, FLOW_STEP_SIZE,
} from '../workflows.constants';
import InputPipe from './InputPipe';
import IoBranch from './IoBranch';
import WorkflowNodeButton from './WorkflowNodeButton';
import WorkflowOutputButton from './WorkflowOutputButton';

export default function FlowStep({ flowStep, wfStepIndex, flowStepIndex }) {
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
            variant="body1"
            fontFamily="'Roboto', sans-serif"
            fontWeight={700}
            color="text.tertiary"
            textAlign="left"
          >
            {flowTitle}
          </Typography>
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
                  outputId={input.id}
                  outputDiagramId={input.diagramId}
                />
              </g>
            ))
          }
          <WorkflowNodeButton diagramId={node.diagramId} id={node.id} />
          <IoBranch diagramId={node.diagramId} />
          {
            flowStep.outputsByNodeId[node.id]?.map((input) => (
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
};
