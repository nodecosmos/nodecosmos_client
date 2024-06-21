import LazyLoadComponent from '../../../../../common/components/LazyLoadComponent';
import Loader from '../../../../../common/components/Loader';
import SimpleAlert from '../../../../../common/components/SimpleAlert';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useDescriptionEdit from '../../../../descriptions/hooks/useDescriptionEdit';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';

const RemirrorEditor = React.lazy(
    () => import('../../../../../common/components/editor/RemirrorEditor'),
);

export default function PaneDescriptionEditor() {
    const { isMerged } = useBranchContext();
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

    if (isMerged) {
        return (
            <Box m={2}>
                <SimpleAlert severity="warning" message="This node has been merged and cannot be edited." />
            </Box>
        );
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <LazyLoadComponent>
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
        </LazyLoadComponent>
    );
}
