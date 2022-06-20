import TagRounded from '@mui/icons-material/TagRounded';
import {
  Box, Button, Grid, Tab, Tabs, Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useRef, useState } from 'react';
import { scrollIntoView } from 'seamless-scroll-polyfill/lib/scrollIntoView';
import Vision from './Vision';
import Nodes from './Nodes';
import Investments from './Investments';
import SupportUs from './SupportUs';
import ContactUs from './ContactUs';

export default function LandingPage(props) {
  const [tab, setTab] = useState(0);
  const vision = useRef(null);
  const nodes = useRef(null);
  const investments = useRef(null);
  const supportUs = useRef(null);
  const contactUs = useRef(null);

  const handleTabChange = (_, currentTab) => setTab(currentTab);

  useEffect(() => {
    const allRefs = [
      vision, nodes, investments, supportUs, contactUs,
    ];

    if (allRefs[tab].current) {
      const block = allRefs[tab] === vision ? 'center' : 'start';
      scrollIntoView(allRefs[tab].current, { behavior: 'smooth', block });
    }
  }, [tab]);

  return (
    <Box
      height={1}
      overflow="auto"
    >
      <Box
        display="flex"
        alignItems="center"
        className="Header BoxShadowBottom BorderBottom"
        position="sticky"
        top={0}
        zIndex={1}
        height={78}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Box sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
            <Button
              sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                height: 48,
              }}
              color="primary"
              className="MicroButton focus"
            >
              <TagRounded sx={{ color: 'primary.light', fontSize: 24 }} />
              <Typography sx={{ fontSize: 24 }} fontWeight="bold">
                <Box component="span" color="primary.light">node</Box>
                <Box component="span" color="secondary.main">cosmos</Box>
              </Typography>
            </Button>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              centered
              sx={{ ml: 4, height: 1, pt: 3 }}
              TabIndicatorProps={{ className: 'header' }}
            >
              <Tab label="Vision" disableRipple sx={{ ml: 1 }} />
              <Tab label="Nodes" disableRipple sx={{ ml: 1 }} />
              <Tab label="Investments NFT" disableRipple sx={{ ml: 1 }} />
              <Tab label="Support Us" disableRipple sx={{ ml: 1 }} />
              <Tab label="Contact Us" disableRipple sx={{ ml: 1 }} />
            </Tabs>
          </Box>
        </Container>
      </Box>
      <Box height="1" p={2}>
        <Box
          display="flex"
          justifyContent="center"
        >
          <Container
            maxWidth="lg"
          >
            <Box ref={vision}><Vision /></Box>
            <Box ref={nodes} pt={4}><Nodes /></Box>
            <Box ref={investments} pt={4}><Investments /></Box>
            <Box ref={supportUs} pt={4}><SupportUs /></Box>
            <Box ref={contactUs} pt={4}><ContactUs /></Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
