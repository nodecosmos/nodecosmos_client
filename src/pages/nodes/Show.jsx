import React, { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* mui */
import Box from '@mui/material/Box';
/* nodecosmos */
import { setCurrentToolbar, setSubtitle } from '../../features/app/appSlice';
import { SIDEBAR_WIDTH } from '../../features/app/constants';
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
    dispatch(setSubtitle(node?.title));

    return () => {
      dispatch(setSubtitle(null));
      dispatch(terminateNewNode());
    };
  }, [dispatch, id, node?.title]);

  if (!node) return null;

  return (
    <Box height={1} display="flex">
      <Box
        width={SIDEBAR_WIDTH}
        height={1}
        borderRight={1}
        borderColor="borders.box.md"
        boxShadow="boxBorder.right.md"
      >
        <Sidebar id={id} />
      </Box>
      <Box width={`calc(100% - ${SIDEBAR_WIDTH}px)`}>
        <Routes>
          <Route path="/" element={<NodeTab id={id} />} />
          <Route path="tree" element={<TreeTab id={id} />} />
        </Routes>
      </Box>
    </Box>
  );
}
