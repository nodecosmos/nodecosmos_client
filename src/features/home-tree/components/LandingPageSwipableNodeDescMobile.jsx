import * as React from 'react';
import { useTheme } from '@mui/material';
import TagRounded from '@mui/icons-material/TagRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import useDrawerHeight from '../hooks/useDrawerHeight';

const EDGE_HEIGHT = 56;

function SwipeableEdgeDrawer() {
  const currentNodeId = useSelector((state) => state.app.currentNodeId);
  const currentNodeTitle = useSelector((state) => state.landingPageNodes[currentNodeId]?.title);
  const currentNodeDescription = useSelector((state) => state.landingPageNodes[currentNodeId]?.description);

  const [height, drawerRef, textContainerRef, textRef, setHeight] = useDrawerHeight(0);

  // check if current node is changed
  React.useEffect(() => {
    setHeight((prevHeight) => (prevHeight > 0 ? textRef.current.clientHeight : 0));
  }, [currentNodeId, setHeight, textRef]);

  const theme = useTheme();
  const border2Color = theme.palette.borders[2];

  return (
    <Box
      border={1}
      borderColor="borders.3"
      boxShadow="top.1"
      backgroundColor="background.2"
      onClick={() => setHeight((prevHeight) => (prevHeight > 0 ? 0 : textRef.current.clientHeight))}
      sx={{
        borderRadius: 1,
        borderTopLeftRadius: 16, // px
        borderTopRightRadius: 16, // px
        overflow: 'hidden',
      }}
    >
      <Box
        ref={drawerRef}
        height={EDGE_HEIGHT}
        borderBottom={1}
        px={3}
        style={{
          borderBottomColor: height > 0 ? border2Color : 'transparent',
        }}
      >
        <Box display="flex" justifyContent="center" pt={1}>
          <Box width={40} height={5} backgroundColor="background.4" borderRadius={0.8} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="start" width={1} mt={1}>
          {currentNodeId && <TagRounded fontSize="medium" sx={{ color: 'text.secondary' }} />}
          <Typography textAlign="left" color="text.secondary" px={1} variant="body2">
            {(currentNodeId && (currentNodeTitle || 'No Title'))
              || 'Select a node from the tree'}
          </Typography>
        </Box>
      </Box>
      <Box
        ref={textContainerRef}
        backgroundColor="background.2"
        sx={{
          overflow: 'hidden',
          transition: 'height 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        }}
        style={{
          height,
        }}
      >
        <Typography
          p={2}
          variant="body1"
          color="text.secondary"
          textAlign={currentNodeDescription ? 'left' : 'center'}
          ref={textRef}
        >
          {currentNodeDescription || (currentNodeId && 'This node has no description yet.') || (
            <Box component="span" fontSize={30} width={1} textAlign="center">
              ¯\_(ツ)_/¯
            </Box>
          )}
        </Typography>
      </Box>
    </Box>
  );
}

export default SwipeableEdgeDrawer;
