import Loader from '../../../../../common/components/Loader';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useDescriptionMarkdown from '../../../../descriptions/hooks/useDescriptionMarkdown';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';
/* nodecosmos */

const MarkdownEditor = React.lazy(() => import('../../../../../common/components/markdown/MarkdownEditor'));

export default function PaneMarkdownEditor() {
    const { isBranch } = useBranchContext();
    const { loading } = usePaneContext();

    const {
        diffViewEnabled, originalMarkdown, branchMarkdown, fetched,
    } = useDescriptionMarkdown();

    if (loading || !fetched) {
        return <Loader />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <MarkdownEditor
                    diffViewEnabled={diffViewEnabled}
                    commentsEnabled={isBranch}
                    originalValue={originalMarkdown || ''}
                    value={branchMarkdown || ''}
                    editable={false}
                />
            </Box>
        </Suspense>
    );
}
