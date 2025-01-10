import { validateURL } from '../../../../utils/validation';
import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import useEditorState from '../../../hooks/editor/useEditorState';
import useToolbarItem from '../../../hooks/editor/useToolbarItem';
import FinalFormInputField from '../../final-form/FinalFormInputField';
import { faLink } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ToggleButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@mui/material';
import { Node } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
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

function toggleLink(
    state: EditorState | null,
    url: string,
    displayText: string,
    dispatch?: (tr: Transaction) => void,
) {
    if (!state) return;

    const { link } = state.schema.nodes;
    const attrs = { href: url };
    const {
        from, to, empty,
    } = state.selection;

    let tr = state.tr;

    if (empty) {
        const linkNode = link.create(attrs, state.schema.text(displayText || url));
        tr.replaceSelectionWith(linkNode, false);
    } else {
        const collectedNodes: { node: Node; pos: number }[] = [];
        state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.isText) {
                // Create a link node wrapping the text
                collectedNodes.push({
                    node,
                    pos,
                });
            }
        });

        for (let i = collectedNodes.length - 1; i >= 0; i -= 1) {
            const { node, pos } = collectedNodes[i];
            const linkNode = link.create(attrs, node);
            tr = tr.replaceWith(pos, pos + node.nodeSize, linkNode);
        }
    }

    if (dispatch) dispatch(tr);
}

const getSelectedText = (state: EditorState | null) => {
    if (!state) return '';

    const { selection } = state;
    const { from, to } = selection;

    if (from !== to) {
        return state.doc.textBetween(from, to);
    }

    return '';
};

export default function LinkInsert() {
    const { editorView } = useEditorContext();
    const state = useEditorState();
    const [open, setOpen] = useState(false);
    const [isActive] = useToolbarItem('link');
    const toggleModal = useCallback(() => {
        setOpen(!open);
    }, [open]);

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
        toggleLink(state, form.url, form.displayText, editorView.dispatch);
        editorView.focus();
        setOpen(false);
    }, [editorView, state]);

    const initialValues = useMemo(() => ({
        url: getSelectedUrl(),
        displayText: getSelectedText(state),
    }), [getSelectedUrl, state]);

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
