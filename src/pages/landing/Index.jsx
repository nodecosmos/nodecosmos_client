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
import ContactUs from '../../features/landing/components/ContactUs';

const tabSx = {
  ml: 1,
  fontSize: 15,
};

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
        height={56}
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
              <TagRounded sx={{ color: 'primary.light', fontSize: 16 }} />
              <Typography sx={{ fontSize: 16 }} fontWeight="bold">
                <Box component="span" color="primary.light">node</Box>
                <Box component="span" color="secondary.main">cosmos</Box>
              </Typography>
            </Button>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              centered
              sx={{
                ml: 4,
                height: 1,
                pt: 1,
              }}
              TabIndicatorProps={{ className: 'header' }}
            >
              <Tab label="Vision" disableRipple sx={tabSx} />
              <Tab label="Innovate" disableRipple sx={tabSx} />
              <Tab label="Invest" disableRipple sx={tabSx} />
              <Tab label="Nodes" disableRipple sx={tabSx} />
              <Tab label="Contact Us" disableRipple sx={tabSx} />
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
            <Box ref={contactUs}><ContactUs /></Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
