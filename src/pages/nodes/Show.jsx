/* mui */
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
/* nodecosmos */
import { SIDEBAR_WIDTH } from '../../features/app/constants';
import Sidebar from '../../features/nodes/components/sidebar/Sidebar';
import { showNode } from '../../features/nodes/nodes.thunks';

export default function NodeShow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate('/404');
  }

  useEffect(() => {
    dispatch(showNode(id));
  }, [dispatch, id]);

  return (
    <Box height={1} display="flex">
      <Box
        width={SIDEBAR_WIDTH}
        borderRight={1}
        borderColor="borders.1"
      >
        <Sidebar id={id} />
      </Box>
      <Box width={`calc(100% - ${SIDEBAR_WIDTH}px)`}>
        <Outlet />
      </Box>
    </Box>
  );
}
