import React, { useState } from 'react';
import { faTerminal } from '@fortawesome/pro-solid-svg-icons';
import { Button, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import ToolbarContainer from '../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../app/constants';
import { selectIsWfPaneOpen, selectWorkflowsByNodeId } from '../workflows.selectors';
import { setIsWfPaneOpen } from '../workflowsSlice';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import CreateWorkflowModal from './CreateWorkflowModal';
import WorkflowZoomTools from './tools/WorkflowZoomTools';

export default function WorkflowToolbar({ nodeId }) {
  const isWfPaneOpen = useSelector(selectIsWfPaneOpen);
  const workflows = useSelector(selectWorkflowsByNodeId(nodeId));
  const workflow = workflows[0] || {};

  const dispatch = useDispatch();

  const [openCreateWorkflowDialog, setOpenCreateWorkflowDialog] = useState(false);

  return (
    <Box
      height={HEADER_HEIGHT}
      width={1}
      pl={1.25}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      boxShadow="2"
      borderBottom={1}
      borderColor="borders.1"
      zIndex={3}
    >
      <Box
        display="flex"
        alignItems="center"
      >
        {
          workflow.title && (
            <Typography color="text.secondary" pr={1} variant="body2">
              {workflow.title}
            </Typography>
          )
        }
        {
          !workflow.title && (
            <DefaultButton
              title="Add Workflow"
              startIcon={<FontAwesomeIcon icon={faAdd} />}
              onClick={() => setOpenCreateWorkflowDialog(true)}
            />
          )
        }
      </Box>

      {workflow.title && <WorkflowZoomTools />}

      {!isWfPaneOpen && (
        <ToolbarContainer round mr={0.5}>
          <ToolbarItem
            title={isWfPaneOpen ? 'Hide Workflow Pane' : 'Show Workflow Pane'}
            icon={faTerminal}
            color="toolbar.pink"
            active={false}
            onClick={() => dispatch(setIsWfPaneOpen(!isWfPaneOpen))}
            flipX={!isWfPaneOpen}
          />
          <Button sx={{ display: 'none' }} />
          {/* hack to get styles right */}
        </ToolbarContainer>
      )}
      {isWfPaneOpen && <div />}

      <CreateWorkflowModal
        open={openCreateWorkflowDialog}
        onClose={() => setOpenCreateWorkflowDialog(false)}
        nodeId={nodeId}
      />
    </Box>
  );
}

WorkflowToolbar.propTypes = {
  nodeId: PropTypes.string.isRequired,
};
