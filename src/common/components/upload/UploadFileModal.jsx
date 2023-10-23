import React, { useEffect } from 'react';
import { Uppy } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import XHRUpload from '@uppy/xhr-upload';
import { useDispatch } from 'react-redux';
import nodecosmos from '../../../apis/nodecosmos-server';
import { setAlert } from '../../../features/app/appSlice';
import CloseModalButton from '../modal/CloseModalButton';
import UploadDashboardContainer from './UploadDashboardContainer';

const uppy = new Uppy({
    restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 25 * 1024 * 1024,
    },
    locale: {
        strings: {
            dropPasteFiles: 'Drop files here, paste or %{browse}',
        },
    },
});
uppy.use(XHRUpload, {
    formData: true,
    method: 'PUT',
    allowedMetaFields: [],
    metaFields: null,
    withCredentials: true,
});

export default function UploadFileModal({
    open, onClose, params,
}) {
    const dispatch = useDispatch();

    useEffect(() => {
        uppy.on('upload-success', (file) => {
            const postAttachmentParams = {
                ...params,
                key: file.name,
            };

            nodecosmos.post('/attachments', postAttachmentParams)
                .then((res) => {
                    uppy.cancelAll();
                    onClose({
                        url: res.data.url,
                        key: res.data.key,
                    });
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(setAlert({
                        isOpen: true, severity: 'error', message: 'Error creating attachment', duration: 5000,
                    }));
                });
        });

        uppy.on('file-added', (file) => {
            const presignedParams = {
                ...params,
                filename: file.name,
            };
            nodecosmos.get('/attachments/presigned_url', { params: presignedParams }).then((res) => {
                const { url } = res.data;
                const xhrUpload = uppy.getPlugin('XHRUpload');

                xhrUpload.setOptions({
                    endpoint: url,
                });

                uppy.upload();
            }).catch((error) => {
                console.error(error);
                dispatch(setAlert({
                    isOpen: true, severity: 'error', message: 'Error uploading attachment!', duration: 5000,
                }));
            });
        });

        return () => {
            uppy.off('upload-success');
        };
    }, [dispatch, onClose, params]);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={() => {
                uppy.cancelAll();
                onClose();
            }}
            PaperProps={{
                elevation: 8,
            }}
        >
            <DialogTitle>
        Upload Cover Image
                <CloseModalButton onClose={() => {
                    uppy.cancelAll();
                    onClose();
                }}
                />
            </DialogTitle>
            <DialogContent>
                <UploadDashboardContainer>
                    <Dashboard
                        uppy={uppy}
                        autoOpenFileEditor
                        theme="dark"
                        plugins={['ImageEditor']}
                        showLinkToFileUploadResult={false}
                    />
                </UploadDashboardContainer>
            </DialogContent>
        </Dialog>
    );
}

UploadFileModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    params: PropTypes.shape({
        nodeId: PropTypes.string.isRequired,
        objectId: PropTypes.string.isRequired,
    }).isRequired,
};
