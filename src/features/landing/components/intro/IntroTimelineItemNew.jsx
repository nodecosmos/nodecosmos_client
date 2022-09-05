import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function VisionTimelineItem({
                                             delay, icon, text, renderSeparator,
                                           }) {
  return (
    <TimelineItem>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          delay,
        }}
      >
        <TimelineSeparator>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              padding: '8px',
              background: 'transparent',
              border: '2px solid #fff',
              color: '#96d434',
              margin: 0,
            }}
          >
            {icon}
          </Box>
          {renderSeparator && <TimelineConnector sx={{ height: 31, width: 4, background: '#96d434' }} /> }
        </TimelineSeparator>
      </motion.div>
      <TimelineContent sx={{ mt: -2, width: '100%', height: '100%' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            delay,
          }}
        >
          <Button
            color="primary"
            sx={{
              border: '1.5px solid',
              borderColor: '#3c7dcd',
              // borderColor: '#36abf2',
              borderRadius: '12px',
              padding: '10px',
            }}
          >
            <Typography fontFamily="Roboto Mono" fontWeight="bold" fontSize="1rem">
              {text}
            </Typography>
          </Button>
          {/* <Typography */}
          {/*  variant="h6" */}
          {/*  component="span" */}
          {/*  sx={{ */}
          {/*    padding: '12px', */}
          {/*    borderRadius: '16px', */}
          {/*    color: 'white', */}
          {/*    border: '1.5px solid', */}
          {/*    borderColor: '#fff', */}
          {/*    cursor: 'pointer', */}
          {/*    userSelect: 'none', */}
          {/*    transition: 'background cubic-bezier(0.0, 0, 0.2, 1) 350ms', */}
          {/*    '&:hover': { */}
          {/*      background: '#abdc58', */}
          {/*    }, */}
          {/*  }} */}
          {/* > */}
          {/*  {text} */}
          {/* </Typography> */}
        </motion.div>
      </TimelineContent>
    </TimelineItem>
  );
}

VisionTimelineItem.defaultProps = {
  renderSeparator: true,
};

VisionTimelineItem.propTypes = {
  delay: PropTypes.number.isRequired,
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  renderSeparator: PropTypes.bool,
};
