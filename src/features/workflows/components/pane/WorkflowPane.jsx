import React from 'react';
import { useSelector } from 'react-redux';
import IOPane from '../../../input-outputs/component/pane/IOPane';
import NodePane from '../../../nodes/components/pane/NodePane';
import { selectSelectedWorkflowDiagramObject } from '../../workflows.selectors';

export default function WorkflowPane() {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);

  const { type } = selectedWorkflowDiagramObject || {};

  const content = {
    node: <NodePane />,
    output: <IOPane />,
  };

  return content[type];
}
