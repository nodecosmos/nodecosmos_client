import Loader from '../../../../../common/components/Loader';
import {
    selectNodeAttribute,
    selectSelectedNodeId,
} from '../../../nodes.selectors';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
/* nodecosmos */

const CustomCodeMirror = React.lazy(() => import('../../../../../common/components/codemirror/CodeMirrorEditor'));

export default function NodePaneMarkdownEditor() {
    const id = useSelector(selectSelectedNodeId);

    const descriptionMarkdown = useSelector(selectNodeAttribute(id, 'descriptionMarkdown'));

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <CustomCodeMirror
                    value={descriptionMarkdown || ''}
                    editable={false}
                />
            </Box>
        </Suspense>
    );
}
