import nodecosmos from '../../../api/nodecosmos-server';
import CloseModalButton from '../modal/CloseModalButton';
import { faImage } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DialogContent, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Uppy } from '@uppy/core';
import ImageEditor from '@uppy/image-editor';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

interface UploadResponse {
    url: string;
}

function isUploadResponse(response: any): response is UploadResponse {
    return response && typeof response.url === 'string';
}

interface UploadImageModalProps {
    open: boolean;
    onClose: (responseBody?: UploadResponse) => void;
    endpointPath: string; // no leading slash
    aspectRatio?: number;
}
const PLUGINS = ['ImageEditor'];

const DIALOG_PAPER_PROPS = {
    elevation: 8,
    sx: { borderRadius: 2.5 },
};

export default function UploadImageModal(props: UploadImageModalProps) {
    const {
        open, onClose, endpointPath, aspectRatio,
    } = props;
    const uri = nodecosmos.getUri();

    const uppy = useMemo(() => {
        return new Uppy({
            restrictions: {
                maxNumberOfFiles: 1,
                maxFileSize: 5 * 1024 * 1024,
                allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            },
        }).use(ImageEditor, {
            id: 'ImageEditor',
            quality: 0.8,
            cropperOptions: {
                croppedCanvasOptions: {},
                viewMode: 0,
                aspectRatio,
                rotatable: false,
            },
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
        }).use(XHRUpload, {
            formData: true,
            method: 'POST',
            allowedMetaFields: [],
            withCredentials: true,
            endpoint: `${uri}/${endpointPath}`,
        });
    }, [aspectRatio, endpointPath, uri]);

    useEffect(() => {
        uppy.on('upload-success', (_, response) => {
            uppy.cancelAll();

            if (isUploadResponse(response.body)) {
                onClose(response.body);
            } else {
                throw new Error('Invalid response body');
            }
        });

        uppy.on('file-editor:complete', () => {
            uppy.upload().catch((error) => {
                console.error('Upload error:', error);
            });
        });

        return () => {
            uppy.off('upload-success', () => {});
        };
    }, [onClose, uppy]);

    const onModalClose = useCallback(() => {
        uppy.cancelAll();
        onClose();
    }, [onClose, uppy]);

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
            PaperProps={DIALOG_PAPER_PROPS}
        >
            <div className="DialogHeader">
                <div>
                    <Typography variant="h5" align="center" color="texts.secondary" width="auto">
                        <FontAwesomeIcon icon={faImage} />
                        Upload Image
                    </Typography>
                </div>
                <CloseModalButton onClose={onClose} />
            </div>
            <DialogContent>
                <Dashboard
                    uppy={uppy}
                    autoOpen="imageEditor"
                    theme="dark"
                    plugins={PLUGINS}
                    showLinkToFileUploadResult={false}
                />
            </DialogContent>
        </Dialog>
    );
}
