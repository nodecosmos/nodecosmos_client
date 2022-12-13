import React from 'react';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AnimateOnView from './AnimateOnView';
import Innovators from './investments/Innovators';
import Investors from './investments/Investors';
import Section from './Section';

export default function Investments() {
  return (
    <Box mt={{
      xs: 8,
      md: 32,
    }}
    >
      <AnimateOnView>
        <Box>
          <Typography
            variant="h4"
            textAlign="center"
            lineHeight={{
              xs: 1.3,
              sm: 1,
            }}
            fontSize={{
              xs: '28px',
              sm: '32px',
            }}
          >
            Bring your innovation to the world with our
            <Box component="span" color="#b3ff68" fontWeight="bold">
              {' '}
              Crypto Investments
              {' '}
            </Box>
            features
          </Typography>
        </Box>
      </AnimateOnView>
      <AnimateOnView delay={200}>
        <Box
          mt={3}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <img src="home/node-link-2.svg" alt="node-link" width="50%" />
        </Box>
      </AnimateOnView>
      <Grid
        container
        columnSpacing={2}
        mt={{
          xs: 8,
          md: 3,
        }}
      >
        <Grid item xs={12} md={6}>
          <AnimateOnView delay={400}>
            <Section>
              <Innovators />
            </Section>
          </AnimateOnView>
        </Grid>
        <Grid item xs={12} md={6} mt={{ xs: 3, md: 0 }}>
          <AnimateOnView delay={600}>
            <Section>
              <Investors />
            </Section>
          </AnimateOnView>
        </Grid>
      </Grid>
    </Box>
  );
}
