import NcAvatar from '../../../common/components/NcAvatar';
import ToolbarContainer from '../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../../features/app/constants';
import ContributionRequestDescription
    from '../../../features/contribution-requests/components/ContributionRequestDescription';
import ContributionRequestTitle from '../../../features/contribution-requests/components/ContributionRequestTitle';
import { selectContributionRequest } from '../../../features/contribution-requests/contributionRequests.selectors';
import { UUID } from '../../../types';
import { timeSince } from '../../../utils/localTime';
import { faComments, faDiagramNested } from '@fortawesome/pro-light-svg-icons';
import {
    Box, Container, Link, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    Outlet, Link as RouterLink, useParams,
} from 'react-router-dom';

export default function ContributionRequestConversation() {
    const { id: nodeId, contributionRequestId: id } = useParams();
    const contributionRequest = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));

    if (!contributionRequest) {
        return null;
    }

    const { owner, createdAt } = contributionRequest;

    return (
        <Box height={1} overflow="auto" my={2} pb={8}>
            <Container maxWidth="md">
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

                <Box
                    mt={1}
                    display="flex"
                    alignItems="center"
                    borderBottom={1}
                    borderColor="borders.2"
                    height={HEADER_HEIGHT}
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
                            title="Main Conversation"
                            icon={faComments}
                            to="."
                            titleAsTooltip={false}
                        />
                        <ToolbarItem
                            color="text.primary"
                            title="Activity"
                            icon={faDiagramNested}
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
