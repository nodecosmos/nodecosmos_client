import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import WorkflowToolbar from '../WorkflowToolbar';
import { HEADER_HEIGHT } from '../../../app/constants';
import WorkflowContainer from '../WorkflowContainer';
import { WORKFLOW_DIAGRAM_CONTEXT } from '../../workflows.constants';
import { useWorkflowContextCreator } from '../../hooks/useWorkflowContext';
import { selectWorkflowsByNodeId } from '../../workflows.selectors';
import WorkflowContent from './WorkflowContent';

export default function Workflow({ nodeId, context }) {
  const workflows = useSelector(selectWorkflowsByNodeId(nodeId));
  const workflow = useMemo(() => workflows[0] || {}, [workflows]);

  const {
    WorkflowContext,
    contextProviderValue,
  } = useWorkflowContextCreator({ context, nodeId, id: workflow.id });

  return (
    <WorkflowContext.Provider value={contextProviderValue}>
      <WorkflowContainer>
        <WorkflowToolbar />
        <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
          <WorkflowContent />
        </Box>
      </WorkflowContainer>
    </WorkflowContext.Provider>
  );
}

Workflow.defaultProps = {
  context: WORKFLOW_DIAGRAM_CONTEXT.workflowPage,
};

Workflow.propTypes = {
  nodeId: PropTypes.string.isRequired,
  context: PropTypes.oneOf(Object.values(WORKFLOW_DIAGRAM_CONTEXT)),
};
