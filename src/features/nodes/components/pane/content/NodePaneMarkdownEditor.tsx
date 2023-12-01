import Loader from '../../../../../common/components/Loader';
import { selectNodeAttribute, selectSelected } from '../../../nodes.selectors';
import { PKWithTreeBranch } from '../../../nodes.types';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
/* nodecosmos */

const CustomCodeMirror = React.lazy(() => import('../../../../../common/components/codemirror/CodeMirrorEditor'));

export default function NodePaneMarkdownEditor() {
    const { treeBranchId, id } = useSelector(selectSelected) as PKWithTreeBranch;
    const descriptionMarkdown = useSelector(selectNodeAttribute(treeBranchId, id, 'descriptionMarkdown'));

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
