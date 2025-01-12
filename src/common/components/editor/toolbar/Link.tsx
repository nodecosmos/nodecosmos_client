import { validateURL } from '../../../../utils/validation';
import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import useEditorItem from '../../../hooks/editor/useEditorItem';
import useEditorState from '../../../hooks/editor/useEditorState';
import FinalFormInputField from '../../final-form/FinalFormInputField';
import { faLink } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ToggleButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@mui/material';
import { Node } from 'prosemirror-model';
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

export default function Link() {
    const { editorView } = useEditorContext();
    const state = useEditorState();
    const [open, setOpen] = useState(false);
    const [isActive] = useEditorItem('link');

    const toggleModal = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const selectedLink = useMemo<[Node, number] | null>(() => {
        if (!state) return null;

        const { selection } = state;
        const { from, to } = selection;

        let link = null;

        state.doc.nodesBetween(from, to, (node, position) => {
            if (node.type === state.schema.nodes.link) {
                link = [node, position];
                return false;
            }
        });

        return link;
    }, [state]);

    const getSelectedText = useCallback(() => {
        if (!state) return '';

        if (selectedLink) {
            return selectedLink[0].textContent;
        }

        const { from, to } = state.selection;
        return state.doc.textBetween(from, to, ' ');
    }, [selectedLink, state]);

    const toggleLink = useCallback((form: LinkInsertProps) => {
        if (!state || !editorView) return;

        const { link } = state.schema.nodes;
        const attrs = { href: form.url };
        const {
            from, to, empty,
        } = state.selection;

        let tr = state.tr;

        if (selectedLink) {
            let [node, pos] = selectedLink;
            tr = tr.replaceWith(
                pos, pos + node.nodeSize, link.create(attrs, state.schema.text(form.displayText || form.url)),
            );
        } else if (empty) {
            const linkNode = link.create(attrs, state.schema.text(form.displayText || form.url));
            tr = tr.replaceSelectionWith(linkNode, false);
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

        editorView.dispatch(tr);
        editorView.focus();
        setOpen(false);
    }, [editorView, selectedLink, state]);

    const initialValues = useMemo(() => ({
        url: selectedLink ? selectedLink[0].attrs.href : '',
        displayText: getSelectedText(),
    }), [getSelectedText, selectedLink]);

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
                    onSubmit={toggleLink}
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
