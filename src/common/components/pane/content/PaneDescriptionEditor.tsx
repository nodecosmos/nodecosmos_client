import useDescriptionEdit from '../../../../features/descriptions/hooks/useDescriptionEdit';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import Loader from '../../Loader';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';

const RemirrorEditor = React.lazy(
    () => import('../../editor/RemirrorEditor'),
);

export default function PaneDescriptionEditor() {
    const { loading } = usePaneContext();

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
                    editorOutline={0}
                    editorBackgroundColor="background.5"
                    editorFocusBorderColor="toolbar.default"
                    isRealTime
                />
            </Box>
        </Suspense>
    );
}
