import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { selectNodeAttribute, selectPersistentId, selectSelectedNodeId } from '../../../nodes.selectors';
import extractTextFromHtml from '../../../../../common/extractTextFromHtml';
import { updateNodeState } from '../../../nodesSlice';
import { getNodeDescriptionBase64, updateNodeDescription } from '../../../nodes.thunks';
import Loader from '../../../../../common/components/Loader';

const RemirrorEditor = React.lazy(
  () => import('../../../../../common/components/remirror/RemirrorEditor'),
);

export default function NodePaneDescriptionEditor() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const isTemp = useSelector(selectNodeAttribute(selectedNodeId, 'isTemp'));
  const persistentRootId = useSelector(selectNodeAttribute(selectedNodeId, 'persistentRootId'));
  const persistentId = useSelector(selectPersistentId(selectedNodeId));

  const dispatch = useDispatch();
  const handleChangeTimeout = React.useRef(null);
  const descriptionMarkdown = useSelector(selectNodeAttribute(persistentId, 'descriptionMarkdown'));
  const descriptionBase64 = useSelector(selectNodeAttribute(persistentId, 'descriptionBase64'));

  const handleChange = (remirrorHelpers, uint8ArrayState) => {
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
        descriptionBase64: uint8ArrayState,
      }));
    }, 1000);
  };

  const [base64Fetched, setBase64Fetched] = React.useState(false);

  useEffect(() => {
    if (persistentId && persistentRootId) {
      dispatch(getNodeDescriptionBase64({
        rootId: persistentRootId,
        id: persistentId,
      })).then(() => {
        setBase64Fetched(true);
      });
    }
  }, [dispatch, persistentId, persistentRootId]);

  if (!!descriptionMarkdown && !base64Fetched) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <Box height={1}>
        <RemirrorEditor
          markdown={descriptionMarkdown || ''}
          onChange={handleChange}
          wsRoomId={persistentId}
          wsAuthNodeId={persistentId}
          base64={descriptionBase64}
          isRealTime
        />
      </Box>
    </Suspense>
  );
}
