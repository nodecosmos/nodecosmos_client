import DeleteCoverImageButton from './DeleteCoverImageButton';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../store';
import { usePaneContext } from '../../../app/hooks/pane/usePaneContext';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectCurrentUser } from '../../../users/users.selectors';
import { updateState } from '../../nodes.actions';
import { maybeSelectNode } from '../../nodes.selectors';
import { faCamera } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CardMedia } from '@mui/material';
import React, {
    Suspense, useCallback, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UppyUploadImageModal = React.lazy(() => import('../../../../common/components/upload/UploadImageModal'));

export default function NodePaneCoverImage() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { rootId, objectId } = usePaneContext();
    const {
        isBranch, branchId, nodeId,
    } = useBranchContext();
    const root = useSelector(maybeSelectNode(branchId, nodeId));

    if (!branchId) {
        throw new Error('`branchId` is required in `metadata`');
    }

    const node = useSelector(maybeSelectNode(branchId, objectId));
    const [modalOpen, openModal, closeModal] = useBooleanStateValue();
    const [buttonDisplayed, displayButton, hideButton] = useBooleanStateValue();
    const handleClose = useCallback((responseBody?: { url: string }) => {
        closeModal();

        if (responseBody?.url) {
            dispatch(updateState({
                branchId,
                id: objectId,
                coverImageUrl: responseBody.url,
            }));
        }
    }, [closeModal, branchId, dispatch, objectId]);
    const currentUser = useSelector(selectCurrentUser);

    const isAuthorized = useMemo(() => {
        const isOwner = root?.ownerId === currentUser?.id;
        const isEditor = currentUser && root?.editorIds?.has(currentUser?.id);

        return isOwner || isEditor;
    }, [currentUser, root]);

    const coverOpacity = useMemo(() => ({ opacity: buttonDisplayed ? 0.8 : 0 }), [buttonDisplayed]);

    if (!node) {
        return null;
    }

    const {
        id, isTmp, coverImageUrl,
    } = node;

    return (
        <>
            {coverImageUrl && (
                <>
                    <div className="Cover">
                        <div className="CoverImage" onMouseOver={displayButton} onMouseLeave={hideButton}>
                            {
                                !isBranch && isAuthorized && (
                                    <DeleteCoverImageButton show={buttonDisplayed} />
                                )
                            }
                            <CardMedia
                                className="CoverImageMedia"
                                component="img"
                                image={coverImageUrl}
                                alt="Cover Image"
                            />
                            {
                                !isBranch && isAuthorized && (
                                    <Button
                                        className="CoverImageUploadButton"
                                        color="button"
                                        startIcon={<FontAwesomeIcon icon={faCamera} />}
                                        onClick={openModal}
                                        style={coverOpacity}
                                    >
                                        Edit Cover Image
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </>
            )}

            {!coverImageUrl && !isTmp && !isBranch && isAuthorized && (
                <div className="CoverImageButtonContainer">
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon={faCamera} />}
                        onClick={openModal}
                        color="buttonContrast"
                    >
                            Cover Image
                    </Button>
                </div>
            )}

            {modalOpen && (
                <Suspense>
                    <UppyUploadImageModal
                        open={modalOpen}
                        onClose={handleClose}
                        endpointPath={`nodes/${branchId}/${id}/${rootId}/upload_cover_image`}
                        aspectRatio={850 / 375}
                    />
                </Suspense>
            )}
        </>

    );
}
