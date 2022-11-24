import TagRounded from '@mui/icons-material/TagRounded';
import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import { useInView } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { scrollIntoView } from 'seamless-scroll-polyfill';
import ContactUs from '../../features/home/components/ContactUs';
/* sections */
import Innovate from '../../features/home/components/Innovate';
import Collaborate from '../../features/home/components/Collaborate';
import Investments from '../../features/home/components/Investments';
import OpenSource from '../../features/home/components/OpenSource';
import MVP from '../../features/home/components/MVP';

const tabSx = {
  ml: 1,
  fontSize: 15,
};

export default function Index() {
  const [tab, setTab] = useState(0);
  const innovate = useRef(null);
  const collaborate = useRef(null);
  const investments = useRef(null);
  const openSource = useRef(null);
  const mvp = useRef(null);
  const contactUs = useRef(null);

  const useInViewOptions = { amount: 0.8 };

  const innovateInView = useInView(innovate, useInViewOptions);
  const collaborateInView = useInView(collaborate, useInViewOptions);
  const investmentsInView = useInView(investments, useInViewOptions);
  const openSourceInView = useInView(openSource, useInViewOptions);
  const MVPInView = useInView(mvp, useInViewOptions);
  const contactUsInView = useInView(contactUs, useInViewOptions);

  const scrollEnabled = useSelector((state) => state.app.scrollEnabled);
  const [preventTabChange, setPreventTabChange] = useState(false);

  const allRefs = [
    innovate, collaborate, investments, openSource, mvp, contactUs,
  ];

  const handleWheel = () => {
    if (preventTabChange) return;

    const allInView = [
      innovateInView, collaborateInView, investmentsInView, openSourceInView, MVPInView, contactUsInView,
    ];

    const currentTab = allInView.indexOf(true);

    if (currentTab !== -1) {
      setTab(currentTab);
    }
  };

  const handleTabChange = (_, currentTab) => {
    setPreventTabChange(true);
    scrollIntoView(allRefs[currentTab].current, { behavior: 'smooth', block: 'center' });
    setTab(currentTab);
    setTimeout(() => setPreventTabChange(false), 500);
  };

  const handleNodecosmosClick = () => {
    scrollIntoView(innovate.current, { behavior: 'smooth', block: 'center' });
  };

  return (
    <Box
      onWheelCapture={handleWheel}
      height={1}
      overflow={scrollEnabled ? 'auto' : 'hidden'}
      id="landing"
    >
      <Box
        display="flex"
        alignItems="center"
        className="Header BoxShadowBottom BorderBottom"
        position="sticky"
        top={0}
        zIndex={2}
        height={56}
        sx={{
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
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
              <TagRounded sx={{ color: '#00d9ff', fontSize: 18 }} />
              <Typography sx={{ fontSize: 18 }} fontWeight="bold">
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
                display: { sm: 'flex' },
              }}
              TabIndicatorProps={{ className: 'header' }}
            >
              <Tab label="Innovate" disableRipple sx={tabSx} />
              <Tab label="Collaborate" disableRipple sx={tabSx} />
              <Tab label="Investments" disableRipple sx={tabSx} />
              <Tab label="Open Source" disableRipple sx={tabSx} />
              <Tab label="MVP" disableRipple sx={tabSx} />
              <Tab label="Contact Us" disableRipple sx={tabSx} />
            </Tabs>
          </Box>
        </Container>
      </Box>
      <Box height="1">
        <Box
          display="flex"
          justifyContent="center"
        >
          <Container maxWidth="lg">
            <Box ref={innovate} id="innovate">
              <Typography
                mt={5}
                variant="h4"
                fontWeight="900"
                fontFamily="'Montserrat', sans-serif"
              >
                Innovation Collaboration Platform
              </Typography>
              <Typography
                variant="h6"
                fontFamily="'Montserrat', sans-serif"
                color="#4e5f6d"
              >
                Where scientists, engineers, and entrepreneurs collaborate to bring innovations.
              </Typography>
              <Innovate />
            </Box>
            <Box ref={collaborate}><Collaborate /></Box>
            <Box ref={investments}><Investments /></Box>
            <Box ref={openSource}><OpenSource /></Box>
            <Box ref={mvp}><MVP /></Box>
            <Box ref={contactUs}><ContactUs /></Box>
          </Container>
        </Box>
        <Box
          mt={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="Header BoxShadowTop BorderTop"
          zIndex={2}
          p={3}
        >
          <Typography variant="body2" color="#e3daee">
            © 2022 nodecosmos
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
