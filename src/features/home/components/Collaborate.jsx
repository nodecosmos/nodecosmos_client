import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import AnimateOnView from './AnimateOnView';
import ContributionRequest from './collaborate/ContributionRequest';
import Topics from './collaborate/Topics';
import NodeSectionLink from './links/NodeSectionLink';
import Section from './Section';

export default function Vision() {
  // const [tab, setTab] = useState(0);
  // const handleTabChange = (_, currentTab) => setTab(currentTab);

  return (
    // margin top specific to shadow
    <Box>
      <Box
        mt={3}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        <NodeSectionLink />
      </Box>
      <Grid
        container
        columnSpacing={3}
        mt={{
          md: 3, // missing 2px for shadow
          xs: 3,
        }}
      >
        <Grid item xs={12} md={6}>
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
                Contribution Requests
              </Typography>
              <Typography mt={3} variant="body1" color="#a4a7ab">
                At the heart of the collaboration features is the Contribution Request.
                It enables community members to contribute to your innovation by following the Nodecosmos structure.
              </Typography>
              <Box mt={3}>
                <ContributionRequest />
              </Box>
            </Section>
          </AnimateOnView>
        </Grid>
        <Grid item xs={12} md={6} mt={{ xs: 3, md: 0 }}>
          <AnimateOnView delay={600}>
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
              <Typography mt={3} variant="body1" color="#a4a7ab">
                The topics feature enables you to discuss and do brainstorming with community.
                The topic can include a question, a problem, a challenge or
                anything you want to discuss with the community.
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
