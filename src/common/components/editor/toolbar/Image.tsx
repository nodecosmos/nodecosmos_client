
import useBranchContext from '../../../../features/branch/hooks/useBranchContext';
import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import useBooleanStateValue from '../../../hooks/useBooleanStateValue';
import { faCamera } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { Schema } from 'prosemirror-model';
import {
    EditorState, Transaction, Selection,
} from 'prosemirror-state';
import React, { Suspense, useCallback } from 'react';

const UppyUploadImageModal = React.lazy(() => import('../../../../common/components/upload/UploadImageModal'));

interface Attachment {
    url: string;
}

function insertImageAndParagraphs(
    state: EditorState,
    dispatch: (tr: Transaction) => void,
    schema: Schema,
    src: string,
): boolean {
    const { image, paragraph } = schema.nodes;
    if (!image || !paragraph) return false;

    // Create the image node
    const imageNode = image.create({
        src,
        class: 'ProseMirror-image',
    });

    let tr = state.tr;
    // Insert the image at the current selection
    tr = tr.replaceSelectionWith(imageNode);

    // After replacing selection with a block node, the selection should move after the inserted node.
    // Insert two paragraphs after the image node
    const posAfterImage = tr.selection.from; // After the image insertion, selection should be after the image node

    const paragraphNode = paragraph.create();
    const paragraphNode2 = paragraph.create();

    // Insert two paragraphs after the image
    tr = tr.insert(posAfterImage, paragraphNode);

    // After inserting the first paragraph, selection remains the same. We'll set the selection after it:
    tr = tr.setSelection(Selection.near(tr.doc.resolve(posAfterImage + paragraphNode.nodeSize)));
    tr = tr.insert(tr.selection.from, paragraphNode2);

    // Finally, move the cursor into the last inserted paragraph:
    tr = tr.setSelection(Selection.atEnd(paragraphNode2));

    dispatch(tr);
    return true;
}

export default function Image() {
    const {
        nodeId, branchId, originalId,
    } = useBranchContext();
    const { fileObjectId, editorView } = useEditorContext();
    const [imageDialogOpen, openImageDialog, closeImageDialog] = useBooleanStateValue();

    const handleImageDialogClose = useCallback((responseBody?: Attachment) => {
        closeImageDialog();
        if (responseBody?.url && editorView) {
            const { state, dispatch } = editorView!;
            const { schema } = state;
            // Insert the image and then two paragraphs
            insertImageAndParagraphs(state, dispatch, schema, responseBody.url);
            editorView!.focus();
        }
    }, [closeImageDialog, editorView]);

    return (
        <>
            <Tooltip title="Insert image">
                <ToggleButton value="check" onClick={openImageDialog}>
                    <FontAwesomeIcon icon={faCamera} />
                </ToggleButton>
            </Tooltip>

            {imageDialogOpen && (
                <Suspense fallback={null}>
                    <UppyUploadImageModal
                        endpointPath={`attachments/${branchId}/${nodeId}/${originalId}/${fileObjectId}/upload_image`}
                        open={imageDialogOpen}
                        onClose={handleImageDialogClose}
                    />
                </Suspense>
            )}
        </>
    );
}
