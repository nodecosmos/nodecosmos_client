import DeleteCoverImageButton from './DeleteCoverImageButton';
import { usePaneContext } from '../../../../common/hooks/pane/usePaneContext';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../store';
import { updateState } from '../../actions';
import { selectNode } from '../../nodes.selectors';
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
    const {
        objectId,
        branchId,
        metadata,
    } = usePaneContext();

    const currentBranchId = metadata?.currentBranchId;

    if (!currentBranchId) {
        throw new Error('`currentBranchId` is required in `metadata`');
    }

    const {
        id, isTmp, coverImageUrl,
    } = useSelector(selectNode(currentBranchId, objectId));
    const [modalOpen, openModal, closeModal] = useBooleanStateValue();
    const [buttonDisplayed, displayButton, hideButton] = useBooleanStateValue();
    const handleClose = useCallback((responseBody?: { url: string }) => {
        closeModal();

        if (responseBody?.url) {
            dispatch(updateState({
                currentBranchId,
                id,
                coverImageUrl: responseBody.url,
            }));
        }
    }, [closeModal, currentBranchId, dispatch, id]);

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
                            my: -1,
                            '.CoverImage': {
                                mt: 3,
                                px: 2,
                                position: 'relative',
                                '.CoverImageMedia': {
                                    borderRadius: 0.75,
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
                                height: 415,
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
                                    bottom: 16,
                                    right: 16,
                                    '&:hover': { backgroundColor: 'background.1' },
                                }}
                            >
                               Upload cover image
                            </Button>
                        </Box>
                    </Box>
                </>
            )}

            {!coverImageUrl && !isTmp && (
                <Box
                    component="div"
                    sx={{
                        w: 1,
                        mt: 0,
                        mb: -5,
                        display: 'flex',
                        justifyContent: 'center',
                        p: 4,
                    }}
                >
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon={faCamera} />}
                        onClick={openModal}
                        color="buttonContrast"
                    >
                        Upload cover image
                    </Button>
                </Box>
            )}

            {modalOpen && (
                <Suspense>
                    <UppyUploadImageModal
                        open={modalOpen}
                        onClose={handleClose}
                        endpointPath={`nodes/${id}/${branchId}/upload_cover_image`}
                    />
                </Suspense>
            )}
        </>

    );
}
