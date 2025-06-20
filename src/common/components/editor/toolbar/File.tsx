
import useBranchContext from '../../../../features/branch/hooks/useBranchContext';
import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import useBooleanStateValue from '../../../hooks/useBooleanStateValue';
import UppyUploadFileModal from '../../upload/UploadFileModal';
import { faFileArrowUp } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

interface Attachment {
    url: string;
    filename: string;
}

export default function File() {
    const {
        nodeId, branchId, originalId,
    } = useBranchContext();
    const { fileObjectId, editorView } = useEditorContext();
    const [fileDialogOpen, openFileDialog, closeFileDialog] = useBooleanStateValue();

    if (!fileObjectId) throw new Error('File object ID is required for file upload');

    const fileUploadParams = useMemo(() => ({
        nodeId,
        rootId: originalId,
        branchId,
        objectId: fileObjectId,
    }), [branchId, nodeId, originalId, fileObjectId]);

    const handleFileDialogClose = useCallback((attachment?: Attachment) => {
        if (attachment && editorView) {
            const { state, dispatch } = editorView!;
            const { schema } = state;

            const { link } = schema.nodes;
            if (!link) return false;

            const linkNode = link.create({ href: attachment.url }, state.schema.text(attachment.filename));
            const tr = state.tr.replaceSelectionWith(linkNode, false);

            dispatch(tr);

            editorView.focus();
        }

        closeFileDialog();
    }, [closeFileDialog, editorView]);

    return (
        <>
            <Tooltip title="Upload File">
                <ToggleButton value="check" onClick={openFileDialog}>
                    <FontAwesomeIcon icon={faFileArrowUp} />
                </ToggleButton>
            </Tooltip>

            <UppyUploadFileModal
                params={fileUploadParams}
                open={fileDialogOpen}
                onClose={handleFileDialogClose}
            />
        </>
    );
}
