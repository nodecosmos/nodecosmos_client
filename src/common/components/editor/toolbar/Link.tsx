import { validateURL } from '../../../../utils/validation';
import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import FinalFormInputField from '../../final-form/FinalFormInputField';
import { faLink } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ToggleButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@mui/material';
import {
    useActive, useCommands, useEditorState,
} from '@remirror/react';
import React, { useCallback, useState } from 'react';
import { Form } from 'react-final-form';

interface LinkInsertProps {
    url: string;
    displayText: string;
}

const PROPS = {
    elevation: 5,
    sx: { borderRadius: 2.5 },
};

export default function LinkInsert() {
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();
    const [open, setOpen] = useState(false);
    const editorState = useEditorState();

    const toggleModal = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const getSelectedText = useCallback(() => {
        const { selection, doc } = editorState;
        if (selection.from !== selection.to) {
            return doc.textBetween(selection.from, selection.to);
        }
        return '';
    }, [editorState]);

    const getSelectedUrl = useCallback(() => {
        const { selection, doc } = editorState;
        const { from } = selection;
        const node = doc.nodeAt(from);

        if (node) {
            const linkMark = node.marks.find((mark) => mark.type.name === 'link');

            if (linkMark) {
                return linkMark.attrs.href; // Return the URL if a link mark is present
            }
        }
        return '';
    }, [editorState]);

    const handleInsert = useCallback((form: LinkInsertProps) => {
        if (form.url) {
            commands.replaceText({
                content: form.displayText,
                type: 'link',
                attrs: { href: form.url },
            });

            setOpen(false);
        }
    }, [commands]);

    return (
        <>
            <Tooltip title="Insert Link">
                <ToggleButton
                    value="link"
                    onClick={toggleModal}
                    selected={active.link()}
                >
                    <FontAwesomeIcon icon={faLink} />
                </ToggleButton>
            </Tooltip>
            <Dialog open={open} onClose={toggleModal} PaperProps={PROPS}>
                <DialogTitle>Insert Link</DialogTitle>
                <Form
                    onSubmit={handleInsert}
                    subscription={{ submitting: true }}
                    initialValues={{
                        url:  getSelectedUrl(),
                        displayText: getSelectedText(),
                    }}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogContent>

                                <FinalFormInputField
                                    name="url"
                                    label="URL"
                                    fullWidth
                                    validate={validateURL}
                                />
                                <FinalFormInputField
                                    className="mt-2"
                                    name="displayText"
                                    label="Text to display (optional)"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={toggleModal} variant="outlined" color="error">Cancel</Button>
                                <Button type="submit" variant="outlined" color="success">
                                    Insert
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </Form>
            </Dialog>
        </>
    );
}
