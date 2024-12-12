
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

            const { link } = schema.marks;
            if (!link) return false;

            const linkMark = link.create({ href: attachment.url });
            const textNode = schema.text(attachment.filename, [linkMark]);

            const tr = state.tr.replaceSelectionWith(textNode, false);
            dispatch(tr);

            editorView!.focus();
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
