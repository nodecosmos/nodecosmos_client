import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedWorkflowDiagramObject } from '../../../../workflows/workflows.selectors';
import { selectInputOutputById } from '../../../inputOutputs.selectors';
import { updateIODescription } from '../../../inputOutputs.thunks';
import { updateIOState } from '../../../inputOutputsSlice';
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

export default function IOPaneWysiwygEditor() {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);
  const { id } = selectedWorkflowDiagramObject;

  const dispatch = useDispatch();
  const handleChangeTimeout = React.useRef(null);
  const {
    originalId, nodeId, workflowId, descriptionMarkdown,
  } = useSelector(selectInputOutputById(id));

  const handleChange = (remirrorHelpers) => {
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
        id,
        originalId,
        nodeId,
        workflowId,
        description: descriptionHtml,
        descriptionMarkdown: markdown,
      }));
    }, 500);
  };

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
