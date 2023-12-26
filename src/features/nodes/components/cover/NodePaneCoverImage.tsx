import DeleteCoverImageButton from './DeleteCoverImageButton';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../store';
import { updateState } from '../../actions';
import { selectSelected, selectSelectedNode } from '../../nodes.selectors';
import { AppNode, PKWithTreeBranch } from '../../nodes.types';
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
    const { treeBranchId, branchId } = useSelector(selectSelected) as PKWithTreeBranch;
    const {
        id, isTmp, coverImageURL,
    } = useSelector(selectSelectedNode) as AppNode;

    const [modalOpen, openModal, closeModal] = useBooleanStateValue();

    const [buttonDisplayed, displayButton, hideButton] = useBooleanStateValue();

    const handleClose = useCallback((responseBody?: { coverImageURL: string }) => {
        closeModal();

        if (responseBody?.coverImageURL) {
            dispatch(updateState({
                treeBranchId,
                id,
                coverImageURL: responseBody.coverImageURL,
            }));
        }
    }, [closeModal, treeBranchId, dispatch, id]);

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                {coverImageURL && (
                    <Box
                        sx={{
                            width: 1,
                            height: 475,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 4,
                            '.CoverImage': {
                                position: 'relative',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                '.CoverImageMedia': {
                                    borderRadius: 4,
                                    maxWidth: '100%',
                                    width: 850,
                                    maxHeight: 375,
                                },
                            },
                        }}
                    >
                        <Box
                            className="CoverImage"
                            onMouseOver={displayButton}
                            onMouseLeave={hideButton}
                        >
                            <DeleteCoverImageButton show={buttonDisplayed} />
                            <CardMedia
                                className="CoverImageMedia"
                                component="img"
                                image={coverImageURL}
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
                )}

            </Box>
            {!coverImageURL && !isTmp && (
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
