import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HEADER_HEIGHT } from '../../../features/app/constants';
import usePaneResizable from '../../../common/hooks/usePaneResizable';
import NodePane from '../../../features/nodes/components/pane/NodePane';
import TreeContainer from '../../../features/trees/components/TreeContainer';
import Tree from '../../../features/trees/components/Tree';
import TreeToolbar from '../../../features/trees/components/TreeToolbar';
import OverlayLoader from '../../../common/components/OverlayLoader';
import { selectIsTreeLoading } from '../../../features/trees/trees.selectors';
import Alert from '../../../common/components/Alert';
import { TREES_TYPES } from '../../../features/trees/trees.constants';

export default function ContributionRequestTree() {
  const { id } = useParams();
  const theme = useTheme();

  const isTreeLoading = useSelector(selectIsTreeLoading);

  const treeWidthFromLocalStorage = localStorage.getItem('treeWidth');
  const nodePaneWidthFromLocalStorage = localStorage.getItem('nodePaneWidth');

  const paneARef = React.useRef(null);
  const paneBRef = React.useRef(null);
  const [resizerHovered, setResizerHovered] = React.useState(false);

  const {
    paneAWidth,
    paneBWidth,
    handleResize,
    resizeInProgress,
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
    if (!resizeInProgress) {
      setResizerHovered(false);
    }
  }, [resizeInProgress]);

  return (
    <Box
      display={{ xs: 'block', md: 'flex' }}
      width={1}
      height={1}
      overflow="hidden"
      style={{
        cursor: resizeInProgress ? 'col-resize' : 'auto',
      }}
    >
      <Box
        ref={paneARef}
        width={paneAWidth}
        height={1}
        display="flex"
      >
        <TreeContainer>
          <TreeToolbar rootNodeId={id} />
          <Alert />
          <Box position="relative" height={`calc(100% - ${HEADER_HEIGHT})`}>
            {isTreeLoading && <OverlayLoader />}
            <Tree rootNodeId={id} type={TREES_TYPES.contributionRequest} />
          </Box>
        </TreeContainer>
        <Box
          onMouseDown={handleResize}
          width="4px"
          backgroundColor="transparent"
          height={1}
          ml={-0.5}
          borderRight={1}
          borderColor="transparent"
          onMouseEnter={() => setResizerHovered(true)}
          onMouseLeave={() => {
            if (!resizeInProgress) {
              setResizerHovered(false);
            }
          }}
          sx={{
            position: 'relative',
            '&:hover': {
              cursor: 'col-resize',
            },
          }}
        />
      </Box>
      <Box
        backgroundColor="background.5"
        ref={paneBRef}
        height={1}
        width={paneBWidth}
        overflow="hidden"
        boxShadow="left.2"
        borderLeft={1}
        style={{
          borderLeftColor: resizerHovered ? theme.palette.borders['5'] : theme.palette.borders['3'],
        }}
      >
        <NodePane />
      </Box>
    </Box>
  );
}
