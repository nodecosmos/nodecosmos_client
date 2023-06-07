import React from 'react';
import PropTypes from 'prop-types';
import InputPipe from '../../../input-outputs/components/InputPipe';
import NodeOutputsBranch from './NodeOutputsBranch';
import WorkflowNodeButton from './WorkflowNodeButton';
import WorkflowOutputButton from './WorkflowOutputButton';

export default function FlowStep({ flowStep }) {
  if (!flowStep) return null;

  return (
    <g>
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

FlowStep.defaultProps = {
  flowStep: null,
};

FlowStep.propTypes = {
  flowStep: PropTypes.object,
};
