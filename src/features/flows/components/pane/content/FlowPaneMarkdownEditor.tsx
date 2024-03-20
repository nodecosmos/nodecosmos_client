import { NodecosmosDispatch } from '../../../../../store';
import { selectSelectedWorkflowObject } from '../../../../workflows/workflow.selectors';
import { WorkflowDiagramObject } from '../../../../workflows/workflow.types';
import { selectFlow, selectFlowPrimaryKey } from '../../../flows.selectors';
import { updateFlowDescription } from '../../../flows.thunks';
import { updateFlowState } from '../../../flowsSlice';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// @ts-expect-error: No types available
import md from 'markdown-it';
import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */

const CodeMirrorEditor = React.lazy(() => import('../../../../../common/components/codemirror/CodeMirrorEditor'));

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

export default function FlowPaneMarkdownEditor() {
    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject);
    const { branchId, id } = selectedWorkflowDiagramObject as WorkflowDiagramObject;

    const dispatch: NodecosmosDispatch = useDispatch();
    const handleChangeTimeout = React.useRef<number | null>(null);
    const { descriptionMarkdown } = useSelector(selectFlow(branchId, id));
    const flowPrimaryKey = useSelector(selectFlowPrimaryKey(branchId, id));

    const handleChange = useCallback((value: string) => {
        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
        }

        handleChangeTimeout.current = setTimeout(() => {
            const descriptionHtml = md().render(value);

            dispatch(updateFlowState({
                ...flowPrimaryKey,
                description: descriptionHtml,
                descriptionMarkdown: value,
            }));

            dispatch(updateFlowDescription({
                ...flowPrimaryKey,
                description: descriptionHtml,
                descriptionMarkdown: value,
            }));
        }, 500);
    }, [dispatch, flowPrimaryKey]);

    return (
        <Suspense fallback={loading}>
            <Box height={1}>
                <CodeMirrorEditor value={descriptionMarkdown || ''} onChange={handleChange} />
            </Box>
        </Suspense>
    );
}
