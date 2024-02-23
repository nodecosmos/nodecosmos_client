import Loader from '../../../../../common/components/Loader';
import useNodeDescriptionMd from '../../../hooks/useNodeDescriptionMd';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';
/* nodecosmos */

const CustomCodeMirror = React.lazy(() => import('../../../../../common/components/codemirror/CodeMirrorEditor'));

export default function NodePaneMarkdownEditor() {
    const {
        showDiff, originalDescriptionMarkdown, branchDescriptionMarkdown,
    } = useNodeDescriptionMd();

    console.log('originalDescriptionMarkdown', originalDescriptionMarkdown);
    console.log('branchDescriptionMarkdown', branchDescriptionMarkdown);

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <CustomCodeMirror
                    showDiff={showDiff}
                    currentValue={originalDescriptionMarkdown || ''}
                    value={branchDescriptionMarkdown || ''}
                    editable={false}
                />
            </Box>
        </Suspense>
    );
}
