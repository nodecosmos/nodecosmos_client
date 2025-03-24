import CrTooltip from './CrTooltip';
import SidebarListItem from './SidebarListItem';
import {
    HEADER_HEIGHT, NODECOSMOS_NODE_ID, STRIPE_ENABLED,
} from '../../../app/constants';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectCurrentUser } from '../../../users/users.selectors';
import { maybeSelectNode } from '../../nodes.selectors';
import {
    faCodePullRequest as faCodePullRequestSolid,
    faUsers as faUsersSolid,
    faMessageBot as faMessageBotSolid,
    faTable as faTableSolid,
} from '@fortawesome/pro-duotone-svg-icons';
import {
    faMoneyCheckDollar,
    faCodeCommit,
    faCodePullRequest,
    faUsers,
    faMessageBot,
    faHashtag,
    faTable,
    faContactBook,
} from '@fortawesome/pro-light-svg-icons';
import {
    faHashtag as faHashtagSolid, faCodeCommit as faCodeCommitSolid, faMoneyCheckDollar as faMoneyCheckDollarSolid,
} from '@fortawesome/pro-regular-svg-icons';
import { faSquareLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfoIcon from '@mui/icons-material/Info';
import {
    List, Box, Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface Props {
    handleClose?: () => void;
}

const POPPER_PROPS = {
    className: 'TooltipElement',
    sx: { p: 0 },
};

const COMPONENTS_PROPS = { tooltip: { sx: { p: 0 } } };

export default function Sidebar({ handleClose }: Props) {
    const {
        originalId, branchId, nodeId, isBranch, isContributionRequest, branchNodeId, title, isBranchQ,
    } = useBranchContext();
    const toOrgId = isContributionRequest ? originalId : branchId;
    const toPath = `${toOrgId}/${nodeId}`;
    const pathParams = isBranchQ ? `?isBranchQ=${isBranchQ}&originalIdQ${originalId}` : '';
    const sx = useMemo(() => ({
        px: 1,
        pt: isBranch && !isContributionRequest ? 0 : 1,
        mt: '-1px',
    }), [isBranch, isContributionRequest]);
    const currentUser = useSelector(selectCurrentUser);
    const maybeRoot = useSelector(maybeSelectNode(originalId, originalId));

    return (
        <Box
            component="nav"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            mt={HEADER_HEIGHT}
        >
            <List sx={sx}>
                {
                    (isBranch && title && !isContributionRequest && branchNodeId) && (
                        <>
                            <Box pb={1} mb={1} mx={-1} borderTop={1} borderBottom={1} borderColor="borders.3">
                                <Tooltip
                                    componentsProps={COMPONENTS_PROPS}
                                    PopperProps={POPPER_PROPS}
                                    placement="right"
                                    title={<CrTooltip />}>
                                    <Typography
                                        display="inline-flex"
                                        alignItems="center"
                                        mx={2.5}
                                        mt={2}
                                        mb={1}
                                        align="left"
                                        fontSize={14}
                                        fontWeight={700}
                                        color="texts.tertiary">
                                        <Box component="span" mr={1}>Contribution Request</Box>
                                        <InfoIcon fontSize="small" />
                                    </Typography>
                                </Tooltip>

                                <SidebarListItem
                                    onClick={handleClose}
                                    to={`${originalId}/${branchNodeId}/contribution_requests/${branchId}`}
                                    icon={(<FontAwesomeIcon icon={faSquareLeft} />)}
                                    selectedIcon={(<FontAwesomeIcon icon={faCodeCommitSolid} />)}
                                    title={title}
                                    color="toolbar.orange"
                                />
                            </Box>

                        </>
                    )
                }
                <SidebarListItem
                    onClick={handleClose}
                    to={toPath + pathParams}
                    icon={(<FontAwesomeIcon icon={faHashtag} />)}
                    selectedIcon={(<FontAwesomeIcon icon={faHashtagSolid} />)}
                    title="Node"
                    end
                />
                <SidebarListItem
                    onClick={handleClose}
                    to={`${toPath}/workflow${pathParams}`}
                    icon={(<FontAwesomeIcon icon={faCodeCommit} />)}
                    selectedIcon={(<FontAwesomeIcon icon={faCodeCommitSolid} />)}
                    title="Workflows"
                />
                {
                    (!isBranch || isContributionRequest) && (
                        <>
                            <SidebarListItem
                                onClick={handleClose}
                                to={`${toPath}/contribution_requests`}
                                icon={(<FontAwesomeIcon icon={faCodePullRequest} />)}
                                selectedIcon={(<FontAwesomeIcon icon={faCodePullRequestSolid} />)}
                                title="Contribution Requests"
                                end={false}
                            />
                            <SidebarListItem
                                onClick={handleClose}
                                to={`${toPath}/threads`}
                                icon={(<FontAwesomeIcon icon={faMessageBot} />)}
                                selectedIcon={(<FontAwesomeIcon icon={faMessageBotSolid} />)}
                                title="Threads"
                                end={false}
                            />
                            {
                                currentUser
                                && maybeRoot
                                && !maybeRoot.isPublic
                                && currentUser.id === maybeRoot.ownerId
                                && STRIPE_ENABLED && (
                                    <SidebarListItem
                                        onClick={handleClose}
                                        to={`${toPath}/subscriptions${pathParams}`}
                                        icon={(<FontAwesomeIcon icon={faMoneyCheckDollar} />)}
                                        selectedIcon={(<FontAwesomeIcon icon={faMoneyCheckDollarSolid} />)}
                                        title="Subscription"
                                    />
                                )
                            }
                            <SidebarListItem
                                onClick={handleClose}
                                to={`${toPath}/team`}
                                icon={(<FontAwesomeIcon icon={faUsers} />)}
                                selectedIcon={(<FontAwesomeIcon icon={faUsersSolid} />)}
                                title="Team"
                            />
                            <SidebarListItem
                                onClick={handleClose}
                                disabled
                                to={`${toPath}/tasks_board`}
                                icon={(<FontAwesomeIcon icon={faTable} />)}
                                selectedIcon={(<FontAwesomeIcon icon={faTableSolid} />)}
                                title="Tasks (Upcoming)"
                            />
                            {
                                originalId === NODECOSMOS_NODE_ID && (
                                    <SidebarListItem
                                        onClick={handleClose}
                                        to="/contact"
                                        icon={(<FontAwesomeIcon icon={faContactBook} />)}
                                        selectedIcon={(<FontAwesomeIcon icon={faContactBook} />)}
                                        title="Contact Us" />
                                )
                            }
                        </>
                    )
                }
            </List>
        </Box>
    );
}
