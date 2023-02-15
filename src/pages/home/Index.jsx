import React, {
  useRef, useState, useEffect, useMemo, useCallback,
} from 'react';
import { useInView } from 'framer-motion';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { scrollBy } from 'seamless-scroll-polyfill';
import Hero from '../../features/home/components/Hero';
import HomepageTabs from '../../features/home/components/HomepageTabs';
/* sections */
import Innovate from '../../features/home/components/Innovate';
import Collaborate from '../../features/home/components/Collaborate';
import Investments from '../../features/home/components/Investments';
import OpenSource from '../../features/home/components/OpenSource';
import Mvp from '../../features/home/components/Mvp';
import ContactUs from '../../features/home/components/ContactUs';
import { setHomepageTab } from '../../features/home/homeSlice';

const HEADER_HEIGHT = 56;

export default function Index() {
  const [tab, setTab] = useState(0);
  const rootRef = useRef(null);

  const innovate = useRef(null);
  const collaborate = useRef(null);
  const investments = useRef(null);
  const openSource = useRef(null);
  const mvp = useRef(null);
  const contactUs = useRef(null);

  const preventTabChange = useRef(false);
  const timeout = useRef(null);

  const heroLogo = useRef(null);
  const heroInView = useInView(heroLogo, { amount: 0.8 });

  const scrollEnabled = useSelector((state) => state.app.scrollEnabled);

  const allRefs = useMemo(() => [innovate, collaborate, investments, openSource, mvp, contactUs], []);

  const [sectionPositions, setSectionPositions] = useState(null);
  const [sectionHeights, setSectionHeights] = useState(null);
  const [sectionEndPositions, setSectionEndPositions] = useState(null);

  // ---------------------------------------------------------------------------------------------------------------- //
  useEffect(() => {
    setSectionPositions(allRefs.map((ref) => ref.current && ref.current.offsetTop));
    setSectionHeights(allRefs.map((ref) => ref.current && ref.current.offsetHeight));
  }, [allRefs]);

  useEffect(() => {
    setSectionEndPositions(sectionPositions && sectionPositions.map((pos, i) => pos + sectionHeights[i]));
  }, [sectionHeights, sectionPositions]);

  const handleScrollCapture = () => {
    if (preventTabChange.current) return;

    const scrollPosition = rootRef.current.scrollTop;
    const sectionIndex = sectionEndPositions.findIndex((endPos, index) => {
      const sectionSize = sectionHeights[index];
      return scrollPosition < endPos - sectionSize / 2;
    });

    const sectionEndPosition = sectionEndPositions[sectionIndex];

    if (scrollPosition < sectionEndPosition) {
      setTab(sectionIndex);
    }
  };

  // ---------------------------------------------------------------------------------------------------------------- //
  const handleTabChange = useCallback((_, currentTab) => {
    preventTabChange.current = true;

    const yOffset = -115;
    const y = allRefs[currentTab].current.getBoundingClientRect().top + yOffset;

    scrollBy(rootRef.current, { top: y, behavior: 'smooth' });
    setTab(currentTab);

    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => { preventTabChange.current = false; }, 1000);
  }, [allRefs]);

  const handleNodecosmosClick = () => {
    preventTabChange.current = true;
    scrollBy(rootRef.current, { top: -rootRef.current.scrollTop, behavior: 'smooth' });
    setTab(0);
    timeout.current = setTimeout(() => { preventTabChange.current = false; }, 1000);
  };

  // ------------------------------------- HANDLE EXTERNAL HOMEPAGE TAB CHANGE -------------------------------------- //
  const homepageTab = useSelector((state) => state.home.homepageTab);
  const dispatch = useDispatch();

  useEffect(() => {
    if (homepageTab !== null) {
      handleTabChange(null, homepageTab);
      dispatch(setHomepageTab(null));
    }
  }, [homepageTab, handleTabChange, dispatch]);

  // ---------------------------------------------------------------------------------------------------------------- //
  return (
    <Box
      className="scrollable"
      onScroll={handleScrollCapture}
      height={1}
      overflow={scrollEnabled ? 'auto' : 'hidden'}
      ref={rootRef}
    >
      <Box
        display="flex"
        alignItems="center"
        position="fixed"
        top={{
          sm: 6,
          xs: 0,
        }}
        right={{
          sm: 6,
          xs: 0,
        }}
        width={{
          xs: 1,
          sm: 'calc(100% - 12px)',
        }}
        zIndex={3}
        height={HEADER_HEIGHT}
        sx={{
          borderTopLeftRadius: {
            xs: 0,
            sm: 8,
          },
          borderTopRightRadius: {
            xs: 0,
            sm: 8,
          },
          boxShadow: 'header',
          borderBottom: 1,
          borderBottomColor: 'borders.1',
          backgroundColor: 'background.3',
        }}
        border={1}
        borderColor="borders.2"
      >
        <Container maxWidth="xl" sx={{ height: '100%' }}>
          <Box
            sx={{
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
              displa="inline-flex"
            >
              {!heroInView && (
              <img
                src="logo_1.svg"
                alt="logo"
                height={22}
                width={22}
                style={{
                  animation: 'rotate 0.3s',
                }}
              />
              ) }
              <Typography sx={{ fontSize: 18, ml: 1 }} fontWeight="bold">
                <Box component="span" color="logo.blue">node</Box>
                <Box component="span" color="logo.red">cosmos</Box>
              </Typography>
            </Button>
            <HomepageTabs handleTabChange={handleTabChange} tab={tab} />
          </Box>
        </Container>
      </Box>
      <Box height="1">
        <Box
          display="flex"
          justifyContent="center"
        >
          <Container maxWidth="lg" sx={{ mt: `${HEADER_HEIGHT}px` }}>
            <Box><Hero heroLogoRef={heroLogo} inView={heroInView} /></Box>
            <Box ref={innovate}><Innovate /></Box>
            <Box id="collaborate" ref={collaborate}><Collaborate /></Box>
            <Box ref={investments}><Investments /></Box>
            <Box ref={openSource}><OpenSource /></Box>
            <Box ref={mvp}>
              <Mvp />
            </Box>
            <Box ref={contactUs}>
              <ContactUs />
            </Box>
          </Container>
        </Box>
        <Box
          mt={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={2}
          p={3}
          backgroundColor="background.3"
          boxShadow="boxBorder.top.xs"
          sx={{
            borderBottomLeftRadius: {
              xs: 0,
              sm: 8,
            },
            borderBottomRightRadius: {
              xs: 0,
              sm: 8,
            },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2023 nodecosmos
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
