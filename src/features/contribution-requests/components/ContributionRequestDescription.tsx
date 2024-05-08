import Loader from '../../../common/components/Loader';
import { EnabledExtensions } from '../../../common/hooks/editor/useExtensions';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useDebounce from '../../../common/hooks/useDebounce';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { selectContributionRequest } from '../contributionRequests.selectors';
import { updateContributionRequestDescription } from '../contributionRequests.thunks';
import { Box, Typography } from '@mui/material';
import { HelpersFromExtensions } from '@remirror/core';
import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MarkdownExtension } from 'remirror/extensions';

const RemirrorEditor = React.lazy(() => import('../../../common/components/editor/RemirrorEditor'));

const {
    Bold, Italic, Strike, Markdown, Blockquote, CodeBlock, Link, OrderedList,
} = EnabledExtensions;

export default function ContributionRequestDescription() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { id: nodeId, branchId: id } = useParams();
    const [editorOpen, openEditor, closeEditor] = useBooleanStateValue();
    const { description } = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();

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

    return (
        <Box width={1}>
            {!editorOpen
                && (
                    <Box
                        width={1}
                        border={1}
                        borderRadius={2}
                        borderColor="transparent"
                        onClick={openEditor}
                        sx={{
                            transition: 'border-color 0.2s',
                            borderColor: 'borders.3',
                            p: 2,
                            '&:hover': { borderColor: 'borders.5' },
                        }}>
                        {loading && <Box height={20} width={20} mb={2}><Loader color="primary.main" size={20} /></Box> }
                        {descriptionEmpty && (
                            <Typography color="text.tertiary" variant="body2">
                                Describe contribution request...
                            </Typography>
                        )}
                        <div
                            className="DescriptionHTML"
                            dangerouslySetInnerHTML={{ __html: description as TrustedHTML }} />

                    </Box>
                )
            }
            {
                editorOpen && (
                    <Suspense fallback={<Loader />}>
                        <Box
                            width={1}
                            border={1}
                            borderColor="borders.1"
                            borderRadius={2}
                            overflow="hidden">
                            <RemirrorEditor
                                markdown={description ?? ''}
                                onChange={handleChange}
                                onBlur={closeEditor}
                                enabledExtensions={[
                                    Bold,
                                    Italic,
                                    Strike,
                                    Markdown,
                                    Blockquote,
                                    CodeBlock,
                                    Link,
                                    OrderedList,
                                ]}
                                editorFocusBorderColor="toolbar.default"
                                p={1}
                            />
                        </Box>
                    </Suspense>
                )
            }
        </Box>
    );
}
