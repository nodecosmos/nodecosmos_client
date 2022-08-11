import Box from '@mui/material/Box';
import React from 'react';
import VisionText from './intro/VisionText';
import VisionTimeline from './intro/VisionTimeline';

export default function Intro() {
  return (
    <Box
      sx={{
        padding: 0,
        mt: 4,
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderTop: '1px solid #3a3a40',
        borderLeft: '1px solid #36363d',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%),'
            + '0px 1px 1px 0px rgb(0 0 0 / 14%),'
            + '0px 1px 3px 0px rgb(0 0 0 / 12%)',
        background: 'radial-gradient(ellipse at center,  #3c59e463 35%, #383048 94%)', // #383048 #1e1b23 #53385eb0
        overflow: 'hidden',
      }}
    >
      <VisionText />
      <Box
        position="absolute"
        zIndex={1}
        width="50%"
        left="50%"
      >
        <VisionTimeline />
      </Box>
      <video
        width="50%"
        height="auto"
        autoPlay
        muted
        loop
        style={{ overflow: 'hidden', opacity: 0.8 }}
      >
        <source src="earth8.mp4" type="video/mp4" />
      </video>
      <video
        width="50%"
        height="auto"
        autoPlay
        muted
        loop
        style={{ overflow: 'hidden', opacity: 0.8 }}
      >
        <source src="space.mp4" type="video/mp4" />
      </video>
    </Box>
  );
}
