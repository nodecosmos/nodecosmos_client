import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import md from 'markdown-it';
import { selectSelectedWorkflowObject } from '../../../../workflows/workflows.selectors';
import { selectInputOutputById, selectInputOutputPrimaryKey } from '../../../inputOutputs.selectors';
import { updateIODescription } from '../../../inputOutputs.thunks';
import { updateIOState } from '../../../inputOutputsSlice';
import { WorkflowDiagramObject } from '../../../../workflows/types';
import { NodecosmosDispatch } from '../../../../../store';
/* nodecosmos */

const CustomCodeMirror = React.lazy(() => import('../../../../../common/components/codemirror/CodeMirrorEditor'));

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

export default function IOPaneMarkdownEditor() {
    const { id } = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;
    const dispatch: NodecosmosDispatch = useDispatch();
    const primaryKey = useSelector(selectInputOutputPrimaryKey(id));

    const handleChangeTimeout = React.useRef<number | null>(null);
    const { descriptionMarkdown } = useSelector(selectInputOutputById(id));

    const handleChange = (value: string) => {
        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
        }

        handleChangeTimeout.current = setTimeout(() => {
            const descriptionHtml = md().render(value);

            dispatch(updateIOState({
                id,
                description: descriptionHtml,
                descriptionMarkdown: value,
            }));

            dispatch(updateIODescription({
                ...primaryKey,
                description: descriptionHtml,
                descriptionMarkdown: value,
            }));
        }, 500);
    };

    return (
        <Suspense fallback={loading}>
            <Box height={1}>
                <CustomCodeMirror value={descriptionMarkdown || ''} onChange={handleChange} />
            </Box>
        </Suspense>
    );
}
