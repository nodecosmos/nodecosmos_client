import React from 'react';
import {
    useActive, useCommands, useHelpers, 
} from '@remirror/react';
import {
    Stack, ToggleButton, Tooltip, 
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

import { useSelector } from 'react-redux';
import UploadImageModal from '../upload/UploadImageModal';
import { selectSelectedNode } from '../../../features/nodes/nodes.selectors';
import UppyUploadFileModal from '../upload/UploadFileModal';
import RemirrorEditorToolbarHeadingMenu from './RemirrorEditorToolbarHeadingMenu';

// Add uploaded files as attachments to the models.
// Don't do anything on article change, but allow users to remove attachments in separate dialog.
export default function RemirrorEditorToolbar() {
    const { persistentId } = useSelector(selectSelectedNode);

    const commands = useCommands();
    const active = useActive();

    const { undoDepth, redoDepth } = useHelpers(true);

    const [openImageDialog, setOpenImageDialog] = React.useState(false);
    const [openFileDialog, setOpenFileDialog] = React.useState(false);

    const handleImageDialogClose = (responseBody) => {
        setOpenImageDialog(false);
        if (responseBody?.url) {
            commands.insertImage({ src: responseBody?.url });
            commands.insertText('\n\n');
        }
    };

    const handleFileDialogClose = (attachment) => {
        setOpenFileDialog(false);

        if (attachment) {
            const url = new URL(attachment.url);
            commands.insertMarkdown(`[${attachment.key}](${url.href})`);
        }
    };

    return (
        <div className="RemirrorToolbar">
            <Stack direction="row" spacing={1}>
                <div>
                    <Tooltip title="Bold">
                        <ToggleButton
                            value="check"
                            onClick={() => commands.toggleBold()}
                            selected={active.bold()}
                        >
                            <FontAwesomeIcon icon={faBold} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Italic">
                        <ToggleButton
                            value="check"
                            onClick={() => commands.toggleItalic()}
                            selected={active.italic()}
                        >
                            <FontAwesomeIcon icon={faItalic} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Strikethrough">
                        <ToggleButton
                            value="check"
                            onClick={() => commands.toggleStrike()}
                            selected={active.strike()}
                        >
                            <FontAwesomeIcon icon={faStrikethrough} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Code">
                        <ToggleButton
                            value="check"
                            onClick={() => commands.toggleCode()}
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
                            onClick={() => commands.toggleHeading({
                                level: 1,
                            })}
                            selected={active.heading({
                                level: 1,
                            })}
                        >
                            <FontAwesomeIcon icon={faH1} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Heading 2">
                        <ToggleButton
                            value="check"
                            onClick={() => commands.toggleHeading({
                                level: 2,
                            })}
                            selected={active.heading({
                                level: 2,
                            })}
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
                            onClick={() => commands.toggleBulletList()}
                            selected={active.bulletList()}
                        >
                            <FontAwesomeIcon icon={faList} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Insert numbered list">
                        <ToggleButton
                            value="check"
                            onClick={() => commands.toggleOrderedList()}
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
                            onClick={() => commands.toggleBlockquote()}
                            selected={active.blockquote()}
                        >
                            <FontAwesomeIcon icon={faSquareQuote} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Insert code block">
                        <ToggleButton
                            value="check"
                            onClick={() => commands.toggleCodeBlock()}
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
                                onClick={() => commands.undo()}
                                disabled={!undoDepth() > 0}
                            >
                                <FontAwesomeIcon icon={faUndo} />
                            </ToggleButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Redo">
                        <span>
                            <ToggleButton
                                value="check"
                                onClick={() => commands.redo()}
                                disabled={!redoDepth() > 0}
                            >
                                <FontAwesomeIcon icon={faRedo} />
                            </ToggleButton>
                        </span>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Insert image">
                        <ToggleButton value="check" onClick={() => setOpenImageDialog(true)}>
                            <FontAwesomeIcon icon={faCamera} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Upload File">
                        <ToggleButton value="check" onClick={() => setOpenFileDialog(true)}>
                            <FontAwesomeIcon icon={faFileArrowUp} />
                        </ToggleButton>
                    </Tooltip>
                </div>
            </Stack>
            <UploadImageModal
                endpointPath={`attachments/${persistentId}/${persistentId}/upload_image`}
                open={openImageDialog}
                onClose={handleImageDialogClose}
                aspectRatio={null}
            />
            <UppyUploadFileModal
                params={{
                    nodeId: persistentId,
                    objectId: persistentId,
                }}
                open={openFileDialog}
                onClose={handleFileDialogClose}
            />
        </div>
    );
}
