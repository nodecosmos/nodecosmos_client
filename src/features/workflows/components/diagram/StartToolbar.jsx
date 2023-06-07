import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';
import CreateIoModal, { ASSOCIATED_OBJECT_TYPES } from '../../../input-outputs/components/CreateIoModal';

export default function StartToolbar({ workflowId }) {
  const [createIoModalOpen, setCreateIoModalOpen] = React.useState(false);

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
          onClick={() => setCreateIoModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </Tooltip>

      <CreateIoModal
        open={createIoModalOpen}
        onClose={() => setCreateIoModalOpen(false)}
        workflowId={workflowId}
        associatedObject={ASSOCIATED_OBJECT_TYPES.workflow}
      />
    </Box>
  );
}

StartToolbar.propTypes = {
  workflowId: PropTypes.string.isRequired,
};
