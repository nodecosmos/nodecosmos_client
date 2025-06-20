import DefaultButton from '../../../common/components/buttons/DefaultButton';
import { ContentType } from '../../../common/components/editor/Editor';
import { EditorExtensions } from '../../../common/components/editor/types';
import Loader from '../../../common/components/Loader';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { EMPTY_PARAGRAPH } from '../../descriptions/hooks/useDescriptionEdit';
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
import React, {
    Suspense, useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

const Editor = React.lazy(() => import('../../../common/components/editor/Editor'));

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
    editorBackgroundColor?: string;
    onClose?: (response?: CreateCommentResponse) => void;
    withThreadBlock?: boolean;
    autoFocus?: boolean;
    info?: string;
    url?: string;
};

const {
    Bold, Italic, Strike, Markdown, Blockquote, Code, CodeBlock, Link, OrderedList, Image, File,
} = EditorExtensions;

const ENABLED_EXTENSIONS: EditorExtensions[] = [
    Bold,
    Italic,
    Strike,
    Markdown,
    Blockquote,
    Code,
    CodeBlock,
    Link,
    OrderedList,
    Image,
    File,
];

export default function CommentEditor(props: AddDescriptionCommentProps) {
    const {
        newThread, threadPk = null, onClose, comment, withThreadBlock = false, autoFocus = true, info, url,
        editorBackgroundColor,
    } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const [content, setContent] = React.useState<string>(comment?.content || '');
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const isUpdate = Boolean(comment);
    const [clearState, setClearStateTrigger] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const handleServerError = useHandleServerErrorAlert();
    const editorBg = editorBackgroundColor || (withThreadBlock ? 'backgrounds.1' : 'transparent');

    const clearContent = useCallback(() => {
        setContent('');
        setClearStateTrigger((prev) => !prev);
    }, []);

    const handleChange = useCallback((html: string) => {
        setContent(html);
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
                        url: url ?? window.location.href,
                    },
                };
            } else if (newThread) {
                if (!newThread.title) {
                    dispatch(setAlert({
                        isOpen: true,
                        severity: 'error',
                        message: 'Thread title is required.',
                    }));

                    unsetLoading();

                    return;
                }

                if (!content || content === EMPTY_PARAGRAPH) {
                    dispatch(setAlert({
                        isOpen: true,
                        severity: 'error',
                        message: 'Comment is required.',
                    }));

                    unsetLoading();

                    return;
                }

                payload = {
                    newThread,
                    comment: {
                        content,
                        url: url ?? window.location.href,
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
        threadPk, newThread, handleServerError, clearContent, url,
    ]);

    const handleCancel = useCallback(() => {
        if (onClose) {
            onClose();
        } else {
            clearContent();
        }
    }, [onClose, clearContent]);

    useEffect(() => {
        return () => {
            clearContent();
        };
    }, [clearContent]);

    if (!currentUser) {
        return (
            <Box
                className={`${withThreadBlock ? 'background-1' : 'background-0'}`}
                display="flex"
                width={1}
                gap={1}
                p={2}
                border={withThreadBlock ? 1 : 0}
                borderColor="borders.4"
                fontWeight={700}
                color="texts.secondary"
                alignItems="center"
            >
                <Button
                    variant="outlined"
                    component={RouterLink}
                    to={`/auth/login?${REDIRECT_Q}=${btoa(window.location.href)}`}
                    color="primary"
                >
                        Log in
                </Button>
                    or
                <Button
                    component={RouterLink}
                    to={`/auth/signup?${REDIRECT_Q}=${btoa(window.location.href)}`}
                    variant="outlined"
                    className="LogoButton focused"
                >
                        Sign Up
                </Button>
                    to add a comment.
            </Box>
        );
    }

    let objectId;

    if (comment) {
        objectId = comment.objectId;
    } else if (threadPk) {
        objectId = threadPk.objectId;
    } else {
        objectId = newThread!.objectId;
    }

    return (
        <Box
            borderRadius={0}
            borderBottom={withThreadBlock ? 1 : 0}
            borderColor="borders.4"
            p={withThreadBlock ? 2 : 0}
            sx={{ backgroundColor: withThreadBlock ? 'backgrounds.1' : 'transparent' }}
            boxSizing="border-box">
            <Suspense fallback={<Loader p={4} />}>
                <Box maxWidth={MAX_COMMENT_WIDTH}>
                    <Box
                        fontSize="1.15rem"
                        overflow="hidden"
                        border={1}
                        borderColor="borders.4"
                        borderRadius={1.50}
                        width={1}
                    >
                        <Editor
                            placeholder="Use Markdown to format your comment"
                            showBorder={false}
                            content={comment?.content || ''}
                            contentType={ContentType.HTML}
                            onChange={handleChange}
                            extensions={ENABLED_EXTENSIONS}
                            p={1}
                            toolbarHeight={38}
                            editorBackgroundColor={editorBg}
                            info={info}
                            clearState={isUpdate ? undefined : clearState}
                            autoFocus={autoFocus}
                            fileObjectId={objectId}
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
    );
}
