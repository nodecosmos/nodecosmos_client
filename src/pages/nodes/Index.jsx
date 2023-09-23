import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setHeaderContent } from '../../features/app/appSlice';
import { SIDEBAR_WIDTH } from '../../features/app/constants';
import NodeCards from '../../features/nodes/components/NodeCards';
import { indexNodes } from '../../features/nodes/nodes.thunks';

export default function NodeIndex() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderContent('NodeIndexHeader'));
    dispatch(indexNodes());

    return () => {
      dispatch(setHeaderContent(''));
    };
  }, [dispatch]);

  return (
    <Box height={1} display="flex">
      <Box
        width={SIDEBAR_WIDTH}
        borderRight={1}
        height={1}
        borderColor="borders.1"
      />
      <Box height={1} width={`calc(100% - ${SIDEBAR_WIDTH}px)`} overflow="auto" pb={2}>
        <Container maxWidth="md">
          <NodeCards />
        </Container>
      </Box>
    </Box>
  );
}
