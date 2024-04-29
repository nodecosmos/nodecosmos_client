import UploadDashboardContainer from './UploadDashboardContainer';
import nodecosmos from '../../../api/nodecosmos-server';
import { setAlert } from '../../../features/app/appSlice';
import { UUID } from '../../../types';
import CloseModalButton from '../modal/CloseModalButton';
import {
    Dialog, DialogContent, DialogTitle,
} from '@mui/material';
import { Uppy } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import { useDispatch } from 'react-redux';

interface UploadFileModalProps {
    open: boolean;
    onClose: (attachment?: { url: string; filename: string }) => void;
    params: { nodeId: UUID; objectId: UUID; rootId: UUID };
}

interface ResponseData {
    url: string;
    key: string;
}

interface S3Response {
    responseURL: string;
}

export default function UploadFileModal(props: UploadFileModalProps) {
    const {
        open, onClose, params,
    } = props;

    const dispatch = useDispatch();

    const uppy = useMemo(() => new Uppy({
        restrictions: {
            maxNumberOfFiles: 1,
            maxFileSize: 25 * 1024 * 1024,
        },
        locale: { strings: { dropPasteFiles: 'Drop files here, paste or %{browse}' } },
    }).use(XHRUpload, {
        endpoint: '',
        getResponseData: (_responseText: string, res: unknown): ResponseData => {
            const response = res as S3Response;
            const url = new URL(response.responseURL);

            return {
                url: url.origin + url.pathname,
                key: url.pathname.substring(1),
            };
        },
    }), []);

    const handleClose = useCallback(() => {
        uppy.cancelAll();
        onClose();
    }, [onClose, uppy]);

    useEffect(() => {
        uppy.on('upload-success', (file, response) => {
            const postAttachmentParams = {
                ...params,
                url: response.body.url,
                key: response.body.key,
            };

            nodecosmos.post('/attachments', postAttachmentParams)
                .then((res) => {
                    uppy.cancelAll();

                    onClose({
                        url: res.data.url,
                        filename: file?.name || 'file',
                    });
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(setAlert({
                        isOpen: true,
                        severity: 'error',
                        message: 'Error creating attachment',
                        duration: 5000,
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

                xhrUpload?.setOptions({
                    formData: true,
                    method: 'PUT',
                    allowedMetaFields: [],
                    withCredentials: true,
                    endpoint: url,
                });

                return uppy.upload();
            }).catch((error) => {
                console.error(error);
                dispatch(setAlert({
                    isOpen: true,
                    severity: 'error',
                    message: 'Error uploading attachment!',
                    duration: 5000,
                }));
            });
        });

        return () => {
            uppy.off('upload-success', () => {});
        };
    }, [dispatch, onClose, params, uppy]);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleClose}
            PaperProps={{ elevation: 8 }}
        >
            <DialogTitle>
                Upload File
                <CloseModalButton onClose={handleClose} />
            </DialogTitle>
            <DialogContent>
                <UploadDashboardContainer>
                    <Dashboard
                        uppy={uppy}
                        autoOpen="metaEditor"
                        theme="dark"
                        plugins={['ImageEditor']}
                        showLinkToFileUploadResult={false}
                    />
                </UploadDashboardContainer>
            </DialogContent>
        </Dialog>
    );
}
