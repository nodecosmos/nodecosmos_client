import { selectNodeByOwner } from '../../../nodes/nodes.selectors';
import { NodeByOwner } from '../../../nodes/nodes.types';
import useProfileUser from '../../hooks/useProfileUser';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button, Chip, Tooltip, Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RootNodes() {
    const user = useProfileUser();
    const nodes = useSelector(selectNodeByOwner(user.id));
    const [originalNodes] = useMemo(() => {
        const originalNodes: NodeByOwner[] = [];
        const branchNodes: NodeByOwner[] = [];

        nodes.forEach(node => {
            if (node.branchId === node.rootId) {
                originalNodes.push(node);
            } else {
                branchNodes.push(node);
            }
        });

        return [originalNodes, branchNodes];
    }, [nodes]);

    return (
        <div>
            <Typography variant="h2" color="text.secondary">
                Root Nodes
                <Chip
                    className="ml-1"
                    component="span"
                    color="button"
                    label={originalNodes.length}
                    size="small"
                />
            </Typography>
            <Typography variant="body1" color="text.secondary" my={2}>
                Root nodes are the top-level nodes in the tree.
            </Typography>
            {
                originalNodes.map((node) => (
                    <Tooltip title="Go to Node" key={node.id}>
                        <Button
                            className="my-1 mx-1"
                            component={Link}
                            to={`/nodes/${node.branchId}/${node.id}`}
                            variant="contained"
                            disableElevation
                            color="button"
                            startIcon={<FontAwesomeIcon icon={faHashtag} />}
                        >
                            {node.title}
                        </Button>
                    </Tooltip>
                ))
            }
        </div>
    );
}
