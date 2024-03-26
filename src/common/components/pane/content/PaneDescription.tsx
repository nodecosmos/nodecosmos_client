import { selectDescription } from '../../../../features/descriptions/descriptions.selectors';
import useDescription from '../../../../features/descriptions/hooks/useDescription';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function PaneDescription() {
    const {
        objectId,
        branchId,
    } = usePaneContext();
    useDescription();
    const description = useSelector(selectDescription(branchId, objectId));

    return (
        <Box px={4}>
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
