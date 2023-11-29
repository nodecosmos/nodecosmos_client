import DescriptionContainer from '../../../../../common/components/DescriptionContainer';
import { selectSelected, selectSelectedNode } from '../../../nodes.selectors';
import NodePaneCoverImage from '../../cover/NodePaneCoverImage';
import { Typography, Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function NodePaneDescription() {
    const selectedNodePk = useSelector(selectSelected);
    const { description } = useSelector(selectSelectedNode);

    if (!selectedNodePk) return null;

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

    const blankDescription = (selectedNodePk && nodeHasNoDescriptionContent) || nodeNotSelectedContent;

    return (
        <div>
            <NodePaneCoverImage />
            <DescriptionContainer>
                {(description && <Box pb={2} dangerouslySetInnerHTML={{ __html: description }} />) || blankDescription}
            </DescriptionContainer>
        </div>
    );
}
