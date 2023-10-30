import { NodecosmosDispatch } from '../../../../../store';
import { WorkflowDiagramObject } from '../../../../workflows/types';
import { selectSelectedWorkflowObject } from '../../../../workflows/workflows.selectors';
import { selectInputOutputById, selectInputOutputPrimaryKey } from '../../../inputOutputs.selectors';
import { updateIODescription } from '../../../inputOutputs.thunks';
import { updateIOState } from '../../../inputOutputsSlice';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import md from 'markdown-it';
import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const { descriptionMarkdown, originalId } = useSelector(selectInputOutputById(id));

    const handleChange = useCallback((value: string) => {
        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
        }

        handleChangeTimeout.current = setTimeout(() => {
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
                    originalId,
                    description: descriptionHtml,
                    descriptionMarkdown: value,
                }));
            }, 500);
        });
    }, [dispatch, id, originalId, primaryKey]);

    return (
        <Suspense fallback={loading}>
            <Box height={1}>
                <CustomCodeMirror value={descriptionMarkdown || ''} onChange={handleChange} />
            </Box>
        </Suspense>
    );
}
