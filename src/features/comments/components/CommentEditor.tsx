import DefaultButton from '../../../common/components/buttons/DefaultButton';
import Loader from '../../../common/components/Loader';
import { EnabledExtensions } from '../../../common/hooks/editor/useExtensions';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { REDIRECT_Q } from '../../users/components/LoginForm';
import { selectCurrentUser } from '../../users/users.selectors';
import {
    createComment, CreateCommentResponse, updateCommentContent,
} from '../comments.thunks';
import {
    CommentThreadPrimaryKey, CreateCommentPayload, UpdateCommentPayload,
} from '../comments.types';
import { MAX_COMMENT_WIDTH } from '../commentsSlice';
import { faSave } from '@fortawesome/pro-thin-svg-icons';
import { Box, Button } from '@mui/material';
import { HelpersFromExtensions } from '@remirror/core';
import React, {
    Suspense, useCallback, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { MarkdownExtension } from 'remirror/extensions';

const RemirrorEditor = React.lazy(() => import('../../../common/components/editor/RemirrorEditor'));

// when we create both a new thread and a comment
interface WithThreadInsertPayload {
    newThread: CreateCommentPayload['newThread'];
    threadPk?: never;
    comment?: never;
}

// when we create only a comment within an existing thread
interface WithoutThreadInsertPayload {
    newThread?: never;
    comment?: never;
    threadPk: CommentThreadPrimaryKey;
}

// when we update a comment
interface UpdatePayload {
    comment: UpdateCommentPayload
    threadPk?: never;
    newThread?: never;
}

export type CreateCommentProps = WithThreadInsertPayload | WithoutThreadInsertPayload | UpdatePayload;

export type AddDescriptionCommentProps = CreateCommentProps & {
    onClose?: (response?: CreateCommentResponse) => void;
    withThreadBlock?: boolean;
    autoFocus?: boolean;
    info?: string;
};

const {
    Bold, Italic, Strike, Markdown, Blockquote, CodeBlock, Link, OrderedList, Image, File,
} = EnabledExtensions;

export default function CommentEditor(props: AddDescriptionCommentProps) {
    const {
        newThread, threadPk = null, onClose, comment, withThreadBlock = false, autoFocus = true, info,
    } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const [content, setContent] = React.useState<string>(comment?.content || '');
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const isUpdate = Boolean(comment);
    const [clearState, setClearStateTrigger] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const handleServerError = useHandleServerErrorAlert();

    const clearContent = useCallback(() => {
        setContent('');
        setClearStateTrigger((prev) => !prev);
    }, []);

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
                        branchId: threadPk.branchId,
                        objectId: threadPk.objectId,
                        threadId: threadPk.id,
                        content,
                        url: window.location.href,
                    },
                };
            } else if (newThread) {
                payload = {
                    newThread,
                    comment: {
                        content,
                        url: window.location.href,
                    },
                };
            } else {
                throw new Error('Invalid props');
            }

            dispatch(createComment(payload)).then((response) => {
                if (response.meta.requestStatus === 'rejected') {
                    const error: NodecosmosError = response.payload as NodecosmosError;

                    setTimeout(() => handleServerError(error), 250);
                    console.error(error);
                    if (onClose) {
                        onClose();
                    } else {
                        clearContent();
                    }

                    return;
                }

                const responsePayload = response.payload as CreateCommentResponse;
                if (onClose) {
                    onClose(responsePayload);
                } else {
                    clearContent();
                }
                unsetLoading();
            });
        }
    }, [
        setLoading, comment, content, dispatch, onClose, unsetLoading,
        threadPk, newThread, handleServerError, clearContent,
    ]);

    const handleCancel = useCallback(() => {
        if (onClose) {
            onClose();
        } else {
            clearContent();
        }
    }, [onClose, clearContent]);

    if (!currentUser) {
        return (
            <div>
                <Box display="flex" height={30} width={1} m={1}>
                    <Button
                        variant="outlined"
                        component={RouterLink}
                        to={`/auth/login?${REDIRECT_Q}=${btoa(window.location.href)}`}
                        color="primary"
                        sx={{ mr: 1 }}>
                        Log in
                    </Button>
                    or
                    <Button
                        sx={{ mx: 1 }}
                        component={RouterLink}
                        to={`/auth/signup?${REDIRECT_Q}=${btoa(window.location.href)}`}
                        variant="outlined"
                        className="LogoButton focused"
                    >
                        Sign Up
                    </Button>

                    to add a comment.
                </Box>
            </div>
        );
    }

    return (
        <Box>
            <Box
                borderRadius={0}
                borderTop={!isUpdate && withThreadBlock ? 1 : 0}
                borderBottom={withThreadBlock ? 1 : 0}
                borderColor="borders.4"
                p={withThreadBlock ? 2 : 0}
                sx={{ backgroundColor: withThreadBlock ? 'background.1' : 'transparent' }}
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
                                    CodeBlock,
                                    Link,
                                    OrderedList,
                                    Image,
                                    File,
                                ]}
                                p={1}
                                toolbarHeight={38}
                                editorBackgroundColor={withThreadBlock ? 'background.1' : 'transparent'}
                                info={info}
                                clearState={isUpdate ? undefined : clearState}
                                autoFocus={autoFocus}
                            />
                        </Box>
                        <Box
                            mt={1}
                            display="flex"
                            justifyContent="flex-end"
                        >
                            {
                                onClose
                                && (
                                    <Button variant="outlined" color="buttonContrast" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                )
                            }
                            <DefaultButton
                                sx={{ ml: 1 }}
                                variant="outlined"
                                color="primary"
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
