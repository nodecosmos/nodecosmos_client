import * as React from 'react';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import useDrawerHeight from '../hooks/useDrawerHeight';

const EDGE_HEIGHT = 50;

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
            onClick={() => setHeight((prevHeight) => (prevHeight > 0 ? 0 : textRef.current.clientHeight))}
            sx={{
                borderRadius: 1,
                overflow: 'hidden',
            }}
        >
            <Box
                ref={drawerRef}
                height={EDGE_HEIGHT}
                borderBottom={1}
                px={3}
                backgroundColor="background.7"
                style={{
                    borderBottomColor: height > 0 ? border2Color : 'transparent',
                }}
                sx={{
                    '.fa-hashtag': {
                        color: 'background.list.default',
                        fontSize: '1rem',
                    },
                }}
            >
                <Box display="flex" justifyContent="center" pt={1}>
                    <Box width={45} height={4} backgroundColor="background.8" borderRadius={1} />
                </Box>
                <Box display="flex" alignItems="center" justifyContent="start" width={1} mt={1}>
                    {currentNodeId && <FontAwesomeIcon icon={faHashtag} />}
                    <Typography
                        ml={1}
                        textAlign="left"
                        variant="body2"
                        fontWeight="bold"
                        lineHeight={1}
                        color="text.secondary"
                    >
                        {(currentNodeId && (currentNodeTitle || 'No Title'))
              || 'Select a node from the tree'}
                    </Typography>
                </Box>
            </Box>
            <Box
                ref={textContainerRef}
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
