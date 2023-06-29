import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import InputBranch from '../io/InputBranch';
import NodeOutputsBranch from '../NodeOutputsBranch';
import WorkflowNodeButton from '../WorkflowNodeButton';
import WorkflowOutputButton from '../io/WorkflowOutputButton';

export default function FlowStep({ flowStep }) {
  const inputIdx = useRef({});
  const currentIdx = useRef(0);

  if (!flowStep) return null;

  return (
    <g>
      {
        flowStep.nodes.map((node) => (
          <g key={node.diagramId}>
            {
              flowStep.inputsByNodeId[node.id]?.map((input) => {
                // each input.id should have unique index
                if (!inputIdx.current[input.id]) {
                  inputIdx.current[input.id] = currentIdx.current;
                  currentIdx.current += 1;
                }

                return (
                  <g key={input.id}>
                    <InputBranch
                      nodeDiagramId={input.nodeDiagramId}
                      nodeId={node.id}
                      id={input.id}
                      index={inputIdx.current[input.id]}
                    />
                  </g>
                );
              })
            }
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
