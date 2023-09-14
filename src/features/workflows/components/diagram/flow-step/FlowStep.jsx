import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import NodeOutputsBranch from '../nodes/NodeOutputsBranch';
import WorkflowNodeButton from '../nodes/WorkflowNodeButton';
import WorkflowOutputButton from '../ios/WorkflowOutputButton';
import NodeInputBranches from '../ios/NodeInputBranches';

export default function FlowStep({ flowStep }) {
  const inputIdx = useRef({});
  const currentIdx = useRef(0);

  if (!flowStep) return null;

  return (
    <g>
      {
        flowStep.nodes.map((node) => (
          <g key={node.diagramId}>
            <NodeOutputsBranch diagramId={node.diagramId} />
            <NodeInputBranches
              currentIdx={currentIdx}
              inputIdx={inputIdx}
              flowStep={flowStep}
              node={node}
            />
            <WorkflowNodeButton
              diagramId={node.diagramId}
              id={node.id}
              flowStepId={flowStep.id}
              workflowId={flowStep.workflowId}
              workflowStepIndex={flowStep.workflowStepIndex}
            />
            {
              flowStep.outputIdsByNodeId[node.id]?.map((id) => (
                <WorkflowOutputButton id={id} key={id} nodeId={node.id} />
              ))
            }
          </g>
        ))
      }
    </g>
  );
}

FlowStep.defaultProps = {
  flowStep: null,
};

FlowStep.propTypes = {
  flowStep: PropTypes.object,
};
