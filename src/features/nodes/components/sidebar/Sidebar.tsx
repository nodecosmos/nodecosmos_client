import SidebarListItem from './SidebarListItem';
import { NodecosmosTheme } from '../../../../themes/themes.types';
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
import {
    List, Box, useTheme,
} from '@mui/material';
import React from 'react';

export default function Sidebar() {
    const {
        originalId, branchId, nodeId, isBranch, isContributionRequest, branchNodeId,
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
            mt={7}
        >
            <List sx={{ px: 1 }}>
                {
                    (isBranch && !isContributionRequest && branchNodeId) && (
                        <SidebarListItem
                            to={`${originalId}/${branchNodeId}/contribution_requests/${branchId}`}
                            icon={(<FontAwesomeIcon icon={faSquareLeft} />)}
                            selectedIcon={(<FontAwesomeIcon icon={faCodeCommitSolid} />)}
                            title="Contribution Request"
                            color="toolbar.orange"
                        />
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
                                to={`${toPath}/topics`}
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
