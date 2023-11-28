import SidebarListItem from './SidebarListItem';
import { UUID } from '../../../../types';
import {
    faChartSimple,
    faCodeCommit,
    faCodePullRequest,
    faGears,
    faUserGroup,
    faHashtag,
    faTable,

    faChartSimple as faChartSimpleSolid,
    faCodeCommit as faCodeCommitSolid,
    faCodePullRequest as faCodePullRequestSolid,
    faGears as faGearsSolid,
    faUserGroup as faUserGroupSolid,
    faHashtag as faHashtagSolid,
    faTable as faTableSolid,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Sidebar() {
    const { rootId, id } = useParams();

    const toPath = rootId ? `${rootId}/${id}` : id as UUID;

    return (
        <Box
            component="nav"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            mt={7}
        >
            <List sx={{ px: 1 }}>
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
                />
                <SidebarListItem
                    to={`${toPath}/contribution_requests`}
                    icon={(<FontAwesomeIcon icon={faCodePullRequest} />)}
                    selectedIcon={(<FontAwesomeIcon icon={faCodePullRequestSolid} />)}
                    title="Contribution Requests"
                    end={false}
                />
                <SidebarListItem
                    to={`${toPath}/topics`}
                    icon={(<FontAwesomeIcon icon={faUserGroup} />)}
                    selectedIcon={(<FontAwesomeIcon icon={faUserGroupSolid} />)}
                    title="Topics"
                />
                <SidebarListItem
                    disabled
                    to={`${toPath}/tasks_board`}
                    icon={(<FontAwesomeIcon icon={faTable} />)}
                    selectedIcon={(<FontAwesomeIcon icon={faTableSolid} />)}
                    title="Tasks Board"
                />
                <SidebarListItem
                    disabled
                    to={`${toPath}/insights`}
                    icon={(<FontAwesomeIcon icon={faChartSimple} />)}
                    selectedIcon={(<FontAwesomeIcon icon={faChartSimpleSolid} />)}
                    title="Insights"
                />
                <SidebarListItem
                    to={`${toPath}/settings`}
                    icon={(<FontAwesomeIcon icon={faGears} />)}
                    selectedIcon={(<FontAwesomeIcon icon={faGearsSolid} />)}
                    title="Settings"
                />
            </List>
        </Box>
    );
}
