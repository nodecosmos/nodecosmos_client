import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setHeaderContent } from '../../../features/app/appSlice';
import { HEADER_HEIGHT } from '../../../features/app/constants';
import NodeDetails from '../../../features/nodes/components/details/NodeDetails';
import TreeContainer from '../../../features/trees/components/TreeContainer';
import Tree from '../../../features/trees/components/Tree';
import TreeToolbar from '../../../features/trees/components/TreeToolbar';

export default function TreeTab() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const treeWidthFromLocalStorage = localStorage.getItem('treeWidth');
  const detailsWidthFromLocalStorage = localStorage.getItem('detailsWidth');

  const [treeWidth, setTreeWidth] = useState(treeWidthFromLocalStorage || '50%');
  const [detailsWidth, setDetailsWidth] = useState(detailsWidthFromLocalStorage || '50%');

  const treeRef = React.useRef(null);
  const detailsRef = React.useRef(null);

  useEffect(() => {
    dispatch(setHeaderContent('NodeBreadcrumbs'));

    return () => {
      dispatch(setHeaderContent(''));
    };
  }, [dispatch]);

  // resize the tree and details panes
  const handleResize = (e) => {
    e.preventDefault();
    const startX = e.pageX;
    const startTreeWidth = treeRef.current.offsetWidth;
    const startDetailsWidth = detailsRef.current.offsetWidth;

    const handleMouseMove = (e2) => {
      const dx = e2.pageX - startX;
      const newTreeWidth = startTreeWidth + dx;
      const newDetailsWidth = startDetailsWidth - dx;

      let newTreeWidthPercent = (newTreeWidth / treeRef.current.parentNode.offsetWidth) * 100;
      let newDetailsWidthPercent = (newDetailsWidth / detailsRef.current.parentNode.offsetWidth) * 100;

      if (newTreeWidthPercent < 20) {
        newTreeWidthPercent = 20;
        newDetailsWidthPercent = 80;
      } else if (newTreeWidthPercent > 80) {
        newTreeWidthPercent = 80;
        newDetailsWidthPercent = 20;
      }

      setTreeWidth(`${newTreeWidthPercent}%`);
      setDetailsWidth(`${newDetailsWidthPercent}%`);

      localStorage.setItem('treeWidth', `${newTreeWidthPercent}%`);
      localStorage.setItem('detailsWidth', `${newDetailsWidthPercent}%`);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <Box display={{ xs: 'block', md: 'flex' }} width={1} height={1} overflow="hidden">
      <Box
        ref={treeRef}
        width={treeWidth}
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
        ref={detailsRef}
        height={1}
        width={detailsWidth}
        display="flex"
      >
        <NodeDetails />
      </Box>
    </Box>
  );
}
