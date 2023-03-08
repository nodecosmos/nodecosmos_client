/* mui */
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
/* nodecosmos */
import { SIDEBAR_WIDTH } from '../../features/app/constants';
import Sidebar from '../../features/nodes/components/sidebar/Sidebar';
import { selectNodeAttribute } from '../../features/nodes/nodes.selectors';
import { showNode } from '../../features/nodes/nodes.thunks';

export default function NodeShow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const nodeTitle = useSelector(selectNodeAttribute(id, 'title'));

  if (!id) {
    navigate('/404');
  }

  useEffect(() => {
    dispatch(showNode(id));
  }, [dispatch, id]);

  if (!nodeTitle) return null;

  return (
    <Box height={1} display="flex">
      <Box
        width={SIDEBAR_WIDTH}
        borderRight={1}
        borderColor="borders.1"
        backgroundColor="background.sidebar"
      >
        <Sidebar id={id} />
      </Box>
      <Box width={`calc(100% - ${SIDEBAR_WIDTH}px)`}>
        <Outlet />
      </Box>
    </Box>
  );
}
