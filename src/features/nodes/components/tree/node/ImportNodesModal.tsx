import nodecosmos from '../../../../../api/nodecosmos-server';
import CloseModalButton from '../../../../../common/components/modal/CloseModalButton';
import { UUID } from '../../../../../types';
import { setAlert } from '../../../../app/appSlice';
import { faFileUpload } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Dialog, DialogContent, Typography,
} from '@mui/material';
import { Uppy } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';

interface UploadFileModalProps {
    open: boolean;
    onClose: () => void;
    nodeId: UUID;
    branchId: UUID;
}

const DIALOG_PAPER_PROPS = {
    elevation: 8,
    sx: { borderRadius: 2.5 },
};

export default function ImportNodesModal(props: UploadFileModalProps) {
    const {
        open, onClose, nodeId, branchId,
    } = props;

    const dispatch = useDispatch();

    const uppy = useMemo(() => new Uppy({
        restrictions: {
            maxNumberOfFiles: 1,
            maxFileSize: 25 * 1024 * 1024,
        },
    }).use(XHRUpload, { endpoint: '' }), []);

    const handleClose = useCallback(() => {
        uppy.cancelAll();
        onClose();
    }, [onClose, uppy]);

    useEffect(() => {
        uppy.on('upload-success', () => {
            window.location.reload();
        });

        uppy.on('file-added', async () => {
            const xhrUpload = uppy.getPlugin('XHRUpload');

            xhrUpload?.setOptions({
                formData: true,
                method: 'PUT',
                allowedMetaFields: [],
                withCredentials: true,
                endpoint: `${nodecosmos.defaults.baseURL}/nodes/${branchId}/${nodeId}/import_nodes`,
            });

            return uppy.upload().catch((error) => {
                console.error(error);
                dispatch(setAlert({
                    isOpen: true,
                    severity: 'error',
                    message: 'Error uploading file!',
                    duration: 5000,
                }));
            });
        });

        return () => {
            uppy.off('upload-success', () => {});
        };
    }, [dispatch, onClose, branchId, nodeId, uppy]);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleClose}
            PaperProps={DIALOG_PAPER_PROPS}
        >
            <div className="DialogHeader">
                <div>
                    <Typography variant="h5" align="center" color="texts.secondary" width="auto">
                        <FontAwesomeIcon icon={faFileUpload} />
                        Import Nodes
                    </Typography>
                </div>
                <CloseModalButton onClose={handleClose} />
            </div>
            <DialogContent>
                <Dashboard
                    uppy={uppy}
                    autoOpen="metaEditor"
                    theme="dark"
                    showLinkToFileUploadResult={false}
                />
            </DialogContent>
        </Dialog>
    );
}
