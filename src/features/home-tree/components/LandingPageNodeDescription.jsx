import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  faHashtag,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setDescriptionCoordinates } from '../../app/appSlice';

export default function NodeDescriptionMd() {
  const currentNodeId = useSelector((state) => state.app.currentNodeId);
  const currentNodeDescription = useSelector((state) => state.landingPageNodes[currentNodeId]?.description);
  const currentNodeTitle = useSelector((state) => state.landingPageNodes[currentNodeId]?.title);

  const descriptionRef = useRef(null);
  const dispatch = useDispatch();
  const { y } = useSelector((state) => state.app.descriptionCoordinates);

  useEffect(() => {
    dispatch(setDescriptionCoordinates({ y: 267.5 }));
  }, [dispatch]);

  if (!currentNodeTitle) return null;

  // enable svg element descriptionRef to be dragged up and down
  const handleMouseDown = (e) => {
    e.stopPropagation();
    const initialY = e.clientY;
    const initialElementY = descriptionRef.current.getBBox().y;

    const handleMouseMove = (event) => {
      const { clientY } = event;
      const offset = clientY - initialY;

      dispatch(setDescriptionCoordinates({ y: initialElementY + offset }));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <g>
      <path
        strokeWidth={2}
        d="M 799 -1000 L 799 0"
        stroke="#414650"
        fill="transparent"
      />
      <path
        strokeWidth={2}
        d="M 799 -100 L 799 900"
        stroke="#414650"
        fill="transparent"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
          animation: 'dash 2s forwards',
        }}
      />
      <path
        strokeWidth={2}
        d="M 799 0 L 799 800"
        stroke="#414650"
        fill="transparent"
        style={{
          strokeDasharray: 800,
          strokeDashoffset: 800,
          animation: 'dash 2s forwards',
        }}
      />
      <foreignObject
        ref={descriptionRef}
        width="500"
        height="265"
        x="550"
        y={y}
      >
        <Box sx={{
          border: 1,
          borderColor: 'borders.3',
          borderRadius: 3,
          boxShadow: 0,
          overflow: 'hidden',
          width: 494,
        }}
        >
          <Box
            onMouseDown={handleMouseDown}
            backgroundColor="background.7"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={56}
            sx={{
              cursor: 'grab',
              '.fa-hashtag': {
                mt: -0.15,
                color: 'background.list.default',
                fontSize: '1.25rem',
              },
            }}
          >
            {currentNodeId && <FontAwesomeIcon icon={faHashtag} />}
            <Typography
              ml={1}
              textAlign="left"
              variant="body1"
              fontWeight="bold"
              lineHeight={1}
              color="text.secondary"
              fontFamily="'Comfortaa', sans-serif"
            >
              {(currentNodeId && (currentNodeTitle || 'No Title'))
                || 'Select a node from the tree'}
            </Typography>
          </Box>
          <Box p={2} backgroundColor="background.5" minHeight={176}>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign={currentNodeDescription ? 'left' : 'center'}
            >
              {currentNodeDescription || (currentNodeId && 'This node has no description yet.') || (
                <Box component="span" fontSize={30} width={1} textAlign="center">
                  ¯\_(ツ)_/¯
                </Box>
              )}
            </Typography>
          </Box>
        </Box>
      </foreignObject>
    </g>
  );
}
