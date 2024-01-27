import ContributionRequestStatusIcon from './ContributionRequestStatusIcon';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { showNode } from '../../nodes/nodes.thunks';
import { ContributionRequestStatus, CRPrimaryKey } from '../contributionRequest.types';
import { selectContributionRequest } from '../contributionRequests.selectors';
import { mergeContributionRequest } from '../contributionRequests.thunks';
import { faCodeMerge } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function ContributionRequestMergeButton() {
    const {
        id: nodeId,
        contributionRequestId: id,
    } = useParams();

    if (!nodeId) {
        throw new Error('Missing nodeId');
    }

    if (!id) {
        throw new Error('Missing contributionRequestId');
    }

    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const navigate = useNavigate();
    const contributionRequest = useSelector(selectContributionRequest(nodeId, id));

    const merge = useCallback(async () => {
        const response = await dispatch(mergeContributionRequest({
            nodeId,
            id,
        } as CRPrimaryKey));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);

            return;
        }

        await dispatch(showNode(nodeId));
        navigate(`/nodes/${nodeId}`);
        setTimeout(() => dispatch(setAlert({
            isOpen: true,
            severity: 'success',
            message: 'Contribution request merged successfully!',
        })));
    }, [dispatch, handleServerError, id, navigate, nodeId]);

    if (!contributionRequest) {
        return null;
    }

    if (contributionRequest.status == ContributionRequestStatus.Merged) {
        return (
            <Button
                color="secondary"
                className="NodeButton"
                startIcon={ContributionRequestStatusIcon({ status: contributionRequest.status })}>
                Merged
            </Button>
        );
    }

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
