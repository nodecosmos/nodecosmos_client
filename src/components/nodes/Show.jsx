import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* mui */
import Box from '@mui/material/Box';
/* micro */
import { setSubtitle, setCurrentToolbar, showNode } from '../../actions';
import Sidebar from './show/Sidebar';
import NodeTab from './show/tabs/NodeTab';
import Tree from './show/tabs/tree/Tree';
import TreeReference from './show/tabs/tree/Tree (just_for_reference)'; // TODO: remove this

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!node) return null;

  return (
    <Box height={1} display="flex">
      <Box width={300} height={1} className="BoxShadowRight BorderRight">
        <Sidebar node={node} />
      </Box>
      <Box height={1} width="calc(100% - 300px)">
        <Route exact path="/nodes/:id"><NodeTab node={node} /></Route>
        <Route path="/nodes/:id/tree"><Tree node={node} /></Route>
        <Route path="/nodes/:id/reference"><TreeReference node={node} /></Route>
      </Box>
    </Box>
  );
}
