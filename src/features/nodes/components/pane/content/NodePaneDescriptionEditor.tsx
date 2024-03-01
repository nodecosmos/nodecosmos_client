import Loader from '../../../../../common/components/Loader';
import { useNodePaneContext } from '../../../hooks/pane/useNodePaneContext';
import useNodeDescription from '../../../hooks/useNodeDescriptionEdit';
import { selectSelected } from '../../../nodes.selectors';
import { PKWithTreeBranch } from '../../../nodes.types';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

const RemirrorEditor = React.lazy(
    () => import('../../../../../common/components/editor/RemirrorEditor'),
);

export default function NodePaneDescriptionEditor() {
    const { branchId, id } = useSelector(selectSelected) as PKWithTreeBranch;
    const { loading } = useNodePaneContext();

    const {
        handleChange,
        descriptionMarkdown,
        descriptionBase64,
    } = useNodeDescription();

    if (loading) {
        return <Loader />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <RemirrorEditor
                    markdown={descriptionMarkdown || ''}
                    onChange={handleChange}
                    wsRoomId={id}
                    wsAuthNodeId={id}
                    wsAuthNodeBranchId={branchId}
                    base64={descriptionBase64}
                    editorFocusColor="borders.4"
                    isRealTime
                />
            </Box>
        </Suspense>
    );
}
