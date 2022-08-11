import TagRounded from '@mui/icons-material/TagRounded';
import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useRef, useState } from 'react';
import { scrollIntoView } from 'seamless-scroll-polyfill/lib/scrollIntoView';
/* sections */
import ForInnovators from '../../features/landing/components/ForInnovators';
import Intro from '../../features/landing/components/Intro';
import Nodes from '../../features/landing/components/Nodes';
import SupportUs from '../../features/landing/components/SupportUs';
import ContactUs from '../../features/landing/components/ContactUs';

export default function Index() {
  const [tab, setTab] = useState(0);
  const intro = useRef(null);
  const forInnovators = useRef(null);
  const forInvestors = useRef(null);
  const nodes = useRef(null);
  const supportUs = useRef(null);
  const contactUs = useRef(null);

  const handleTabChange = (_, currentTab) => setTab(currentTab);

  useEffect(() => {
    const allRefs = [
      intro, forInnovators, forInvestors, nodes, supportUs, contactUs,
    ];

    if (tab !== null && allRefs[tab] && allRefs[tab].current) {
      scrollIntoView(allRefs[tab].current, { behavior: 'smooth', block: 'center' });
    }
  }, [tab]);

  const handleNodecosmosClick = () => {
    setTab(null);
    scrollIntoView(intro.current, { behavior: 'smooth', block: 'center' });
  };

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
        zIndex={2}
        height={78}
      >
        <Container maxWidth="xl" sx={{ height: '100%' }}>
          <Box sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
            <Button
              onClick={handleNodecosmosClick}
              color="primary"
              className="MicroButton"
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
              <Tab label="Innovate" disableRipple sx={{ ml: 1 }} />
              <Tab label="Invest" disableRipple sx={{ ml: 1 }} />
              <Tab label="Nodes" disableRipple sx={{ ml: 1 }} />
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
          <Container maxWidth="xl">
            <Box ref={intro}><Intro /></Box>
            <Box ref={forInnovators}><ForInnovators /></Box>
            <Box ref={forInvestors}><ForInnovators /></Box>
            <Box ref={nodes}><Nodes /></Box>
            <Box ref={supportUs}><SupportUs /></Box>
            <Box ref={contactUs}><ContactUs /></Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
