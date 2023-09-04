import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import NodeOutputsBranch from '../NodeOutputsBranch';
import WorkflowNodeButton from '../WorkflowNodeButton';
import WorkflowOutputButton from '../io/WorkflowOutputButton';
import NodeInputBranches from '../io/NodeInputBranches';

export default function FlowStep({ flowStep }) {
  const inputIdx = useRef({});
  const currentIdx = useRef(0);

  if (!flowStep) return null;

  return (
    <g>
      {
        flowStep.nodes.map((node) => (
          <g key={node.diagramId}>
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
            <NodeOutputsBranch diagramId={node.diagramId} />
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
