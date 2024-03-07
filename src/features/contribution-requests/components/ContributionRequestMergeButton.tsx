import ContributionRequestStatusIcon from './ContributionRequestStatusIcon';
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
        contributionRequestId: id,
    } = useParams();

    const contributionRequest = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));
    const merge = useMerge();

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
        <Button
            variant="outlined"
            className="NodeButton focused"
            onClick={merge}
            startIcon={<FontAwesomeIcon icon={faCodeMerge} />}
        >
            Merge
        </Button>
    );
}
