import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import md from 'markdown-it';
import { selectSelectedWorkflowDiagramObject } from '../../../../workflows/workflows.selectors';
import { selectInputOutputById, selectIOAttribute } from '../../../inputOutput.selectors';
import { updateIoDescription } from '../../../inputOutput.thunks';
import { updateIOState } from '../../../inputOutputsSlice';
/* nodecosmos */

const CustomCodeMirror = React.lazy(() => import('../../../../../common/components/CustomCodeMirror'));

const loading = (
  <Box display="flex" alignItems="center" justifyContent="center" mb={8}>
    <CircularProgress
      size={100}
      sx={{
        mt: {
          xs: 6,
          sm: 7,
        },
        color: 'background.4',
      }}
    />
  </Box>
);

export default function IOPaneMarkdownEditor() {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);
  const { id } = selectedWorkflowDiagramObject;

  const dispatch = useDispatch();
  const handleChangeTimeout = React.useRef(null);
  const descriptionMarkdown = useSelector(selectIOAttribute(selectedWorkflowDiagramObject.id, 'descriptionMarkdown'));
  const { nodeId, workflowId } = useSelector(selectInputOutputById(id));

  const handleChange = (value) => {
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

      dispatch(updateIoDescription({
        id,
        nodeId,
        workflowId,
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
