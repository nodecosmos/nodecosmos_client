import React, { Suspense, useCallback } from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedWorkflowObject } from '../../../../workflows/workflows.selectors';
import { selectFlow } from '../../../flows.selectors';
import { updateFlowState } from '../../../flowsSlice';
import { updateFlowDescription } from '../../../flows.thunks';
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

export default function FlowPaneWysiwygEditor() {
    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject);
    const { id, workflowId } = selectedWorkflowDiagramObject;

    const dispatch = useDispatch();
    const handleChangeTimeout = React.useRef(null);
    const { nodeId, descriptionMarkdown } = useSelector(selectFlow(workflowId, id));

    const handleChange = useCallback((remirrorHelpers) => {
        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
        }

        handleChangeTimeout.current = setTimeout(() => {
            const descriptionHtml = remirrorHelpers.getHTML();
            const markdown = remirrorHelpers.getMarkdown();

            dispatch(updateFlowState({
                id,
                workflowId,
                description: descriptionHtml,
                descriptionMarkdown: markdown,
            }));

            dispatch(updateFlowDescription({
                id,
                nodeId,
                workflowId,
                description: descriptionHtml,
                descriptionMarkdown: markdown,
            }));
        }, 500);
    }, [dispatch, id, nodeId, workflowId]);

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
