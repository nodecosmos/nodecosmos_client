import { NodecosmosDispatch } from '../../../../../store';
import { selectSelectedWorkflowObject } from '../../../../workflows/workflow.selectors';
import { WorkflowDiagramObject } from '../../../../workflows/workflow.types';
import { selectFlow, selectFlowPrimaryKey } from '../../../flows.selectors';
import { updateFlowDescription } from '../../../flows.thunks';
import { updateFlowState } from '../../../flowsSlice';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { HelpersFromExtensions } from '@remirror/core';
import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';
/* nodecosmos */

const RemirrorEditor = React.lazy(() => import('../../../../../common/components/editor/RemirrorEditor'));

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

export default function FlowPaneDescriptionEditor() {
    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject);
    const { branchId, id } = selectedWorkflowDiagramObject as WorkflowDiagramObject;

    const dispatch: NodecosmosDispatch = useDispatch();
    const handleChangeTimeout = React.useRef<number | null>(null);
    const { descriptionMarkdown } = useSelector(selectFlow(branchId, id));
    const flowPrimaryKey = useSelector(selectFlowPrimaryKey(branchId, id));

    const handleChange = useCallback((remirrorHelpers: HelpersFromExtensions<MarkdownExtension>) => {
        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
        }

        handleChangeTimeout.current = setTimeout(() => {
            const descriptionHtml = remirrorHelpers.getHTML();
            const markdown = remirrorHelpers.getMarkdown();

            dispatch(updateFlowState({
                id,
                description: descriptionHtml,
                descriptionMarkdown: markdown,
            }));

            dispatch(updateFlowDescription({
                ...flowPrimaryKey,
                description: descriptionHtml,
                descriptionMarkdown: markdown,
            }));
        }, 500);
    }, [dispatch, flowPrimaryKey, id]);

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
