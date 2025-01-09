import nodecosmos from '../../../../../api/nodecosmos-server';
import Alert from '../../../../../common/components/Alert';
import CloseModalButton from '../../../../../common/components/modal/CloseModalButton';
import useHandleServerErrorAlert from '../../../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../../../store';
import { NodecosmosError, UUID } from '../../../../../types';
import { setAlert } from '../../../../app/appSlice';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import { clearDescBranchData } from '../../../../descriptions/descriptionsSlice';
import { clearFlowStepBranchData } from '../../../../flow-steps/flowStepsSlice';
import { clearWorkflowBranchData } from '../../../../workflows/workflowsSlice';
import { clearNodeBranchData } from '../../../nodes.actions';
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
import { useNavigate } from 'react-router-dom';

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
    const dispatch: NodecosmosDispatch = useDispatch();
    const { originalId, nodeId: currentNodeId } = useBranchContext();
    const navigate = useNavigate();
    const uppy = useMemo(() => new Uppy({
        restrictions: {
            maxNumberOfFiles: 1,
            maxFileSize: 25 * 1024 * 1024,
        },
    }).use(XHRUpload, {
        endpoint: '',
        shouldRetry: () => false,
        getResponseData: () => {
            return {};
        },
    }), []);
    const handleServerError = useHandleServerErrorAlert(true);

    const handleClose = useCallback(() => {
        uppy.cancelAll();

        onClose();
    }, [onClose, uppy]);

    useEffect(() => {
        uppy.on('upload-success', async (_file, _response) => {
            dispatch(clearNodeBranchData(originalId));
            dispatch(clearWorkflowBranchData(originalId));
            dispatch(clearFlowStepBranchData(originalId));
            dispatch(clearDescBranchData(originalId));
            navigate(`/nodes/${originalId}/${currentNodeId}`);
            setTimeout(() => dispatch(setAlert({
                isOpen: true,
                severity: 'success',
                message: 'Nodes Imported Successfully!',
            })), 50);
        });

        uppy.on('upload-error', (_file, _error, resData) => {
            // @ts-ignore
            if (resData && resData.response) {
                // @ts-ignore
                handleServerError(JSON.parse(resData.response) as unknown as NodecosmosError);
            } else {
                dispatch(setAlert({
                    isOpen: true,
                    isModal: true,
                    severity: 'error',
                    message: 'Error uploading file!',
                }));
            }
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

            return uppy.upload().then(() => {

            }).catch((error) => {
                console.error(error);
                dispatch(setAlert({
                    isOpen: true,
                    isModal: true,
                    severity: 'error',
                    message: 'Error uploading file!',
                    duration: 5000,
                }));
            });
        });

        return () => {
            uppy.off('upload-success', () => {});
        };
    },
    [
        dispatch, onClose, branchId, nodeId, uppy, handleClose, originalId, navigate, currentNodeId, handleServerError,
    ]);

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
                    <Typography variant="h6" align="center" color="texts.secondary" width="auto">
                        <FontAwesomeIcon icon={faFileUpload} />
                        Import Nodes From File
                    </Typography>
                </div>
                <CloseModalButton onClose={handleClose} />
            </div>
            <DialogContent>
                <Alert position="sticky" mb={1} modal />
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
