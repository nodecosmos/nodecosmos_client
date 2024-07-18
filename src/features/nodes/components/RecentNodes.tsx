import SidebarListItem from './sidebar/SidebarListItem';
import { selectRecentNodes } from '../nodes.selectors';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function RecentNodes() {
    const recentNodes = useSelector(selectRecentNodes);

    return (
        <div className="my-4 overflow-auto h-100 p-1">
            <Typography variant="subtitle1" color="text.tertiary" className="mb-1 mx-1">
                    RECENT
            </Typography>
            <List>
                {
                    recentNodes.map((node) => (
                        <SidebarListItem
                            className="p-1-2 fs-18"
                            iconClassName="mr-1"
                            key={node.id}
                            to={`/nodes/${node.branchId}/${node.id}`}
                            icon={<FontAwesomeIcon className="fs-16 mr-0" icon={faHashtag} />}
                            title={node.title}
                        />
                    ))
                }
            </List>
        </div>
    );
}
