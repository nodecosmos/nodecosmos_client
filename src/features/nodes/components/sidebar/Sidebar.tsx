import CrTooltip from './CrTooltip';
import SidebarListItem from './SidebarListItem';
import { NodecosmosTheme } from '../../../../themes/themes.types';
import { HEADER_HEIGHT } from '../../../app/constants';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import {
    faCodeCommit as faCodeCommitSolid,
    faCodePullRequest as faCodePullRequestSolid,
    faUsers as faUsersSolid,
    faMessageBot as faMessageBotSolid,
    faTable as faTableSolid,
    faCircle0,
} from '@fortawesome/pro-duotone-svg-icons';
import {
    faCodeCommit,
    faCodePullRequest,
    faUsers,
    faMessageBot,
    faHashtag,
    faTable,
} from '@fortawesome/pro-light-svg-icons';
import { faHashtag as faHashtagSolid } from '@fortawesome/pro-regular-svg-icons';
import { faSquareLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfoIcon from '@mui/icons-material/Info';
import {
    List, Box, useTheme, Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function Sidebar() {
    const {
        originalId, branchId, nodeId, isBranch, isContributionRequest, branchNodeId, title,
    } = useBranchContext();
    const theme: NodecosmosTheme = useTheme();
    const toOrgId = isContributionRequest ? originalId : branchId;
    const toPath = `${toOrgId}/${nodeId}`;

    return (
        <Box
            component="nav"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            mt={HEADER_HEIGHT}
        >
            <List sx={{
                px: 1,
                pt: isBranch && !isContributionRequest ? 0 : 1,
                mt: '-1px',
            }}>
                {
                    (isBranch && title && !isContributionRequest && branchNodeId) && (
                        <>
                            <Box pb={1} mb={1} mx={-1} borderTop={1} borderBottom={1} borderColor="borders.3">
                                <Tooltip
                                    componentsProps={{ tooltip: { sx: { p: 0 } } }}
                                    PopperProps={{
                                        className: 'TooltipElement',
                                        sx: { p: 0 },
                                    }}
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
                                        color="text.tertiary">
                                        <Box component="span" mr={1}>Contribution Request</Box>
                                        <InfoIcon fontSize="small" />
                                    </Typography>
                                </Tooltip>

                                <SidebarListItem
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
                    to={toPath}
                    icon={(<FontAwesomeIcon icon={faHashtag} />)}
                    selectedIcon={(<FontAwesomeIcon icon={faHashtagSolid} />)}
                    title="Node"
                />
                <SidebarListItem
                    to={`${toPath}/workflow`}
                    flip
                    icon={(<FontAwesomeIcon icon={faCodeCommit} />)}
                    selectedIcon={(<FontAwesomeIcon icon={faCodeCommitSolid} />)}
                    title="Workflow"
                />{
                    (!isBranch || isContributionRequest) && (
                        <>
                            <SidebarListItem
                                to={`${toPath}/contribution_requests`}
                                icon={(<FontAwesomeIcon icon={faCodePullRequest} />)}
                                selectedIcon={(<FontAwesomeIcon icon={faCodePullRequestSolid} />)}
                                title="Contribution Requests"
                                end={false}
                            />
                            <SidebarListItem
                                to={`${toPath}/threads`}
                                icon={(<FontAwesomeIcon icon={faMessageBot} />)}
                                selectedIcon={(<FontAwesomeIcon icon={faMessageBotSolid} />)}
                                title="Threads"
                            >
                                <FontAwesomeIcon
                                    icon={faCircle0}
                                    color={theme.palette.background.labels.green1}
                                    size="2xs" />
                            </SidebarListItem>
                            <SidebarListItem
                                to={`${toPath}/team`}
                                icon={(<FontAwesomeIcon icon={faUsers} />)}
                                selectedIcon={(<FontAwesomeIcon icon={faUsersSolid} />)}
                                title="Team"
                            />
                            <SidebarListItem
                                disabled
                                to={`${toPath}/tasks_board`}
                                icon={(<FontAwesomeIcon icon={faTable} />)}
                                selectedIcon={(<FontAwesomeIcon icon={faTableSolid} />)}
                                title="Tasks Board"
                            />
                        </>
                    )
                }
            </List>
        </Box>
    );
}
