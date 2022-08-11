import React from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LandingNodeSidebar from './nodes/LandingNodeSidebar';

export default function Vision() {
  // const [tab, setTab] = useState(0);
  // const handleTabChange = (_, currentTab) => setTab(currentTab);

  return (
    <Grid
      container
      align="center"
      alignItems="center"
      id="vision"
      sx={{
        mt: 5,
        borderTop: '1px solid #3a3a40',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%),'
                 + '0px 1px 1px 0px rgb(0 0 0 / 14%),'
                 + '0px 1px 3px 0px rgb(0 0 0 / 12%)',
        borderRadius: 8,
        padding: 4,
        backgroundColor: '#32353b',
      }}
    >
      <Grid item lg={3}>
        <LandingNodeSidebar />
      </Grid>
      {/* <Grid item lg={8}> */}
      {/*  <Box */}
      {/*    flexDirection="column" */}
      {/*    display="flex" */}
      {/*    alignItems="center" */}
      {/*  > */}
      {/*    <Typography variant="h3" color="primary.main">Nodes</Typography> */}
      {/*    <Typography variant="h6" align="left" mt={3}> */}
      {/*      Nodes are unit of innovation or research and its components. */}
      {/*      <br /> */}
      {/*      Each */}
      {/*      {' '} */}
      {/*      <b>node</b> */}
      {/*      {' '} */}
      {/*      can encapsulate another node(s) eventually building node tree. Here is sample of lightbulb: */}
      {/*    </Typography> */}
      {/*  </Box> */}
      {/* </Grid> */}
    </Grid>
  );
}
