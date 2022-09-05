/* eslint-disable max-len */
import {
  Grid, List, ListItem, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';

export default function Intro() {
  const [shouldRender, setShouldRender] = useState(false);

  return (
    <Box
      sx={{
        padding: 2,
        mt: 2,
        width: '100%',
        display: shouldRender ? 'block' : 'none',
        borderRadius: 8,
        borderTop: '1px solid #3a3a40a3',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%),'
          + '0px 1px 1px 0px rgb(0 0 0 / 14%),'
          + '0px 1px 3px 0px rgb(0 0 0 / 12%)',
        backgroundColor: '#30343c',
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ background: '#3d3254' }} ml={{ sm: 2 }}>
          <video
            width="100%"
            height="auto"
            autoPlay
            muted
            loop
            style={{
              overflow: 'hidden',
              opacity: 0.9,
              marginBottom: -8,
              clipPath: 'inset(0 -1px 0.5px 0)',
            }}
            onLoadedData={() => {
              setShouldRender(true);
            }}
          >
            <source src="earth8.mp4" type="video/mp4" />
          </video>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          p={5}
          ml={{ sm: -2 }}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={900} fontFamily="'Montserrat', sans-serif">
              Innovation Collaboration Platform
            </Typography>
          </Box>
          <Box component="ul" textAlign="left">
            <li>
              <Typography variant="body1" fontFamily="'Montserrat', sans-serif" mt={3} color="#fff">
                create innovation
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontFamily="'Montserrat', sans-serif" mt={3} color="#fff">
                collaborate
              </Typography>
            </li>
            <li>
              <Typography variant="body1" fontFamily="'Montserrat', sans-serif" mt={3} color="#fff">
                get investments
              </Typography>
            </li>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
