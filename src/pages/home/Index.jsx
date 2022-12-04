import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { scrollBy, scrollIntoView } from 'seamless-scroll-polyfill';
import HomepageTabs from '../../features/home/components/HomepageTabs';
/* sections */
import Innovate from '../../features/home/components/Innovate';
import Collaborate from '../../features/home/components/Collaborate';
import Investments from '../../features/home/components/Investments';
import OpenSource from '../../features/home/components/OpenSource';

const MVP = React.lazy(() => import('../../features/home/components/MVP'));
const ContactUs = React.lazy(() => import('../../features/home/components/ContactUs'));

export default function Index() {
  const [tab, setTab] = useState(0);
  const rootRef = useRef(null);

  const innovate = useRef(null);
  const collaborate = useRef(null);
  const investments = useRef(null);
  const openSource = useRef(null);
  const mvp = useRef(null);
  const contactUs = useRef(null);

  const scrollEnabled = useSelector((state) => state.app.scrollEnabled);
  const [preventTabChange, setPreventTabChange] = useState(false);

  const allRefs = [
    innovate, collaborate, investments, openSource, mvp, contactUs,
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleWheel = () => {
    if (preventTabChange) return;

    // set tab based on scroll position
    const scrollPosition = rootRef.current.scrollTop;

    const tabHeight = isMobile ? 900 : 700;

    // if scroll is bottom of page, set tab to last tab

    const scrollBottomThreshold = isMobile ? 400 : 100;
    if (rootRef.current.scrollTop
      >= (rootRef.current.scrollHeight - rootRef.current.offsetHeight - scrollBottomThreshold)) {
      setTab(5);
    } else {
      const tabNumber = Math.floor(scrollPosition / tabHeight);
      setTab(tabNumber);
    }
  };

  const handleTabChange = (_, currentTab) => {
    setPreventTabChange(true);
    const yOffset = -115;
    const y = allRefs[currentTab].current.getBoundingClientRect().top + yOffset;

    scrollBy(rootRef.current, { top: y, behavior: 'smooth' });
    setTab(currentTab);
    setTimeout(() => setPreventTabChange(false), 1000);
  };

  const handleNodecosmosClick = () => {
    scrollIntoView(innovate.current, { behavior: 'smooth', block: 'center' });
  };

  return (
    <Box
      onScrollCapture={handleWheel}
      height={1}
      overflow={scrollEnabled ? 'auto' : 'hidden'}
      ref={rootRef}
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
              displa="inline-flex"
            >
              <img src="logo_1.svg" alt="logo" height={22} width={22} />
              <Typography sx={{ fontSize: 18, ml: '4px' }} fontWeight="bold">
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
            <Box id="innovate">
              <Box display="flex" mt={5} alignItems="center">
                {/* <img src="logo.svg" alt="logo" height={73} width={73} /> */}
                <Box ref={innovate}>
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
            <Box ref={collaborate}><Collaborate /></Box>
            <Box ref={investments}><Investments /></Box>
            <Box ref={openSource}><OpenSource /></Box>
            <Box ref={mvp}>
              <React.Suspense fallback={null}>
                <MVP />
              </React.Suspense>
            </Box>
            <Box ref={contactUs}>
              <React.Suspense fallback={null}>
                <ContactUs />
              </React.Suspense>
            </Box>
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
