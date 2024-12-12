import { validateURL } from '../../../../utils/validation';
import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import FinalFormInputField from '../../final-form/FinalFormInputField';
import { faLink } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ToggleButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@mui/material';
import { EditorView } from 'prosemirror-view';
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

function isLinkActive(editorView: EditorView | null): boolean {
    if (!editorView) return false;

    const {
        from, $from, to, empty,
    } = editorView.state.selection;
    const { link } = editorView.state.schema.marks;
    if (!link) return false;

    if (empty) {
        return !!link.isInSet(editorView.state.storedMarks || $from.marks());
    } else {
        return editorView.state.doc.rangeHasMark(from, to, link);
    }
}

function toggleLink(editorView: EditorView | null, url: string, displayText: string) {
    if (!editorView) return;

    const { state, dispatch } = editorView;
    const { link } = state.schema.marks;
    if (!link) return;

    const markAttrs = { href: url };
    const {
        from, to, empty,
    } = state.selection;

    if (!empty) {
        let tr = state.tr;
        tr.addMark(from, to, link.create(markAttrs));
        dispatch(tr);
    } else {
        const textToInsert = displayText || url;
        const linkTextNode = state.schema.text(textToInsert, [link.create(markAttrs)]);
        const tr = state.tr.replaceSelectionWith(linkTextNode, false);
        dispatch(tr);
    }
}

export default function LinkInsert() {
    const { editorView } = useEditorContext();
    const [open, setOpen] = useState(false);

    const isActive = isLinkActive(editorView);

    const toggleModal = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const getSelectedText = useCallback(() => {
        if (!editorView) return '';

        const { selection, doc } = editorView.state;
        if (selection.from !== selection.to) {
            return doc.textBetween(selection.from, selection.to);
        }
        return '';
    }, [editorView]);

    const getSelectedUrl = useCallback(() => {
        if (!editorView) return '';

        const { selection, doc } = editorView.state;
        const { from } = selection;
        const node = doc.nodeAt(from);

        if (node) {
            const linkMark = node.marks.find((mark) => mark.type.name === 'link');
            if (linkMark) {
                return linkMark.attrs.href;
            }
        }
        return '';
    }, [editorView]);

    const handleInsert = useCallback((form: LinkInsertProps) => {
        if (!editorView) return;
        toggleLink(editorView, form.url, form.displayText);
        editorView.focus();
        setOpen(false);
    }, [editorView]);

    return (
        <>
            <Tooltip title="Insert Link">
                <ToggleButton
                    value="link"
                    onClick={toggleModal}
                    selected={isActive}
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
                        url: getSelectedUrl(),
                        displayText: getSelectedText(),
                    }}
                >
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
