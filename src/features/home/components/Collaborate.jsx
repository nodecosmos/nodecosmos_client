import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, useTheme } from '@mui/material';
import AnimateOnView from './AnimateOnView';
import ContributionRequest from './collaborate/ContributionRequest';
import Topics from './collaborate/Topics';
import NodeSectionLink from './links/NodeSectionLink';
import Section from './Section';

export default function Vision() {
  // const [tab, setTab] = useState(0);
  // const handleTabChange = (_, currentTab) => setTab(currentTab);

  const theme = useTheme();
  const nodeLinkColor = theme.palette.primary.main;

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
        <NodeSectionLink circleFill={nodeLinkColor} />
      </Box>
      <Grid
        container
        columnSpacing={2}
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
                variantMapping={{ h5: 'h3' }}
                fontFamily="'Montserrat', sans-serif"
                fontWeight="900"
                textAlign="center"
                color="text.primary"
              >
                Contribution Requests
              </Typography>
              <Typography mt={3} variant="body1" color="text.secondary">
                Enables community members to contribute to your innovation either by suggesting
                new components to your innovation or new ingredients for your recipe,
                making changes to existing ones, or by making another type of contribution.
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
                variantMapping={{ h5: 'h3' }}
                fontFamily="'Montserrat', sans-serif"
                fontWeight="900"
                textAlign="center"
                color="text.primary"
              >
                Topics
              </Typography>
              <Typography mt={3} variant="body1" color="text.secondary">
                Discuss, do brainstorming, raise issues.
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
