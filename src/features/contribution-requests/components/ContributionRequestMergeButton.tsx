import ContributionRequestStatusIcon from './ContributionRequestStatusIcon';
import ConfirmationModal, { ConfirmType } from '../../../common/components/ConfirmationModal';
import useModalOpen from '../../../common/hooks/useModalOpen';
import { UUID } from '../../../types';
import { ContributionRequestStatus } from '../contributionRequest.types';
import { selectContributionRequest } from '../contributionRequests.selectors';
import useMerge from '../hooks/useMerge';
import { faCodeMerge } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ContributionRequestMergeButton() {
    const {
        id: nodeId,
        branchId: id,
    } = useParams();

    const contributionRequest = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));
    const merge = useMerge();
    const [modOpen, openMod, closeMod] = useModalOpen();

    if (contributionRequest?.status == ContributionRequestStatus.Merged) {
        return (
            <Button
                color="secondary"
                className="NodeButton"
                startIcon={<ContributionRequestStatusIcon status={contributionRequest.status} />}>
                Merged
            </Button>
        );
    }

    if (!contributionRequest) return null;

    return (
        <div>
            <Button
                variant="outlined"
                className="NodeButton focused"
                onClick={openMod}
                startIcon={<FontAwesomeIcon icon={faCodeMerge} />}
            >
                Merge
            </Button>

            <ConfirmationModal
                text="This action will apply all changes from this contribution request to the original records."
                confirmText="Merge Changes"
                confirmType={ConfirmType.Merge}
                open={modOpen}
                onClose={closeMod}
                onConfirm={merge}
            />
        </div>
    );
}
