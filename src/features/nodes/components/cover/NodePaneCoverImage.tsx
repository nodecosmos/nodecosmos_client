import DeleteCoverImageButton from './DeleteCoverImageButton';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../store';
import { usePaneContext } from '../../../app/hooks/pane/usePaneContext';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { updateState } from '../../nodes.actions';
import { maybeSelectNode } from '../../nodes.selectors';
import { faCamera } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Button, CardMedia,
} from '@mui/material';
import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UppyUploadImageModal = React.lazy(() => import('../../../../common/components/upload/UploadImageModal'));

export default function NodePaneCoverImage() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { rootId, objectId } = usePaneContext();
    const { isBranch, branchId } = useBranchContext();

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
                    <Box
                        sx={{
                            height: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            mx: -4,
                            '.CoverImage': {
                                my: 3,
                                px: 2,
                                position: 'relative',
                                '.CoverImageMedia': {
                                    borderRadius: 2,
                                    maxWidth: '100%',
                                    width: 850,
                                    maxHeight: 375,
                                },
                            },
                        }}
                    >
                        <CardMedia
                            className="AmbientImage"
                            component="img"
                            image={coverImageUrl}
                            alt="Cover Image Ambient"
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: 375,
                                filter: 'blur(50px) opacity(0.4)',
                                borderBottom: 1,
                            }}
                        />
                        <Box
                            className="CoverImage"
                            onMouseOver={displayButton}
                            onMouseLeave={hideButton}
                        >
                            <DeleteCoverImageButton show={buttonDisplayed} />
                            <CardMedia
                                className="CoverImageMedia"
                                component="img"
                                image={coverImageUrl}
                                alt="Cover Image"
                            />
                            {
                                !isBranch && (
                                    <Button
                                        component="label"
                                        variant="contained"
                                        startIcon={<FontAwesomeIcon icon={faCamera} />}
                                        onClick={openModal}
                                        sx={{
                                            opacity: buttonDisplayed ? 0.8 : 0,
                                            transition: 'opacity 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                                            position: 'absolute',
                                            backgroundColor: 'background.1',
                                            color: 'text.primary',
                                            bottom: 8,
                                            right: 24,
                                            '&:hover': { backgroundColor: 'background.1' },
                                        }}
                                    >
                                        Upload cover image
                                    </Button>
                                )
                            }
                        </Box>
                    </Box>
                </>
            )}

            {!coverImageUrl && !isTmp && !isBranch && (
                <Box
                    component="div"
                    sx={{
                        mt: 0,
                        mb: -5,
                        width: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        p: 4,
                    }}
                >
                    <Box width={850}>
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<FontAwesomeIcon icon={faCamera} />}
                            onClick={openModal}
                            color="buttonContrast"
                        >
                            Cover Image
                        </Button>
                    </Box>
                </Box>
            )}

            {modalOpen && (
                <Suspense>
                    <UppyUploadImageModal
                        open={modalOpen}
                        onClose={handleClose}
                        endpointPath={`nodes/${branchId}/${id}/${rootId}/upload_cover_image`}
                    />
                </Suspense>
            )}
        </>

    );
}
