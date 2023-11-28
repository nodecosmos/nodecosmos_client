import Loader from '../../../../../common/components/Loader';
import { selectNodeAttribute, selectSelectedNode } from '../../../nodes.selectors';
import { NodePrimaryKey } from '../../../nodes.types';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
/* nodecosmos */

const CustomCodeMirror = React.lazy(() => import('../../../../../common/components/codemirror/CodeMirrorEditor'));

export default function NodePaneMarkdownEditor() {
    const { branchId, id } = useSelector(selectSelectedNode) as NodePrimaryKey;

    const descriptionMarkdown = useSelector(selectNodeAttribute(branchId, id, 'descriptionMarkdown'));

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
