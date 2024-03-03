import DefaultButton from '../../../common/components/buttons/DefaultButton';
import Loader from '../../../common/components/Loader';
import { EnabledExtensions } from '../../../common/hooks/editor/useExtensions';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { createComment } from '../comments.thunks';
import { CommentPrimaryKey, CreateCommentPayload } from '../comments.types';
import { MAX_COMMENT_WIDTH } from '../commentsSlice';
import { faSave } from '@fortawesome/pro-thin-svg-icons';
import { Box, Button } from '@mui/material';
import { HelpersFromExtensions } from '@remirror/core';
import React, { Suspense, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';

const RemirrorEditor = React.lazy(() => import('../../../common/components/editor/RemirrorEditor'));

interface WithThread {
    thread: CreateCommentPayload['thread'];
    commentPk?: never;
}

interface WithoutThread {
    commentPk: CommentPrimaryKey;
    thread?: never;
}

export type CreateCommentProps = WithThread | WithoutThread;
export type AddDescriptionCommentProps = CreateCommentProps & {
    onClose?: () => void;
};

const {
    Bold, Italic, Strike, Markdown, Blockquote, Link, OrderedList,
} = EnabledExtensions;

export default function CreateComment(props: AddDescriptionCommentProps) {
    const {
        thread, commentPk = null, onClose,
    } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const [content, setContent] = React.useState<string>('');
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();

    const handleChange = useCallback((helpers: HelpersFromExtensions<MarkdownExtension>) => {
        setContent(helpers.getText());
    }, []);

    const handleCommentCreation = useCallback(() => {
        setLoading();

        let payload: CreateCommentPayload;

        if (commentPk) {
            payload = {
                comment: {
                    ...commentPk,
                    content,
                },
            };
        } else if (thread) {
            payload = {
                thread,
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
    }, [onClose, commentPk, content, dispatch, setLoading, thread, unsetLoading]);

    return (
        <Box my={0.5}>
            <Box
                border={1}
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
                                startIcon={faSave}
                                loading={loading}
                                title="Create"
                                onClick={handleCommentCreation}
                            />
                        </Box>
                    </Box>
                </Suspense>
            </Box>
        </Box>
    );
}
