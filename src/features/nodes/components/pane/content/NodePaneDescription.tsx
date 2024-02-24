import { useNodePaneContext } from '../../../hooks/pane/useNodePaneContext';
import useNodeDescription from '../../../hooks/useNodeDescription';
import NodePaneCoverImage from '../../cover/NodePaneCoverImage';
import { Box } from '@mui/material';
import React from 'react';

export default function NodePaneDescription() {
    const { description } = useNodePaneContext();

    useNodeDescription();

    return (
        <Box px={4}>
            <NodePaneCoverImage />
            <Box display="flex" justifyContent="center">
                <Box
                    mt={2}
                    maxWidth={850}
                    className="DescriptionHTML"
                    dangerouslySetInnerHTML={{ __html: description as TrustedHTML }} />
            </Box>
        </Box>
    );
}
