import ToolbarContainer from '../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../common/components/toolbar/ToolbarItem';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { HEADER_HEIGHT } from '../../app/constants';
import { checkDeletedAncestorConflict } from '../../branch/branches.thunks';
import useBranchParams from '../../branch/hooks/useBranchParams';
import { CRPrimaryKey } from '../contributionRequest.types';
import { mergeContributionRequest } from '../contributionRequests.thunks';
import {
    faCodeCommit, faDiagramNested, faListTree, faComments, faCodeMerge,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function ContributionRequestsShowToolbar() {
    const {
        id: nodeId,
        contributionRequestId: id,
    } = useParams();
    const { mainBranchId, branchId } = useBranchParams();
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const navigate = useNavigate();

    if (!nodeId) {
        throw new Error('Missing nodeId');
    }

    const merge = useCallback(async () => {
        const response = await dispatch(mergeContributionRequest({
            nodeId,
            id,
        } as CRPrimaryKey));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);

            dispatch(checkDeletedAncestorConflict({
                mainBranchId,
                branchId,
                nodeId,
            }));

            return;
        }

        navigate(`/nodes/${nodeId}`);
    }, [branchId, dispatch, handleServerError, id, mainBranchId, navigate, nodeId]);

    return (
        <Box
            display="flex"
            alignItems="center"
            height={HEADER_HEIGHT}
            borderBottom={1}
            borderColor="borders.2"
            pl={1}
        >
            <ToolbarContainer
                hasText
                round={false}
                showIndicator={false}
                size={32}
                mr={1}
                borderRadius={1.25}
                hoverColor="background.7"
                activeColor="background.7"
            >
                <ToolbarItem
                    title="Conversation"
                    icon={faComments}
                    color="text.primary"
                    titleAsTooltip={false}
                    to="."
                />
                <ToolbarItem
                    title="Tree changes"
                    icon={faDiagramNested}
                    color="text.primary"
                    titleAsTooltip={false}
                    to="tree"
                />
                <ToolbarItem
                    title="Workflow changes"
                    icon={faCodeCommit}
                    color="text.primary"
                    titleAsTooltip={false}
                    to="workflow"
                />
                <ToolbarItem
                    title="Commits"
                    icon={faListTree}
                    color="text.primary"
                    titleAsTooltip={false}
                    to="commits"
                />
                <Button
                    variant="outlined"
                    className="NodeButton focused"
                    onClick={merge}
                    startIcon={<FontAwesomeIcon icon={faCodeMerge} />}
                >
                    Merge
                </Button>
            </ToolbarContainer>
        </Box>
    );
}
