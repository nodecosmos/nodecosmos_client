import { ObjectType } from '../../../../../types';
import { selectDescription } from '../../../../descriptions/descriptions.selectors';
import useDescription from '../../../../descriptions/hooks/useDescription';
import NodePaneCoverImage from '../../../../nodes/components/cover/NodePaneCoverImage';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function PaneDescription() {
    const {
        mainObjectId: objectId,
        branchId,
        objectType,
    } = usePaneContext();
    useDescription();
    const description = useSelector(selectDescription(branchId, objectId));
    const innerHTML = useMemo(() => ({ __html: description?.html as TrustedHTML }), [description]);

    return (
        <Box px={4}>
            {objectType === ObjectType.Node && <NodePaneCoverImage />}

            <Box display="flex" justifyContent="center" mt={4}>
                <div className="DescriptionHTML size-850 fs-18" dangerouslySetInnerHTML={innerHTML} />
            </Box>
        </Box>
    );
}
