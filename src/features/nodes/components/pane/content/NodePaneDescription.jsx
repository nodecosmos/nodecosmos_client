import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../common/components/Loader';
import DescriptionContainer from '../../../../app/components/DescriptionContainer';
import { selectNodeAttribute, selectSelectedNode, selectSelectedNodeId } from '../../../nodes.selectors';
import { getNodeDescription } from '../../../nodes.thunks';

export default function NodePaneDescription() {
  const selectedNodeId = useSelector(selectSelectedNodeId);
  const persistentId = useSelector(selectNodeAttribute(selectedNodeId, 'persistentId'));
  const persistentRootId = useSelector(selectNodeAttribute(selectedNodeId, 'persistentRootId'));

  const { title, description } = useSelector(selectSelectedNode);

  const [loading, setLoading] = React.useState(selectedNodeId && !description);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedNodeId) {
      dispatch(getNodeDescription({
        rootId: persistentRootId,
        id: persistentId,
      })).then(() => setLoading(false));
    }
  }, [dispatch, selectedNodeId, persistentId, persistentRootId]);

  if (!selectedNodeId) return null;

  if (loading) {
    return <Loader />;
  }

  const nodeNotSelectedContent = (
    <Typography color="text.secondary" align="center" fontSize={30}>
      ¯\_(ツ)_/¯
    </Typography>
  );

  const nodeHasNoDescriptionContent = (
    <Typography color="text.secondary">
      This node has no description yet.
    </Typography>
  );

  const blankDescription = (selectedNodeId && nodeHasNoDescriptionContent) || nodeNotSelectedContent;

  return (
    <DescriptionContainer>
      <Box
        component="h1"
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {title && '# '}
        {title}
      </Box>
      {(description && <Box pb={2} dangerouslySetInnerHTML={{ __html: description }} />) || blankDescription}
    </DescriptionContainer>
  );
}
