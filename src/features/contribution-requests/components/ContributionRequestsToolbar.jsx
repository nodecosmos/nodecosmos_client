import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

import AddRounded from '@mui/icons-material/AddRounded';
import { HEADER_HEIGHT } from '../../app/constants';
import CreateContributionRequestModal from './CreateContributionRequestModal';
import ContributionRequestSearchInput from './ContributionRequestSearchInput';

export default function ContributionRequestsToolbar({ nodeId }) {
  const [openCreateWorkflowDialog, setOpenCreateWorkflowDialog] = useState(false);

  return (
    <>
      <Box
        height={HEADER_HEIGHT}
        width={1}
        display="flex"
        alignItems="center"
        position="relative"
        boxShadow="2"
        zIndex={3}
        sx={{}}
      >
        <Button
          size="small"
          color="button"
          sx={{
            ml: 2, mr: 1, border: 1, borderColor: 'borders.4',
          }}
          variant="contained"
          disableElevation
          type="submit"
          startIcon={<AddRounded sx={{ color: 'text.foreground' }} />}
          onClick={() => setOpenCreateWorkflowDialog(true)}
        >
          Add Contribution Request
        </Button>

        <ContributionRequestSearchInput />
      </Box>
      <CreateContributionRequestModal
        nodeId={nodeId}
        open={openCreateWorkflowDialog}
        onClose={() => setOpenCreateWorkflowDialog(false)}
      />
    </>
  );
}

ContributionRequestsToolbar.propTypes = {
  nodeId: PropTypes.string.isRequired,
};
