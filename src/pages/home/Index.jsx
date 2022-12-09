import React, {
  useRef, useState, useEffect, useMemo, useCallback,
} from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { scrollBy } from 'seamless-scroll-polyfill';
import HomepageTabs from '../../features/home/components/HomepageTabs';
/* sections */
import Innovate from '../../features/home/components/Innovate';
import Collaborate from '../../features/home/components/Collaborate';
import Investments from '../../features/home/components/Investments';
import OpenSource from '../../features/home/components/OpenSource';
import MVP from '../../features/home/components/MVP';
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
      return scrollPosition < endPos - sectionSize / 2 + 105;
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
    timeout.current = setTimeout(() => { preventTabChange.current = false; }, 500);
  }, [allRefs]);

  const handleNodecosmosClick = () => {
    preventTabChange.current = true;
    scrollBy(rootRef.current, { top: -rootRef.current.scrollTop, behavior: 'smooth' });
    timeout.current = setTimeout(() => { preventTabChange.current = false; }, 500);
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
      onScroll={handleScrollCapture}
      height={1}
      overflow={scrollEnabled ? 'auto' : 'hidden'}
      ref={rootRef}
    >
      <Box
        display="flex"
        alignItems="center"
        className="Header BoxShadowBottom"
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
        zIndex={2}
        height={HEADER_HEIGHT}
        sx={{
          borderTopLeftRadius: {
            xs: 0,
            sm: 6,
          },
          borderTopRightRadius: {
            xs: 0,
            sm: 6,
          },
          boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
          borderBottom: '1px solid #2d3138',
        }}
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
              <img src="logo_1.svg" alt="logo" height={22} width={22} />
              <Typography sx={{ fontSize: 18, ml: 1 }} fontWeight="bold">
                <Box component="span" color="primary.light">node</Box>
                <Box component="span" color="secondary.main">cosmos</Box>
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
          <Container maxWidth="lg">
            <Box id="innovate" ref={innovate}>
              <Box display="flex" mt={`${HEADER_HEIGHT}px`} alignItems="center">
                {/* <img src="logo.svg" alt="logo" height={73} width={73} /> */}
                <Box mt={5}>
                  <Typography
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
                </Box>
              </Box>
              <Innovate />
            </Box>
            <Box id="collaborate" ref={collaborate}><Collaborate /></Box>
            <Box ref={investments}><Investments /></Box>
            <Box ref={openSource}><OpenSource /></Box>
            <Box ref={mvp}>
              <MVP />
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
