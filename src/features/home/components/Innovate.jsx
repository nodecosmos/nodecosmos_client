import React, { useEffect } from 'react';
import {
  Tab, Tabs, Box, useMediaQuery, useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { faDiagramNested, faSquareCode, faChartNetwork } from '@fortawesome/pro-light-svg-icons';
import {
  faDiagramNested, faSquareCode, faChartNetwork, faGamepadModern,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setCurrentNode } from '../../app/appSlice';
import { setInnovateTab } from '../homeSlice';
import AnimateOnView from './AnimateOnView';
import Other from './innovate/AndMore';
import LandingPageMarkdown from './innovate/LandingPageMarkdown';
import LandingPageTree from './innovate/LandingPageTree';
import LandingPageWorkflow from './innovate/LandingPageWorkflow';
import Section from './Section';

const PRESELECTED_NODE_ID = '635a91ea690cc413ead79ce2';

export default function Innovate() {
  const currentTab = useSelector((state) => state.home.innovateTab);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(setCurrentNode(PRESELECTED_NODE_ID));
  }, [dispatch]);

  const tabSx = {
    // fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    mr: 3,
    display: 'flex',
  };

  const indicatorSx = {
    height: {
      xs: 3,
      sm: 5,
    },
    borderRadius: 3,
    mb: {
      xs: 1,
      md: 0,
    },
  };

  return (
    <Box w={1}>
      <Box display="flex" justifyContent="start">
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          sx={{
            ml: {
              xs: 0,
              md: '20px',
            },
            '.MuiButtonBase-root': {
              mb: -1,
              color: 'button.contrastText',
            },
            mb: -1.5,
            svg: {
              fontSize: 20,
              mr: 3,
            },
          }}
          variant={matchesSm ? 'scrollable' : 'standard'}
          value={currentTab}
          onChange={(_event, value) => dispatch(setInnovateTab(value))}
          TabIndicatorProps={{ sx: indicatorSx }}
          visibleScrollbar
        >
          <Tab
            iconPosition="start"
            icon={<FontAwesomeIcon icon={faDiagramNested} />}
            label="Node Tree"
            disableRipple
            sx={tabSx}
          />
          <Tab
            iconPosition="start"
            icon={<FontAwesomeIcon icon={faSquareCode} />}
            label="Markdown"
            disableRipple
            sx={tabSx}
          />
          <Tab
            iconPosition="start"
            icon={<FontAwesomeIcon icon={faChartNetwork} />}
            label="Workflow"
            disableRipple
            sx={tabSx}
          />
          <Tab
            iconPosition="start"
            icon={<FontAwesomeIcon icon={faGamepadModern} />}
            label="And More"
            disableRipple
            sx={tabSx}
          />
          {/* <Tab label="Media" disableRipple sx={tabSx} /> */}
        </Tabs>
      </Box>
      <Box mt={3}>
        <AnimateOnView>
          <Section overflow={currentTab === 0 ? 'initial' : 'hidden'}>
            {currentTab === 0 && <LandingPageTree />}
            {currentTab === 1 && <LandingPageMarkdown />}
            {currentTab === 2 && <LandingPageWorkflow />}
            {currentTab === 3 && <Other />}
          </Section>
        </AnimateOnView>
      </Box>
    </Box>
  );
}
