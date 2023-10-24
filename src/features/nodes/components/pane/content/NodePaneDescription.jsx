import React from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import DescriptionContainer from '../../../../../common/components/DescriptionContainer';
import { selectSelectedNode, selectSelectedNodeId } from '../../../nodes.selectors';
import NodePaneDescriptionCoverImage from '../../cover/NodePaneDescriptionCoverImage';

export default function NodePaneDescription() {
    const selectedNodeId = useSelector(selectSelectedNodeId);

    const { description } = useSelector(selectSelectedNode);

    if (!selectedNodeId) return null;

    const nodeNotSelectedContent = (
        <Typography color="text.secondary" align="center" fontSize={30}>
      ¯\_(ツ)_/¯
        </Typography>
    );

    const nodeHasNoDescriptionContent = (
        <Typography color="text.secondary">
      This node has no description yet.
        </Typography>
    );

    const blankDescription = (selectedNodeId && nodeHasNoDescriptionContent) || nodeNotSelectedContent;

    return (
        <div>
            <NodePaneDescriptionCoverImage />
            <DescriptionContainer>
                {(description && <Box pb={2} dangerouslySetInnerHTML={{ __html: description }} />) || blankDescription}
            </DescriptionContainer>
        </div>
    );
}
