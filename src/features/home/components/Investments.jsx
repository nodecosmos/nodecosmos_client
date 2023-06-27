import React from 'react';
import {
  Grid, Typography, useTheme, Box,
} from '@mui/material';
import AnimateOnView from './AnimateOnView';
import Innovators from './investments/Innovators';
import Investors from './investments/Investors';
import NodeSectionLink from './links/NodeSectionLink';
import Section from './Section';

export default function Investments() {
  const theme = useTheme();
  const nodeLinkColor = theme.palette.primary.main;

  return (
    <Box mt={8}>
      <AnimateOnView>
        <Typography
          variant="h4"
          variantMapping={{ h4: 'h3' }}
          textAlign="center"
          fontSize={{
            xs: '28px',
            sm: '32px',
          }}
          fontFamily="Comfortaa, sans-serif"
        >
          Bring your innovation to the world with
          <Box component="span" color="primary.main" fontWeight="bold">
            {' '}
            Crypto Investments
            {' '}
          </Box>
          features
        </Typography>
      </AnimateOnView>
      <Box
        mt={3}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        display={{
          xs: 'none',
          md: 'flex',
        }}
      >
        <NodeSectionLink circleFill={nodeLinkColor} />
      </Box>
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
