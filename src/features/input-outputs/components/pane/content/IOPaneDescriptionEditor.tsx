import { NodecosmosDispatch } from '../../../../../store';
import { selectSelectedWorkflowObject } from '../../../../workflows/selectors';
import { WorkflowDiagramObject } from '../../../../workflows/types';
import { selectInputOutputById, selectInputOutputPrimaryKey } from '../../../inputOutputs.selectors';
import { updateIODescription } from '../../../inputOutputs.thunks';
import { updateIOState } from '../../../inputOutputsSlice';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { HelpersFromExtensions } from '@remirror/core';
import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';
/* nodecosmos */

const RemirrorEditor = React.lazy(() => import('../../../../../common/components/remirror/RemirrorEditor'));

const loading = (
    <Box display="flex" alignItems="center" justifyContent="center" mb={8}>
        <CircularProgress
            size={100}
            sx={{
                mt: {
                    xs: 6,
                    sm: 7,
                },
                color: 'background.3',
            }}
        />
    </Box>
);

export default function IOPaneDescriptionEditor() {
    const { id } = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;
    const dispatch: NodecosmosDispatch = useDispatch();

    const handleChangeTimeout = React.useRef<number| null>(null);
    const { descriptionMarkdown, originalId } = useSelector(selectInputOutputById(id));
    const primaryKey = useSelector(selectInputOutputPrimaryKey(id));

    const handleChange = useCallback((remirrorHelpers: HelpersFromExtensions<MarkdownExtension>) => {
        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
        }

        handleChangeTimeout.current = setTimeout(() => {
            const descriptionHtml = remirrorHelpers.getHTML();
            const markdown = remirrorHelpers.getMarkdown();

            dispatch(updateIOState({
                id,
                description: descriptionHtml,
                descriptionMarkdown: markdown,
            }));

            dispatch(updateIODescription({
                ...primaryKey,
                originalId,
                description: descriptionHtml,
                descriptionMarkdown: markdown,
            }));
        }, 500);
    }, [dispatch, id, originalId, primaryKey]);

    return (
        <Suspense fallback={loading}>
            <Box height={1}>
                <RemirrorEditor
                    markdown={descriptionMarkdown || ''}
                    onChange={handleChange}
                />
            </Box>
        </Suspense>
    );
}
