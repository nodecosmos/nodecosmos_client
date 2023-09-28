import React, { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HEADER_HEIGHT } from '../../app/constants';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import CreateContributionRequestModal from './CreateContributionRequestModal';
import ContributionRequestSearchInput from './ContributionRequestSearchInput';

export default function ContributionRequestsIndexToolbar({ nodeId }) {
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
        borderBottom={1}
        borderColor="borders.1"
        zIndex={3}
        pl={1.25}
      >
        <DefaultButton
          title="Add Contribution Request"
          startIcon={<FontAwesomeIcon icon={faAdd} />}
          onClick={() => setOpenCreateWorkflowDialog(true)}
        />

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

ContributionRequestsIndexToolbar.propTypes = {
  nodeId: PropTypes.string.isRequired,
};
