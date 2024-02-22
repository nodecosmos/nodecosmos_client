import Loader from '../../../../../common/components/Loader';
import useNodeDescription from '../../../hooks/useNodeDescription';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';
/* nodecosmos */

const CustomCodeMirror = React.lazy(() => import('../../../../../common/components/codemirror/CodeMirrorEditor'));

export default function NodePaneMarkdownEditor() {
    const {
        showDiff, currentDescriptionMarkdown, descriptionMarkdown,
    } = useNodeDescription();

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <CustomCodeMirror
                    showDiff={showDiff}
                    currentValue={currentDescriptionMarkdown || ''}
                    value={descriptionMarkdown || ''}
                    editable={false}
                />
            </Box>
        </Suspense>
    );
}
