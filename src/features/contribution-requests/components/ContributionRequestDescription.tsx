import Loader from '../../../common/components/Loader';
import { EnabledExtensions } from '../../../common/hooks/editor/useExtensions';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useDebounce from '../../../common/hooks/useDebounce';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import useAuthorizeBranch from '../../branch/hooks/useAuthorizeBranch';
import { selectContributionRequest } from '../contributionRequests.selectors';
import { updateContributionRequestDescription } from '../contributionRequests.thunks';
import {
    Box, Button, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { HelpersFromExtensions } from '@remirror/core';
import React, {
    Suspense, useCallback, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MarkdownExtension } from 'remirror/extensions';

const RemirrorEditor = React.lazy(() => import('../../../common/components/editor/RemirrorEditor'));

const {
    Bold, Italic, Strike, Markdown, Blockquote, CodeBlock, Link: LinkExt, OrderedList, Image,
} = EnabledExtensions;

const EXTENSIONS = [
    Bold, Italic, Strike, Markdown, Blockquote, CodeBlock, LinkExt, OrderedList, Image,
];

export default function ContributionRequestDescription() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { id: nodeId, branchId: id } = useParams();
    const [editorOpen, openEditor, closeEditor] = useBooleanStateValue();
    const { description } = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const authorized = useAuthorizeBranch();
    // const mainThreadCommentIds = useSelector(selectThreadCommentIds(id as UUID));
    // const commentCount = mainThreadCommentIds?.length;

    const updateDescription = useCallback((helpers: HelpersFromExtensions<MarkdownExtension>) => {
        const description = helpers.getHTML();

        dispatch(updateContributionRequestDescription({
            nodeId: nodeId as UUID,
            id: id as UUID,
            description,
        })).finally(() => {
            unsetLoading();
        });
    }, [dispatch, id, nodeId, unsetLoading]);

    const [handleChangeDebounced] = useDebounce(updateDescription);

    const handleChange = useCallback((helpers: HelpersFromExtensions<MarkdownExtension>) => {
        setLoading();

        return handleChangeDebounced(helpers);
    }, [handleChangeDebounced, setLoading]);
    const descriptionEmpty = !description || description === '<p></p>';
    const innerHtml = useMemo(() => ({ __html: description as TrustedHTML }), [description]);

    return (
        <Box width={1}>
            {(!editorOpen || !authorized)
                && (
                    <Box mx={2}>
                        <Box
                            px={2}
                            py={2}
                            my={1}
                            maxWidth={780}
                            width={1}
                            border={1}
                            borderRadius={2}
                            borderColor="transparent"
                            onClick={openEditor}
                            sx={{
                                transition: 'border-color 0.2s',
                                '&:hover': { borderColor: 'borders.5' },
                            }}
                        >
                            {
                                loading && (
                                    <Box height={20} width={20} mb={2}>
                                        <Loader color="primary.main" size={20} />
                                    </Box>
                                )
                            }
                            {
                                descriptionEmpty && authorized && (
                                    <Typography color="text.tertiary" variant="body2" py={2}>
                                        Click here to add the contribution request description
                                    </Typography>
                                )
                            }
                            {
                                descriptionEmpty && !authorized && (
                                    <Typography color="text.tertiary" variant="body2" py={2}>
                                        No description provided
                                    </Typography>
                                )
                            }
                            {
                                !descriptionEmpty && (
                                    <div
                                        className="DescriptionHTML"
                                        dangerouslySetInnerHTML={innerHtml} />
                                )
                            }

                        </Box>
                    </Box>
                )
            }
            {
                (editorOpen && authorized) && (
                    <Suspense fallback={<Loader />}>
                        <Box
                            p={1}
                            my={1}
                            maxWidth={780}
                            width={1}
                            borderColor="borders.3"
                            onClick={openEditor}
                        >
                            <Box
                                width={1}
                                border={1}
                                borderColor="borders.1"
                                borderRadius={2}
                                overflow="hidden"
                            >
                                <RemirrorEditor
                                    markdown={description ?? ''}
                                    onChange={handleChange}
                                    onBlur={closeEditor}
                                    enabledExtensions={EXTENSIONS}
                                    editorBackgroundColor="background.5"
                                    p={1}
                                    editorOutline={1}
                                    editorFocusBorderColor="borders.5"
                                    fileObjectId={id}
                                />
                                <Box
                                    mb={1}
                                    mr={1}
                                    display="flex"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    {loading && <CircularProgress className="mr-1" size={20} />}
                                    <Button variant="outlined" color="primary" onClick={closeEditor}>
                                        Close
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Suspense>
                )
            }
        </Box>
    );
}
