import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setHeaderContent } from '../../../features/app/appSlice';
import NodeDetails from '../../../features/nodes/components/details/NodeDetails';
import TreeContainer from '../../../features/trees/components/TreeContainer';
import Tree from '../../../features/trees/components/Tree';
import TreeToolbar from '../../../features/trees/components/TreeToolbar';

export default function TreeTab() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderContent('NodeBreadcrumbs'));

    return () => {
      dispatch(setHeaderContent(''));
    };
  }, [dispatch]);

  return (
    <Box display={{ xs: 'block', md: 'flex' }} width={1} height={1}>
      <Box
        width="50%"
        height="100%"
      >
        <TreeContainer>
          <TreeToolbar rootNodeId={id} />
          <Tree rootNodeId={id} />
        </TreeContainer>
      </Box>
      <Box
        width={{
          xs: 1,
          md: '50%',
        }}
        // position={{
        //   xs: 'sticky',
        //   md: 'static',
        // }}
        // bottom={{
        //   xs: 0,
        //   md: 'auto',
        // }}
      >
        <NodeDetails />
      </Box>
    </Box>
  );
}
