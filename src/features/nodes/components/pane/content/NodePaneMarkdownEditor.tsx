import Loader from '../../../../../common/components/Loader';
import { useNodePaneContext } from '../../../hooks/pane/useNodePaneContext';
import useNodeDescriptionMd from '../../../hooks/useNodeDescriptionMd';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';
/* nodecosmos */

const CustomCodeMirror = React.lazy(() => import('../../../../../common/components/codemirror/CodeMirrorEditor'));

export default function NodePaneMarkdownEditor() {
    const { loading } = useNodePaneContext();

    const {
        diffViewEnabled, originalDescriptionMarkdown, branchDescriptionMarkdown,
    } = useNodeDescriptionMd();

    if (loading) {
        return <Loader />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <CustomCodeMirror
                    diffViewEnabled={diffViewEnabled}
                    commentsEnabled={true}
                    currentValue={originalDescriptionMarkdown || ''}
                    value={branchDescriptionMarkdown || ''}
                    editable={false}
                />
            </Box>
        </Suspense>
    );
}
