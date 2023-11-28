import RemirrorEditorToolbarHeadingMenu from './RemirrorEditorToolbarHeadingMenu';
import { selectSelectedNode } from '../../../features/nodes/nodes.selectors';
import { UUID } from '../../../types';
import useBooleanStateValue from '../../hooks/useBooleanStateValue';
import UppyUploadFileModal from '../upload/UploadFileModal';
import UploadImageModal from '../upload/UploadImageModal';
import {
    faBold,
    faItalic,
    faStrikethrough,
    faCode,
    faH1,
    faH2,
    faList,
    faListOl,
    faSquareQuote,
    faBracketsCurly,
    faUndo,
    faRedo,
    faCamera,
    faFileArrowUp,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Stack, ToggleButton, Tooltip,
} from '@mui/material';
import {
    useActive, useCommands, useHelpers,
} from '@remirror/react';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

// Add uploaded files as attachments to the models.
// Don't do anything on article change, but allow users to remove attachments in separate dialog.
export default function RemirrorEditorToolbar() {
    const { persistedId } = useSelector(selectSelectedNode);

    const commands = useCommands();
    const active = useActive();

    const { undoDepth, redoDepth } = useHelpers(true);

    const [imageDialogOpen, openImageDialog, closeImageDialog] = useBooleanStateValue();
    const [fileDialogOpen, openFileDialog, closeFileDialog] = useBooleanStateValue();

    const handleImageDialogClose = useCallback((responseBody?: { coverImageURL: string }) => {
        closeImageDialog();
        if (responseBody?.coverImageURL) {
            commands.insertImage({ src: responseBody?.coverImageURL });
            commands.insertText('\n\n');
        }
    }, [closeImageDialog, commands]);

    const handleFileDialogClose = useCallback((attachment?: { url: string; key: string }) => {
        closeFileDialog();

        if (attachment) {
            const url = new URL(attachment.url);
            commands.insertMarkdown(`[${attachment.key}](${url.href})`);
        }
    }, [closeFileDialog, commands]);

    const toggleBold = useCallback(() => {
        commands.toggleBold();
    }, [commands]);

    const toggleItalic = useCallback(() => {
        commands.toggleItalic();
    }, [commands]);

    const toggleCodeBlock = useCallback(() => {
        commands.toggleCodeBlock();
    }, [commands]);

    const toggleHeading1 = useCallback(() => {
        commands.toggleHeading({ level: 1 });
    }, [commands]);

    const toggleHeading2 = useCallback(() => {
        commands.toggleHeading({ level: 2 });
    }, [commands]);

    return (
        <div className="RemirrorToolbar">
            <Stack direction="row" spacing={1}>
                <div>
                    <Tooltip title="Bold">
                        <ToggleButton
                            value="check"
                            onClick={toggleBold}
                            selected={active.bold()}
                        >
                            <FontAwesomeIcon icon={faBold} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Italic">
                        <ToggleButton
                            value="check"
                            onClick={toggleItalic}
                            selected={active.italic()}
                        >
                            <FontAwesomeIcon icon={faItalic} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Strikethrough">
                        <ToggleButton
                            value="check"
                            onClick={commands.toggleStrike}
                            selected={active.strike()}
                        >
                            <FontAwesomeIcon icon={faStrikethrough} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Code">
                        <ToggleButton
                            value="check"
                            onClick={commands.toggleCode}
                            selected={active.code()}
                        >
                            <FontAwesomeIcon icon={faCode} />
                        </ToggleButton>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Heading 1">
                        <ToggleButton
                            value="check"
                            onClick={toggleHeading1}
                            selected={active.heading({ level: 1 })}
                        >
                            <FontAwesomeIcon icon={faH1} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Heading 2">
                        <ToggleButton
                            value="check"
                            onClick={toggleHeading2}
                            selected={active.heading({ level: 2 })}
                        >
                            <FontAwesomeIcon icon={faH2} />
                        </ToggleButton>
                    </Tooltip>
                    <RemirrorEditorToolbarHeadingMenu />
                </div>
                <div>
                    <Tooltip title="Insert bullet list">
                        <ToggleButton
                            value="check"
                            onClick={commands.toggleBulletList}
                            selected={active.bulletList()}
                        >
                            <FontAwesomeIcon icon={faList} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Insert numbered list">
                        <ToggleButton
                            value="check"
                            onClick={commands.toggleOrderedList}
                            selected={active.orderedList()}
                        >
                            <FontAwesomeIcon icon={faListOl} />
                        </ToggleButton>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Insert blockquote">
                        <ToggleButton
                            value="check"
                            onClick={commands.toggleBlockquote}
                            selected={active.blockquote()}
                        >
                            <FontAwesomeIcon icon={faSquareQuote} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Insert code block">
                        <ToggleButton
                            value="check"
                            onClick={toggleCodeBlock}
                            selected={active.codeBlock()}
                        >
                            <FontAwesomeIcon icon={faBracketsCurly} />
                        </ToggleButton>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Undo">
                        <span>
                            <ToggleButton
                                value="check"
                                onClick={commands.undo}
                                disabled={!(undoDepth() > 0)}
                            >
                                <FontAwesomeIcon icon={faUndo} />
                            </ToggleButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Redo">
                        <span>
                            <ToggleButton
                                value="check"
                                onClick={commands.redo}
                                disabled={!(redoDepth() > 0)}
                            >
                                <FontAwesomeIcon icon={faRedo} />
                            </ToggleButton>
                        </span>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Insert image">
                        <ToggleButton value="check" onClick={openImageDialog}>
                            <FontAwesomeIcon icon={faCamera} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Upload File">
                        <ToggleButton value="check" onClick={openFileDialog}>
                            <FontAwesomeIcon icon={faFileArrowUp} />
                        </ToggleButton>
                    </Tooltip>
                </div>
            </Stack>
            <UploadImageModal
                endpointPath={`attachments/${persistedId}/${persistedId}/upload_image`}
                open={imageDialogOpen}
                onClose={handleImageDialogClose}
            />
            <UppyUploadFileModal
                params={{
                    nodeId: persistedId as UUID,
                    objectId: persistedId as UUID,
                }}
                open={fileDialogOpen}
                onClose={handleFileDialogClose}
            />
        </div>
    );
}
