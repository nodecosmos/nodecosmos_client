import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateIOModal, { ASSOCIATED_OBJECT_TYPES } from '../../../input-outputs/components/CreateIOModal';

export default function StartToolbar({ workflowId }) {
  const [createIOModalOpen, setCreateIOModalOpen] = React.useState(false);

  return (
    <Box
      display="flex"
      sx={{
        ml: 1,
        '.Item': {
          width: 31,
          height: 1,
          mx: 0.5,
          borderRadius: 1,
          '&:hover': { backgroundColor: 'toolbar.hover' },
        },
        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 15 },
      }}
    >
      <Tooltip title="Add Initial Input" placement="top">
        <IconButton
          className="Item"
          aria-label="Add Initial Inputs"
          sx={{ color: 'toolbar.red' }}
          onClick={() => setCreateIOModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </Tooltip>

      <CreateIOModal
        open={createIOModalOpen}
        onClose={() => setCreateIOModalOpen(false)}
        workflowId={workflowId}
        associatedObject={ASSOCIATED_OBJECT_TYPES.workflow}
      />
    </Box>
  );
}

StartToolbar.propTypes = {
  workflowId: PropTypes.string.isRequired,
};
