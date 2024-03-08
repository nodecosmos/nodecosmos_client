import NcAvatar from '../../../common/components/NcAvatar';
import { selectObjectThreadIds } from '../../../features/comments/comments.selectors';
import CommentThread from '../../../features/comments/components/CommentThread';
import ContributionRequestDescription
    from '../../../features/contribution-requests/components/ContributionRequestDescription';
import ContributionRequestMainThread
    from '../../../features/contribution-requests/components/ContributionRequestMainThread';
import ContributionRequestTitle from '../../../features/contribution-requests/components/ContributionRequestTitle';
import { selectContributionRequest } from '../../../features/contribution-requests/contributionRequests.selectors';
import { UUID } from '../../../types';
import { timeSince } from '../../../utils/localTime';
import {
    Box, Container, Link, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

export default function ContributionRequestConversation() {
    const { id: nodeId, contributionRequestId: id } = useParams();
    const threadIds = useSelector(selectObjectThreadIds(id as UUID));
    const contributionRequest = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));

    if (!contributionRequest) {
        return null;
    }

    const { owner, createdAt } = contributionRequest;

    return (
        <Box height={1} overflow="auto" my={2} pb={8}>
            <Container maxWidth="lg">
                <Box display="flex" alignItems="center">
                    <Link component={RouterLink} to={`/${owner.username}`}>
                        <NcAvatar
                            width={35}
                            height={35}
                            name={owner.name}
                            src={owner.profileImageURL} />
                    </Link>
                    <Link component={RouterLink} to={`/${owner.username}`} display="flex" alignItems="center">
                        <Typography variant="body2" color="text.secondary" ml={1} fontWeight="bold">
                            {owner.name}
                        </Typography>
                        <Typography variant="body2" color="text.tertiary" ml={1} fontWeight="bold">
                                @{owner.username}
                        </Typography>
                    </Link>
                    <Box component="span" mx={1} fontSize={30}>
                        ·
                    </Box>
                    <Typography component="span" variant="body2" color="text.tertiary" sx={{ float: 'right' }}>
                        {timeSince(createdAt)}
                    </Typography>
                </Box>
                <ContributionRequestTitle />
                <ContributionRequestDescription />
                <Typography color="text.secondary" variant="h6" mt={2}>
                    Activity
                </Typography>

                <Box mb={2}>
                    {
                        threadIds && threadIds.filter(threadId => threadId !== id).map((threadId) => (
                            <Box mt={2} key={threadId} p={0}>
                                <CommentThread id={threadId} showLine />
                            </Box>
                        ))
                    }
                </Box>

                <ContributionRequestMainThread />
            </Container>
        </Box>
    );
}
