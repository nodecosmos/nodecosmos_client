import Box from '@mui/material/Box';
import * as PropType from 'prop-types';
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function Separator({ color }) {
  const connectorSx = {
    backgroundColor: '#43464e',
    borderRadius: '3px',
    height: 50,
    width: 8,
    filter: 'drop-shadow(1px 2px 1px rgb(0 0 0 / 0.3))',
  };
  return (
    <Box>
      <Box width="100%" display="flex" alignItems="center" justifyContent="center" mt="25px">
        <TimelineDot sx={{ background: 'white' }} />
      </Box>
      <Box width="100%" display="flex" alignItems="center" justifyContent="center" mb="25px">
        <TimelineDot sx={{ borderColor: 'white' }} variant="outlined" />
      </Box>
    </Box>
  );
}

Separator.propTypes = {
  color: PropType.string.isRequired,
};

// export default function Separator() {
//   return (
//     <Timeline sx={{ textAlign: 'left' }} position="alternate">
//       <TimelineItem>
//         <TimelineSeparator>
//           <TimelineConnector sx={{
//             backgroundColor: '#43464e',
//             width: 8,
//             borderRadius: 8,
//             boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 50%),'
//               + ' 1px 0px 2px -1px rgb(0 0 0 / 50%),'
//               + ' -1px -1px 2px -1px rgb(0 0 0 / 25%)',
//           }}
//           />
//           {/* <TimelineDot variant="outlined" color="primary" /> */}
//           {/* <TimelineConnector /> */}
//         </TimelineSeparator>
//         <TimelineContent />
//       </TimelineItem>
//       {/* <TimelineItem> */}
//       {/*  <TimelineSeparator> */}
//       {/*    <TimelineConnector /> */}
//       {/*    <TimelineDot variant="outlined" color="secondary" /> */}
//       {/*    <TimelineConnector /> */}
//       {/*    <TimelineConnector /> */}
//       {/*  </TimelineSeparator> */}
//       {/*  <TimelineContent /> */}
//       {/* </TimelineItem> */}
//     </Timeline>
//   );
// }
