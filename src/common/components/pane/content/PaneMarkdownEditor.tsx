import useDescriptionMarkdown from '../../../../features/descriptions/hooks/useDescriptionMarkdown';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import Loader from '../../Loader';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';
/* nodecosmos */

const CodeMirrorEditor = React.lazy(() => import('../../../../common/components/codemirror/CodeMirrorEditor'));

export default function PaneMarkdownEditor() {
    const { loading } = usePaneContext();

    const {
        diffViewEnabled, originalMarkdown, branchMarkdown,
    } = useDescriptionMarkdown();

    if (loading) {
        return <Loader />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <CodeMirrorEditor
                    diffViewEnabled={diffViewEnabled}
                    commentsEnabled={true}
                    originalValue={originalMarkdown || ''}
                    value={branchMarkdown || ''}
                    editable={false}
                />
            </Box>
        </Suspense>
    );
}
