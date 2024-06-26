import { selectSelectedNode } from '../../../../features/nodes/nodes.selectors';
import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import useBooleanStateValue from '../../../hooks/useBooleanStateValue';
import { faCamera } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useCommands } from '@remirror/react';
import React, { Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';

const UppyUploadImageModal = React.lazy(() => import('../../../../common/components/upload/UploadImageModal'));

/// TODO: we need to pass pros from RemirrorEditor
export default function Image() {
    const [imageDialogOpen, openImageDialog, closeImageDialog] = useBooleanStateValue();
    const {
        id, rootId, branchId,
    } = useSelector(selectSelectedNode);
    const commands = useCommands<RemirrorExtensions>();

    const handleImageDialogClose = useCallback((responseBody?: { url: string }) => {
        closeImageDialog();
        if (responseBody?.url) {
            commands.insertImage({ src: responseBody.url });
            commands.insertParagraph();
            commands.insertParagraph();
        }
    }, [closeImageDialog, commands]);

    return (
        <>
            <Tooltip title="Insert image">
                <ToggleButton value="check" onClick={openImageDialog}>
                    <FontAwesomeIcon icon={faCamera} />
                </ToggleButton>
            </Tooltip>
            {imageDialogOpen && (
                <Suspense>
                    <UppyUploadImageModal
                        endpointPath={`attachments/${branchId}/${id}/${rootId}/${id}/upload_image`}
                        open={imageDialogOpen}
                        onClose={handleImageDialogClose}
                    />
                </Suspense>
            )}
        </>

    );
}
