import useBranchContext from '../../../../features/branch/hooks/useBranchContext';
import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import useBooleanStateValue from '../../../hooks/useBooleanStateValue';
import { faCamera } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useCommands } from '@remirror/react';
import React, { Suspense, useCallback } from 'react';

const UppyUploadImageModal = React.lazy(() => import('../../../../common/components/upload/UploadImageModal'));

export default function Image() {
    const {
        nodeId, branchId, originalId,
    } = useBranchContext();
    const { fileObjectId } = useEditorContext();
    const [imageDialogOpen, openImageDialog, closeImageDialog] = useBooleanStateValue();
    const commands = useCommands<RemirrorExtensions>();

    const handleImageDialogClose = useCallback((responseBody?: { url: string }) => {
        closeImageDialog();
        if (responseBody?.url) {
            commands.insertImage({
                src: responseBody.url,
                className: 'ProseMirror-image', 
            });
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
                        endpointPath={
                            `attachments/${branchId}/${nodeId}/${originalId}/${fileObjectId}/upload_image`
                        }
                        open={imageDialogOpen}
                        onClose={handleImageDialogClose}
                    />
                </Suspense>
            )}
        </>

    );
}
