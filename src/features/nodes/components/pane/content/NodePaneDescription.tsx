import { selectSelected, selectSelectedNode } from '../../../nodes.selectors';
import NodePaneCoverImage from '../../cover/NodePaneCoverImage';
import { Typography, Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function NodePaneDescription() {
    const selectedNodePk = useSelector(selectSelected);
    const { description } = useSelector(selectSelectedNode);

    if (!selectedNodePk) return null;

    const blankDescription = (
        <Typography color="text.secondary">
            This node has no description yet.
        </Typography>
    );

    return (
        <Box px={4}>
            <NodePaneCoverImage />
            {
                description
                    ? (
                        <Box display="flex" justifyContent="center">
                            <Box
                                mt={2}
                                maxWidth={850}
                                className="DescriptionHTML"
                                dangerouslySetInnerHTML={{ __html: description }} />
                        </Box>
                    )
                    : blankDescription
            }
        </Box>
    );
}
