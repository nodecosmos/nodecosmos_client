import Alert from '../../../common/components/Alert';
import NcAvatar from '../../../common/components/NcAvatar';
import ToolbarContainer from '../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../common/components/toolbar/ToolbarItem';
import ContributionRequestTitle from '../../../features/contribution-requests/components/ContributionRequestTitle';
import { selectContributionRequest } from '../../../features/contribution-requests/contributionRequests.selectors';
import { UUID } from '../../../types';
import { timeSince } from '../../../utils/localTime';
import { faTimeline, faComments } from '@fortawesome/pro-light-svg-icons';
import {
    Box, Container, Link, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    Outlet, Link as RouterLink, useParams,
} from 'react-router-dom';

export default function ContributionRequestConversation() {
    const { id: nodeId, branchId: id } = useParams();
    const contributionRequest = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));

    if (!contributionRequest) {
        return null;
    }

    const { owner, createdAt } = contributionRequest;

    return (
        <Box height={1} overflow="auto" width={1} my={2} pb={8}>
            <Container className="overflow-hidden position-relative" maxWidth="lg">
                <Alert position="sticky" />
                <Box
                    display="flex"
                    alignItems="center"
                    borderBottom={1}
                    borderColor="borders.2">
                    <Link component={RouterLink} to={`/${owner.username}`}>
                        <NcAvatar size={35} name={owner.name} src={owner.profileImageUrl} />
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
                    <Typography
                        className="flaot-right"
                        component="span"
                        variant="body2"
                        color="text.tertiary"
                    >
                        {timeSince(createdAt)}
                    </Typography>
                </Box>
                <Box mt={3}>
                    <ContributionRequestTitle />
                </Box>
                <Box
                    mt={3}
                    display="flex"
                    alignItems="center"
                    borderBottom={0}
                    borderColor="borders.2"
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
                            color="text.primary"
                            iconColor="background.labels.green"
                            title="Main Thread"
                            icon={faComments}
                            to="."
                            titleAsTooltip={false}
                        />
                        <ToolbarItem
                            color="text.primary"
                            iconColor="toolbar.lightRed"
                            title="Object Threads"
                            icon={faTimeline}
                            to="activity"
                            titleAsTooltip={false}
                        />
                    </ToolbarContainer>
                </Box>

                <Outlet />
            </Container>
        </Box>
    );
}
