import React, { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* mui */
import Box from '@mui/material/Box';
/* nodecosmos */
import { setCurrentToolbar, setSubtitle } from '../../features/app/appSlice';
import Sidebar from '../../features/nodes/components/sidebar/Sidebar';
import { showNode, terminateNewNode } from '../../features/nodes/nodeSlice';
import NodeTab from './show/NodeTab';
import TreeTab from './show/TreeTab';

export default function NodeShow() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const node = useSelector((state) => state.nodes[id]);

  useEffect(() => {
    dispatch(showNode(id));
    dispatch(setCurrentToolbar('NodeShowToolbar'));

    return () => {
      dispatch(setSubtitle(null));
      dispatch(terminateNewNode());
    };
  }, [dispatch, id]);

  if (!node) return null;

  return (
    <Box className="MaxHeightWithoutHeader" display="flex">
      <Box width={300} height={1} className="BoxShadowRight BorderRight">
        <Sidebar id={id} />
      </Box>
      <Box width="calc(100% - 300px)">
        <Routes>
          <Route path="/" element={<NodeTab id={id} />} />
          <Route path="tree" element={<TreeTab id={id} />} />
        </Routes>
      </Box>
    </Box>
  );
}
