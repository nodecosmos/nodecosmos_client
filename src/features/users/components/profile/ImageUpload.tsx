import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import useUsername from '../../hooks/useUsername';
import { selectCurrentUser, selectUser } from '../../users.selectors';
import { updateUserState } from '../../usersSlice';
import { faCamera } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, IconButton } from '@mui/material';
import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UppyUploadImageModal = React.lazy(() => import('../../../../common/components/upload/UploadImageModal'));

interface UploadButtonProps {
    onModalClose: () => void;
    hovered: boolean;
}
export default function ImageUpload(props: UploadButtonProps) {
    const { onModalClose, hovered } = props;
    const username = useUsername();
    const user = useSelector(selectUser(username));
    const currentUser = useSelector(selectCurrentUser);
    const [modalOpen, openModal, closeModal] = useBooleanStateValue();
    const dispatch = useDispatch();

    const handleClose = useCallback((responseBody?: { url: string }) => {
        closeModal();

        if (responseBody?.url) {
            dispatch(updateUserState({
                username,
                profileImageUrl: responseBody.url,
            }));
        }

        onModalClose();
    }, [closeModal, dispatch, onModalClose, username]);

    if (!user || currentUser?.id !== user.id) return null;

    return (
        <>
            {
                hovered && (
                    <Box
                        component="div"
                        position="absolute"
                        width={1}
                        height={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        zIndex={1}
                        bgcolor="background.2"
                        sx={{
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            '&:hover': { opacity: 0.8 },
                        }}
                    >
                        <IconButton
                            color="secondary"
                            sx={{
                                height: 1,
                                width: 1,
                                cursor: 'pointer',
                            }}
                            onClick={openModal}>
                            <FontAwesomeIcon size="2xl" icon={faCamera} />
                        </IconButton>
                    </Box>
                )
            }
            {modalOpen && (
                <Suspense>
                    <UppyUploadImageModal
                        open={modalOpen}
                        onClose={handleClose}
                        endpointPath={`users/${user.id}/update_profile_image`}
                        aspectRatio={1}
                    />
                </Suspense>
            )}
        </>
    );
}
