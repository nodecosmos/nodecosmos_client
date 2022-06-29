import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* mui */
import Box from '@mui/material/Box';
/* nodecosmos */
import { setSubtitle, setCurrentToolbar, showNode } from '../../actions';
import Sidebar from '../../features/nodes/components/Sidebar';
import NodeTab from './show-pages/NodeTab';
import Tree from '../../features/nodes/components/tree/Tree';

export default function NodeShow() {
  const nodes = useSelector((state) => state.nodes);
  const dispatch = useDispatch();

  const { id } = useParams();
  const node = nodes[id];

  useEffect(() => {
    if (node && node.fetched) {
      dispatch(setSubtitle(node.title));
    } else {
      dispatch(showNode(id));
    }

    dispatch(setCurrentToolbar('NodeShowToolbar'));

    return () => {
      dispatch(setSubtitle(null));
    };
  }, [id, node, dispatch]);

  if (!node) return null;

  return (
    <Box className="MaxHeightWithoutHeader" display="flex">
      <Box width={300} height={1} className="BoxShadowRight BorderRight">
        <Sidebar node={node} />
      </Box>
      <Box width="calc(100% - 300px)">
        <Route exact path="/nodes/:id"><NodeTab node={node} /></Route>
        <Route path="/nodes/:id/tree"><Tree node={node} /></Route>
      </Box>
    </Box>
  );
}
