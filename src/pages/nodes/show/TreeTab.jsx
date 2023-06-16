import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setHeaderContent } from '../../../features/app/appSlice';
import { HEADER_HEIGHT } from '../../../features/app/constants';
import usePaneResizable from '../../../features/app/hooks/usePaneResizable';
import NodePane from '../../../features/nodes/components/pane/NodePane';
import TreeContainer from '../../../features/trees/components/TreeContainer';
import Tree from '../../../features/trees/components/Tree';
import TreeToolbar from '../../../features/trees/components/TreeToolbar';

export default function TreeTab() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const treeWidthFromLocalStorage = localStorage.getItem('treeWidth');
  const nodePaneWidthFromLocalStorage = localStorage.getItem('nodePaneWidth');

  const paneARef = React.useRef(null);
  const paneBRef = React.useRef(null);

  const {
    paneAWidth,
    paneBWidth,
    handleResize,
  } = usePaneResizable({
    aRef: paneARef,
    bRef: paneBRef,
    initialWidthA: treeWidthFromLocalStorage,
    initialWidthB: nodePaneWidthFromLocalStorage,
  });

  useEffect(() => {
    localStorage.setItem('treeWidth', paneAWidth);
    localStorage.setItem('nodePaneWidth', paneBWidth);
  }, [paneAWidth, paneBWidth]);

  useEffect(() => {
    dispatch(setHeaderContent('NodeBreadcrumbs'));

    return () => {
      dispatch(setHeaderContent(''));
    };
  }, [dispatch]);

  // resize the tree and pane panes

  return (
    <Box display={{ xs: 'block', md: 'flex' }} width={1} height={1} overflow="hidden">
      <Box
        ref={paneARef}
        width={paneAWidth}
        height={1}
        display="flex"
      >
        <TreeContainer>
          <TreeToolbar rootNodeId={id} />
          <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
            <Tree rootNodeId={id} />
          </Box>
        </TreeContainer>
        <Box
          onMouseDown={handleResize}
          width="8px"
          backgroundColor="transparent"
          height={1}
          ml={-1}
          borderRight={1}
          borderColor="borders.4"
          sx={{
            position: 'relative',
            '&:hover': {
              borderRight: 1,
              borderColor: 'borders.5',
              cursor: 'col-resize',
            },
          }}
        />
      </Box>
      <Box
        ref={paneBRef}
        height={1}
        width={paneBWidth}
        display="flex"
      >
        <NodePane />
      </Box>
    </Box>
  );
}
