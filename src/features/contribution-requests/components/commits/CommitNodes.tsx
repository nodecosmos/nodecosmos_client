import CommitNode from './CommitNode';
import { UUID } from '../../../../types';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectNodesByIds } from '../../../nodes/nodes.selectors';
import {
    Box, Chip, Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface Props {
    title: string;
    ids: Set<UUID> | null;
}

export default function CommitNodes(props: Props) {
    const { title, ids } = props;
    const { branchId } = useBranchContext();
    const nodes = useSelector(selectNodesByIds(branchId, ids || new Set()));
    const orderedNodes = useMemo(() => {
        // order by created date
        return Array.from(nodes).sort((a, b) => {
            return (a.ancestorIds?.length || 0) - (b.ancestorIds?.length || 0);
        });
    }, [nodes]);

    if (!ids || !ids.size) {
        return null;
    }

    return (
        <Box p={4} borderBottom={1} borderColor="borders.3">
            <Typography fontWeight="bold" color="text.secondary">
                {title}
                <Chip
                    component="span"
                    color="button"
                    label={orderedNodes.length}
                    size="small" />
            </Typography>
            <Box>
                {
                    orderedNodes.map((node) => (
                        <CommitNode node={node} key={node.id} />
                    ))
                }
            </Box>
        </Box>
    );
}
