import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import md from 'markdown-it';
/* nodecosmos */
import {
  selectNodeAttribute,
  selectPersistentId,
  selectSelectedNodeId,
} from '../../../nodes.selectors';
import { updateNodeDescription } from '../../../nodes.thunks';
import { updateNodeState } from '../../../nodesSlice';
import extractTextFromHtml from '../../../../../common/extractTextFromHtml';

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
        color: 'background.3',
      }}
    />
  </Box>
);

export default function NodePaneMarkdownEditor() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const isTemp = useSelector(selectNodeAttribute(selectedNodeId, 'isTemp'));
  const persistentRootId = useSelector(selectNodeAttribute(selectedNodeId, 'persistentRootId'));
  const persistentId = useSelector(selectPersistentId(selectedNodeId));

  const dispatch = useDispatch();
  const handleChangeTimeout = React.useRef(null);
  const descriptionMarkdown = useSelector(selectNodeAttribute(selectedNodeId, 'descriptionMarkdown'));

  const handleChange = (value) => {
    if (isTemp) return;

    if (handleChangeTimeout.current) {
      clearTimeout(handleChangeTimeout.current);
    }

    handleChangeTimeout.current = setTimeout(() => {
      const descriptionHtml = md().render(value);
      const shortDescription = extractTextFromHtml(descriptionHtml);

      dispatch(updateNodeState({
        id: selectedNodeId,
        description: descriptionHtml,
        shortDescription,
        descriptionMarkdown: value,
      }));
      dispatch(updateNodeDescription({
        persistentRootId,
        persistentId,
        description: descriptionHtml,
        shortDescription,
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
