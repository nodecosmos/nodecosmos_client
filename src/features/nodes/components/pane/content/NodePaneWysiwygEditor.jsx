import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { selectNodeAttribute, selectPersistentId, selectSelectedNodeId } from '../../../nodes.selectors';
import extractTextFromHtml from '../../../../../common/extractTextFromHtml';
import { updateNodeState } from '../../../nodesSlice';
import { updateNodeDescription } from '../../../nodes.thunks';
import Loader from '../../../../../common/components/Loader';

const RemirrorWysiwygEditor = React.lazy(() => import('../../../../../common/components/RemirrorWysiwygEditor'));

export default function NodePaneWysiwygEditor() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const isTemp = useSelector(selectNodeAttribute(selectedNodeId, 'isTemp'));
  const persistentRootId = useSelector(selectNodeAttribute(selectedNodeId, 'persistentRootId'));
  const persistentId = useSelector(selectPersistentId(selectedNodeId));

  const dispatch = useDispatch();
  const handleChangeTimeout = React.useRef(null);
  const descriptionMarkdown = useSelector(selectNodeAttribute(selectedNodeId, 'descriptionMarkdown'));

  const handleChange = (remirrorHelpers) => {
    if (isTemp) return;

    if (handleChangeTimeout.current) {
      clearTimeout(handleChangeTimeout.current);
    }

    handleChangeTimeout.current = setTimeout(() => {
      const descriptionHtml = remirrorHelpers.getHTML();
      const shortDescription = extractTextFromHtml(descriptionHtml);
      const markdown = remirrorHelpers.getMarkdown();

      dispatch(updateNodeState({
        id: selectedNodeId,
        description: descriptionHtml,
        shortDescription,
        descriptionMarkdown: markdown,
      }));

      dispatch(updateNodeDescription({
        persistentRootId,
        persistentId,
        description: descriptionHtml,
        shortDescription,
        descriptionMarkdown: markdown,
      }));
    }, 500);
  };

  return (
    <Suspense fallback={<Loader />}>
      <Box height={1}>
        <RemirrorWysiwygEditor
          key={persistentId}
          markdown={descriptionMarkdown || ''}
          onChange={handleChange}
        />
      </Box>
    </Suspense>
  );
}
