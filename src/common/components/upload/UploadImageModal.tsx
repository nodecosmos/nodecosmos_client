import UploadDashboardContainer from './UploadDashboardContainer';
import nodecosmos from '../../../apis/nodecosmos-server';
import CloseModalButton from '../modal/CloseModalButton';
import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Uppy } from '@uppy/core';
import ImageEditor from '@uppy/image-editor';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import React, { useCallback, useEffect } from 'react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

const uppy = new Uppy({
    restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 5 * 1024 * 1024,
        allowedFileTypes: ['image/jpeg', 'image/png'],
    },
    locale: {
        strings: {
            dropPasteFiles: 'Drop files here, paste or %{browse}',
        },
    },
}).use(ImageEditor, {
    id: 'ImageEditor',
    quality: 0.8,
    actions: {
        revert: true,
        rotate: false,
        granularRotate: false,
        flip: false,
        zoomIn: true,
        zoomOut: true,
        cropSquare: false,
        cropWidescreen: false,
        cropWidescreenVertical: false,
    },
});
uppy.use(XHRUpload, {
    formData: true,
    method: 'POST',
    allowedMetaFields: [],
    withCredentials: true,
    endpoint: '',
});

interface UploadImageModalProps {
    open: boolean;
    onClose: (responseBody?: { coverImageURL: string }) => void;
    endpointPath: string; // no leading slash
    aspectRatio?: number;
}

export default function UploadImageModal(props: UploadImageModalProps) {
    const {
        open, onClose, endpointPath, aspectRatio = 850 / 375,
    } = props;

    const uri = nodecosmos.getUri();

    useEffect(() => {
        const xhrUpload = uppy.getPlugin('XHRUpload');
        if (xhrUpload) {
            xhrUpload.setOptions({
                endpoint: `${uri}${endpointPath}`,
            });
        }
    }, [endpointPath, uri]);

    useEffect(() => {
        const imageEditor = uppy.getPlugin('ImageEditor');
        if (imageEditor) {
            imageEditor.setOptions({
                cropperOptions: {
                    viewMode: 3,
                    aspectRatio,
                    rotatable: false,
                },
            });
        }
    }, [aspectRatio]);

    useEffect(() => {
        uppy.on('upload-success', (_, response) => {
            uppy.cancelAll();
            onClose(response.body);
        });

        uppy.on('file-editor:complete', () => {
            uppy.upload();
        });

        return () => {
            uppy.off('upload-success', () => {});
        };
    }, [onClose]);

    const onModalClose = useCallback(() => {
        uppy.cancelAll();
        onClose();
    }, [onClose]);

    // https://github.com/transloadit/uppy/issues/4045
    // until this issue is fixed, we need to manually remove the file from uppy on cancel
    uppy.on('file-editor:start', (file) => {
        const selector = '#uppy-DashboardContent-panel--editor >'
      + ' div.uppy-DashboardContent-bar > button.uppy-DashboardContent-back';

        new Promise((resolve) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                return;
            }

            const observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        }).then(() => {
            document.querySelector(selector)?.addEventListener('click', () => {
                uppy.removeFile(file.id);
            });
        });
    });

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={onModalClose}
            PaperProps={{
                elevation: 8,
            }}
        >
            <DialogTitle>
                Upload  Image
                <CloseModalButton onClose={onModalClose} />
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
