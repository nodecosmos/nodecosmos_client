import { ContentType } from '../../../../../common/components/editor/Editor';
import LazyLoadComponent from '../../../../../common/components/LazyLoadComponent';
import Loader from '../../../../../common/components/Loader';
import SimpleAlert from '../../../../../common/components/SimpleAlert';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useDescriptionEdit from '../../../../descriptions/hooks/useDescriptionEdit';
import { useIsAuthorized } from '../../../../nodes/hooks/node/useAuthorizeNodeAction';
import { selectCurrentUser } from '../../../../users/users.selectors';
import { usePaneContext } from '../../../hooks/pane/usePaneContext';
import { Box } from '@mui/material';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

const Editor = React.lazy(
    () => import('../../../../../common/components/editor/Editor'),
);

export default function PaneDescriptionEditor() {
    const { isMerged } = useBranchContext();
    const {
        rootId,
        loading,
    } = usePaneContext();
    const {
        currentHTML,
        objectId,
        objectNodeId,
        branchId,
        handleChange,
        base64,
    } = useDescriptionEdit();
    const isAuthorized = useIsAuthorized();
    const currentUser = useSelector(selectCurrentUser);

    if (isMerged) {
        return (
            <Box m={2}>
                <SimpleAlert severity="warning" message="This node has been merged and cannot be edited." />
            </Box>
        );
    }

    if (!isAuthorized) {
        let message = 'You do not have permission to edit this node.';

        if (currentUser) {
            message += ' If you wish to suggest changes, please submit a Contribution Request.';
        } else {
            message += ' Please log in to edit this node.';
        }

        return (
            <Box m={2}>
                <SimpleAlert
                    severity="warning"
                    message={message}
                />
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
                    <Editor
                        content={base64 || ''}
                        currentHTML={currentHTML}
                        contentType={ContentType.Base64YDoc}
                        onChange={handleChange}
                        wsRoomId={objectId}
                        wsAuthNodeId={objectNodeId}
                        wsAuthNodeBranchId={branchId}
                        wsAuthRootId={rootId}
                        editorOutline={0}
                        editorBackgroundColor="backgrounds.5"
                        editorFocusBorderColor="toolbar.default"
                        editorClassName="fs-18"
                        fileObjectId={objectId}
                        placeholder="Enter a description"
                        showBorder={false}
                        isRealTime
                    />
                </Box>
            </Suspense>
        </LazyLoadComponent>
    );
}
