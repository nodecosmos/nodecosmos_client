/* mui */
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
/* nodecosmos */
import { setCurrentToolbar, setSubtitle } from '../../features/app/appSlice';
import { SIDEBAR_WIDTH } from '../../features/app/constants';
import Sidebar from '../../features/nodes/components/sidebar/Sidebar';
import { showNode } from '../../features/nodes/nodes.thunks';

export default function NodeShow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const nodeTitle = useSelector((state) => state.nodes.byId[id]?.title);

  if (!id) {
    navigate('/404');
  }

  useEffect(() => {
    dispatch(showNode(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setCurrentToolbar('NodeShowToolbar'));
    dispatch(setSubtitle(nodeTitle));

    return () => {
      dispatch(setSubtitle(null));
    };
  }, [dispatch, nodeTitle]);

  if (nodeTitle === undefined) return null;

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
        <Outlet />
      </Box>
    </Box>
  );
}
