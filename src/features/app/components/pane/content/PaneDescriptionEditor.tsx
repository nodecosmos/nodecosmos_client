import Loader from '../../../../../common/components/Loader';
import useDescriptionEdit from '../../../../descriptions/hooks/useDescriptionEdit';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';

const RemirrorEditor = React.lazy(
    () => import('../../../../../common/components/editor/RemirrorEditor'),
);

export default function PaneDescriptionEditor() {
    const {
        rootId,
        loading, 
    } = usePaneContext();

    const {
        objectId,
        objectNodeId,
        branchId,
        handleChange,
        markdown,
        base64,
    } = useDescriptionEdit();

    if (loading) {
        return <Loader />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <Box height={1}>
                <RemirrorEditor
                    markdown={markdown || ''}
                    onChange={handleChange}
                    base64={base64}
                    wsRoomId={objectId}
                    wsAuthNodeId={objectNodeId}
                    wsAuthNodeBranchId={branchId}
                    wsAuthRootId={rootId}
                    editorOutline={0}
                    editorBackgroundColor="background.5"
                    editorFocusBorderColor="toolbar.default"
                    isRealTime
                />
            </Box>
        </Suspense>
    );
}
