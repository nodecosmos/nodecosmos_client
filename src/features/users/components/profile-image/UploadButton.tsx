import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import useUsername from '../../hooks/useUsername';
import { selectCurrentUser, selectUser } from '../../users.selectors';
import { updateUserState } from '../../usersSlice';
import { faCamera } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@mui/material';
import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UppyUploadImageModal = React.lazy(() => import('../../../../common/components/upload/UploadImageModal'));

export default function UploadButton() {
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
                profileImageURL: responseBody.url,
            }));
        }
    }, [closeModal, dispatch, username]);

    if (!user || currentUser?.id !== user.id) return null;

    return (
        <Box
            component="div"
            sx={{ mt: 2 }}
        >
            <Button
                component="label"
                variant="outlined"
                startIcon={<FontAwesomeIcon icon={faCamera} />}
                onClick={openModal}
                color="buttonContrast"
            >
                Upload Profile image
            </Button>

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
        </Box>
    );
}
