// noinspection DuplicatedCode

import {
  Box, Card, CardContent, CardHeader, useMediaQuery, useTheme,
} from '@mui/material';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';

export default function WorkflowStepDescriptionMd() {
  const currentWorkflow = useSelector((state) => state.landingPageWorkflows.currentWorkflow);
  const descriptionRef = useRef(null);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  if (!currentWorkflow || !matches) return null;

  // enable svg element descriptionRef to be dragged up and down
  const handleMouseDown = (e) => {
    e.stopPropagation();
    const initialY = e.clientY;
    const initialElementY = descriptionRef.current.getBBox().y;

    const handleMouseMove = (event) => {
      const { clientY: y } = event;
      const offset = y - initialY;

      descriptionRef.current.attributes.y.value = initialElementY + offset;
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // handle mobile drag
  const handleTouchStart = (e) => {
    e.stopPropagation();
    const initialY = e.touches[0].clientY;
    const initialElementY = descriptionRef.current.getBBox().y;

    const handleTouchMove = (event) => {
      const { clientY: y } = event.touches[0];
      const offset = y - initialY;

      descriptionRef.current.attributes.y.value = initialElementY + offset;
    };

    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <g>
      <path
        strokeWidth={2}
        d="M 769 -1000 L 769 0"
        stroke="#414650"
        fill="transparent"
      />
      <path
        strokeWidth={2}
        d="M 769 -100 L 769 900"
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
        d="M 769 900 L 769 2000"
        stroke="#414650"
        fill="transparent"
      />
      <path
        strokeWidth={2}
        d="M 769 0 L 769 800"
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
        height="100%"
        x="520"
        y="0"
      >
        <Box
          display="flex"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Card
            elevation={0}
            sx={{
              p: 0,
              background: '#353941',
              border: '1px solid #3c434f',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <Box onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
              <CardHeader
                sx={{ borderBottom: '1px solid #3c434f', height: 50 }}
                titleTypographyProps={{
                  variant: 'body1',
                  textAlign: 'center',
                  ml: '-40px',
                }}
                title={currentWorkflow.title}
                avatar={<OpenWithRoundedIcon htmlColor="#4c525b" sx={{ mr: 0 }} />}
              />
              <CardContent sx={{ minHeight: 208, background: '#32363d' }}>
                {currentWorkflow.description}
              </CardContent>
            </Box>
          </Card>
        </Box>
      </foreignObject>
    </g>
  );
}
