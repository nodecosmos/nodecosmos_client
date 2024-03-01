import { selectSelectedNode } from '../../../../features/nodes/nodes.selectors';
import { UUID } from '../../../../types';
import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import useBooleanStateValue from '../../../hooks/useBooleanStateValue';
import UppyUploadFileModal from '../../upload/UploadFileModal';
import { faFileArrowUp } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useCommands } from '@remirror/react';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function File() {
    const { persistedId } = useSelector(selectSelectedNode);
    const commands = useCommands<RemirrorExtensions>();
    const [fileDialogOpen, openFileDialog, closeFileDialog] = useBooleanStateValue();
    const fileUploadParams = useMemo(() => ({
        nodeId: persistedId as UUID,
        objectId: persistedId as UUID,
    }), [persistedId]);

    const handleFileDialogClose = useCallback((attachment?: { url: string; key: string }) => {
        if (attachment) {
            const url = new URL(attachment.url);
            commands.insertMarkdown(`[${attachment.key}](${url.href})`);
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
