import useBranchContext from '../../../../features/branch/hooks/useBranchContext';
import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import useBooleanStateValue from '../../../hooks/useBooleanStateValue';
import UppyUploadFileModal from '../../upload/UploadFileModal';
import { faFileArrowUp } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useCommands } from '@remirror/react';
import React, { useCallback, useMemo } from 'react';

export default function File() {
    const {
        nodeId, branchId, originalId,
    } = useBranchContext();
    const { fileObjectId } = useEditorContext();
    const commands = useCommands<RemirrorExtensions>();
    const [fileDialogOpen, openFileDialog, closeFileDialog] = useBooleanStateValue();
    const fileUploadParams = useMemo(() => ({
        nodeId,
        rootId: originalId,
        branchId,
        objectId: fileObjectId,
    }), [branchId, nodeId, originalId, fileObjectId]);

    const handleFileDialogClose = useCallback((attachment?: { url: string; filename: string }) => {
        if (attachment) {
            commands.insertMarkdown(
                // eslint-disable-next-line max-len
                `<a href="${attachment.url}">${attachment.filename}</a>`,
            );
        }

        closeFileDialog();
    }, [closeFileDialog, commands]);

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
