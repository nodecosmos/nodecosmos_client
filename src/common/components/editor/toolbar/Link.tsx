import { validateURL } from '../../../../utils/validation';
import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import useToolbarItem from '../../../hooks/editor/useToolbarItem';
import FinalFormInputField from '../../final-form/FinalFormInputField';
import { faLink } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ToggleButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@mui/material';
import { EditorView } from 'prosemirror-view';
import React, {
    useCallback, useMemo, useState,
} from 'react';
import { Form } from 'react-final-form';

interface LinkInsertProps {
    url: string;
    displayText: string;
}

const PROPS = {
    elevation: 5,
    sx: { borderRadius: 2.5 },
};

const SUBSCRIPTION = { submitting: true };

function toggleLink(editorView: EditorView | null, url: string, displayText: string) {
    if (!editorView) return;

    const { state, dispatch } = editorView;
    const { link } = state.schema.nodes;
    if (!link) return;

    const attrs = { href: url };
    const {
        from, to, empty,
    } = state.selection;

    if (empty) {
        const linkNode = link.create(attrs, state.schema.text(displayText || url));
        const tr = state.tr.replaceSelectionWith(linkNode, false);
        dispatch(tr);
    } else {
        const linkNode = link.create(attrs, state.doc.slice(from, to).content);
        const tr = state.tr.replaceWith(from, to, linkNode);
        dispatch(tr);
    }
}

export default function LinkInsert() {
    const { editorView } = useEditorContext();
    const [open, setOpen] = useState(false);
    const [isActive] = useToolbarItem('link');
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
            return node.attrs.href;
        }
        return '';
    }, [editorView]);

    const handleInsert = useCallback((form: LinkInsertProps) => {
        if (!editorView) return;
        toggleLink(editorView, form.url, form.displayText);
        editorView.focus();
        setOpen(false);
    }, [editorView]);

    const initialValues = useMemo(() => ({
        url: getSelectedUrl(),
        displayText: getSelectedText(),
    }), [getSelectedText, getSelectedUrl]);

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
                    subscription={SUBSCRIPTION}
                    initialValues={initialValues}
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
