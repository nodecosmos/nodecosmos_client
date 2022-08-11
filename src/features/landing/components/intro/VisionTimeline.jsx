import { motion } from 'framer-motion';
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';

import RepeatIcon from '@mui/icons-material/Repeat';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RocketIcon from '@mui/icons-material/Rocket';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import AddToQueueRoundedIcon from '@mui/icons-material/AddToQueueRounded';
import VisionTimelineItem from './VisionTimelineItem';

export default function VisionTimeline() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.03, 1],
        // filter: ['drop-shadow(0px 0px 0px)', 'drop-shadow(1px 1px 1px)', 'drop-shadow(0px 0px 0px)'],
      }}
      transition={{
        duration: 4,
        delay: 3,
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      <Timeline
        sx={{
          textAlign: 'left',
          transform: 'scale(0.85)',
        }}
        position="alternate"
      >
        <VisionTimelineItem icon={<AddRoundedIcon />} text="Create Innovation" delay={0} />
        <VisionTimelineItem icon={<EngineeringRoundedIcon />} text="Collaborate" delay={0.5} />
        <VisionTimelineItem icon={<AddToQueueRoundedIcon />} text="Invest" delay={1} />
        <VisionTimelineItem icon={<RepeatIcon />} text="Get Investments" delay={1.5} />
        <VisionTimelineItem icon={<RocketIcon />} text="Launch Innovation" delay={2} renderSeparator={false} />
      </Timeline>
    </motion.div>
  );
}
