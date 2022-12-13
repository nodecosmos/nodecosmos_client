import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import AnimateOnView from './AnimateOnView';
import ContributionRequest from './collaborate/ContributionRequest';
import Topics from './collaborate/Topics';
import Section from './Section';

export default function Vision() {
  // const [tab, setTab] = useState(0);
  // const handleTabChange = (_, currentTab) => setTab(currentTab);

  return (
    // margin top specific to shadow
    <Box mt={{
      md: '14px', // + 2px for shadow
      xs: 3,
    }}
    >
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <AnimateOnView delay={200}>
            <Section>
              <Typography
                variant="h5"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="900"
                sx={{
                  // background: 'linear-gradient(35deg, #06e1ff 0%, #ce6cff 65%)',
                  // WebkitBackgroundClip: 'text',
                  // backgroundClip: 'text',
                  // WebkitTextFillColor: 'transparent',
                  // WebkitBoxDecorationBreak: 'clone',
                  textAlign: 'center',
                }}
              >
                Contribution Requests
              </Typography>
              <Typography mt={3} variant="body1" color="#8b949e">
                Use Contribution Request features to collaborate and boost your innovation
              </Typography>
              <Box mt={3}>
                <ContributionRequest />
              </Box>
            </Section>
          </AnimateOnView>
        </Grid>
        <Grid item xs={12} md={6} mt={{ xs: 3, md: 0 }}>
          <AnimateOnView delay={400}>
            <Section>
              <Typography
                variant="h5"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="900"
                sx={{
                // background: 'linear-gradient(35deg, #06e1ff 0%, #ce6cff 65%)',
                // WebkitBackgroundClip: 'text',
                // backgroundClip: 'text',
                // WebkitTextFillColor: 'transparent',
                // WebkitBoxDecorationBreak: 'clone',
                  textAlign: 'center',
                }}
              >
                Topics
              </Typography>
              <Typography mt={3} variant="body1" color="#8b949e">
                Use Topics features to communicate and do brainstorming with your community
              </Typography>
              <Box mt={3}>
                <Topics />
              </Box>
            </Section>
          </AnimateOnView>
        </Grid>
      </Grid>
    </Box>
  );
}
