import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/pro-solid-svg-icons';
import AddRounded from '@mui/icons-material/AddRounded';
import { Button, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../app/constants';
import { selectWorkflowsByNodeId } from '../workflows.selectors';
import CreateWorkflowModal from './CreateWorkflowModal';

export default function WorkflowToolbar({ nodeId }) {
  const workflows = useSelector(selectWorkflowsByNodeId(nodeId));
  const workflow = workflows[0] || {};

  const [openCreateWorkflowDialog, setOpenCreateWorkflowDialog] = useState(false);

  return (
    <Box
      height={HEADER_HEIGHT}
      width={1}
      pl={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      boxShadow="2"
      zIndex={0}
    >
      <Box
        display="flex"
        alignItems="center"
      >
        {
          workflow.title && (
            <Typography fontWeight="bold" color="secondary">
              {workflow.title}
            </Typography>
          )
        }
        {
          !workflow.title && (
            <Button
              size="small"
              color="primary"
              variant="contained"
              disableElevation
              type="submit"
              startIcon={<AddRounded sx={{ color: 'text.foreground' }} />}
              onClick={() => setOpenCreateWorkflowDialog(true)}
            >
              Add Workflow
            </Button>
          )
        }
      </Box>

      <Tooltip title="edit" placement="top">
        <Button
          size="large"
          sx={{
            height: 1,
            color: 'toolbar.default',
          }}
        >
          <FontAwesomeIcon icon={faHashtag} />
        </Button>
      </Tooltip>

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
