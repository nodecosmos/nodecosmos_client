import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* mui */
import Box from '@mui/material/Box';
/* nodecosmos */
import { setCurrentToolbar, setSubtitle } from '../../features/app/appSlice';
import Sidebar from '../../features/nodes/components/Sidebar';
import { showNode } from '../../features/nodes/nodeSlice';
import NodeTab from './show-pages/NodeTab';
import Tree from '../../features/nodes/components/tree/Tree';

export default function NodeShow() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const node = useSelector((state) => state.nodes[id]);

  useEffect(() => {
    dispatch(showNode(id));
    dispatch(setCurrentToolbar('NodeShowToolbar'));

    return () => {
      dispatch(setSubtitle(null));
    };
  }, [dispatch, id]);

  if (!node) return null;

  return (
    <Box className="MaxHeightWithoutHeader" display="flex">
      <Box width={300} height={1} className="BoxShadowRight BorderRight">
        <Sidebar id={id} />
      </Box>
      <Box width="calc(100% - 300px)">
        <Route exact path="/nodes/:id"><NodeTab id={id} /></Route>
        <Route path="/nodes/:id/tree"><Tree id={id} /></Route>
      </Box>
    </Box>
  );
}
