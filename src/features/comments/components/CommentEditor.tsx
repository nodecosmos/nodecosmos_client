import DefaultButton from '../../../common/components/buttons/DefaultButton';
import Loader from '../../../common/components/Loader';
import { EnabledExtensions } from '../../../common/hooks/editor/useExtensions';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { createComment, updateCommentContent } from '../comments.thunks';
import {
    CommentThreadPrimaryKey, CreateCommentPayload, UpdateCommentPayload,
} from '../comments.types';
import { MAX_COMMENT_WIDTH } from '../commentsSlice';
import { faSave } from '@fortawesome/pro-thin-svg-icons';
import { Box, Button } from '@mui/material';
import { HelpersFromExtensions } from '@remirror/core';
import React, { Suspense, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';

const RemirrorEditor = React.lazy(() => import('../../../common/components/editor/RemirrorEditor'));

// when we create both a new thread and a comment
interface WithThreadInsertPayload {
    newThread: CreateCommentPayload['thread'];
    threadPk?: never;
    comment?: never;
}

// when we create only a comment within an existing thread
interface WithoutThreadInsertPayload {
    newThread?: never;
    comment?: never;
    threadPk: {
        objectId: CommentThreadPrimaryKey['objectId'];
        threadId: CommentThreadPrimaryKey['id']
    };
}

// when we update a comment
interface UpdatePayload {
    comment: UpdateCommentPayload
    threadPk?: never;
    newThread?: never;
}

export type CreateCommentProps = WithThreadInsertPayload | WithoutThreadInsertPayload | UpdatePayload;

export type AddDescriptionCommentProps = CreateCommentProps & {
    onClose?: () => void;
};

const {
    Bold, Italic, Strike, Markdown, Blockquote, Link, OrderedList,
} = EnabledExtensions;

export default function CommentEditor(props: AddDescriptionCommentProps) {
    const {
        newThread, threadPk = null, onClose, comment,
    } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const [content, setContent] = React.useState<string>(comment?.content || '');
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const isUpdate = Boolean(comment);

    const handleChange = useCallback((helpers: HelpersFromExtensions<MarkdownExtension>) => {
        setContent(helpers.getHTML());
    }, []);

    const handleSave = useCallback(() => {
        setLoading();

        if (comment) {
            const payload = {
                ...comment,
                content,
            };

            dispatch(updateCommentContent(payload)).then(() => {
                if (onClose) {
                    onClose();
                }
                unsetLoading();
            });
        } else {
            let payload: CreateCommentPayload;

            if (threadPk) {
                payload = {
                    comment: {
                        ...threadPk,
                        content,
                    },
                };
            } else if (newThread) {
                payload = {
                    thread: newThread,
                    comment: { content },
                };
            } else {
                throw new Error('Invalid props');
            }

            dispatch(createComment(payload)).then(() => {
                if (onClose) {
                    onClose();
                }
                unsetLoading();
            });
        }
    }, [setLoading, comment, content, dispatch, onClose, unsetLoading, threadPk, newThread]);

    return (
        <Box>
            <Box
                border={isUpdate ? 0 : 1}
                borderColor="borders.4"
                p={1}
                sx={{ backgroundColor: 'background.1' }}
                boxSizing="border-box">
                <Suspense fallback={<Loader p={4} />}>
                    <Box maxWidth={MAX_COMMENT_WIDTH}>
                        <Box
                            overflow="hidden"
                            border={1}
                            borderColor="borders.4"
                            borderRadius={1.50}
                            width={1}
                        >
                            <RemirrorEditor
                                markdown={content}
                                onChange={handleChange}
                                enabledExtensions={[
                                    Bold,
                                    Italic,
                                    Strike,
                                    Markdown,
                                    Blockquote,
                                    Link,
                                    OrderedList,
                                ]}
                                p={1}
                                toolbarHeight={38}
                                editorBackgroundColor="background.1"
                                info="Add description review comment."
                            />
                        </Box>
                        <Box
                            mt={1}
                            display="flex"
                            justifyContent="flex-end"
                        >
                            <Button variant="outlined" color="buttonContrast" onClick={onClose}>
                                Cancel
                            </Button>
                            <DefaultButton
                                sx={{ ml: 1 }}
                                variant="outlined"
                                color="primary"
                                borderColor="primary"
                                startIcon={faSave}
                                loading={loading}
                                title={comment ? 'Update' : 'Create'}
                                onClick={handleSave}
                            />
                        </Box>
                    </Box>
                </Suspense>
            </Box>
        </Box>
    );
}
