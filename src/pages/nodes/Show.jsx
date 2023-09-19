/* mui */
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
/* nodecosmos */
import { SIDEBAR_WIDTH } from '../../features/app/constants';
import Sidebar from '../../features/nodes/components/sidebar/Sidebar';
import { showNode } from '../../features/nodes/nodes.thunks';
import { selectNode } from '../../features/nodes/nodes.selectors';

export default function NodeShow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rootId, id } = useParams();

  const node = useSelector(selectNode(id));

  if (!id) {
    navigate('/404');
  }

  useEffect(() => {
    if (node) {
      return;
    }

    dispatch(showNode({
      rootId,
      id,
    })).then((response) => {
      if (response.error) {
        navigate('/404');
      }
    });
  }, [dispatch, navigate, rootId, id, node]);

  return (
    <Box height={1} display="flex">
      <Box
        width={SIDEBAR_WIDTH}
        borderRight={1}
        borderColor="borders.1"
        zIndex={4}
      >
        <Sidebar />
      </Box>
      <Box width={`calc(100% - ${SIDEBAR_WIDTH}px)`}>
        <Outlet />
      </Box>
    </Box>
  );
}
