import { selectDescription } from '../../../../features/descriptions/descriptions.selectors';
import useDescription from '../../../../features/descriptions/hooks/useDescription';
import NodePaneCoverImage from '../../../../features/nodes/components/cover/NodePaneCoverImage';
import { ObjectType } from '../../../../types';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function PaneDescription() {
    const {
        objectId,
        branchId,
        objectType,
    } = usePaneContext();
    useDescription();
    const description = useSelector(selectDescription(branchId, objectId));

    return (
        <Box px={4}>
            {objectType === ObjectType.Node && <NodePaneCoverImage />}

            <Box display="flex" justifyContent="center">
                <Box
                    mt={2}
                    maxWidth={850}
                    className="DescriptionHTML"
                    dangerouslySetInnerHTML={{ __html: description?.html as TrustedHTML }} />
            </Box>
        </Box>
    );
}
