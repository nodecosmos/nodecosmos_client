import React, { useEffect } from 'react';
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNode } from '../../app/appSlice';
import { setInnovateTab } from '../homeSlice';
import AnimateOnView from './AnimateOnView';
import Other from './innovate/AndMore';
import LandingPageMarkdown from './innovate/LandingPageMarkdown';
import LandingPageTree from './innovate/LandingPageTree';
import Workflow from './innovate/LandingPageWorkflow';
import Section from './Section';

const PRESELECTED_NODE_ID = '635a91ea690cc413ead79ce2';

export default function Innovate() {
  const currentTab = useSelector((state) => state.home.innovateTab);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentNode(PRESELECTED_NODE_ID));
  }, [dispatch]);

  const tabSx = {
    fontWeight: 'normal',
    fontFamily: '\'Roboto mono\', monospace',
    mr: 3,
    '&.Mui-selected': {
      color: '#ff0066',
    },
  };

  const indicatorSx = {
    backgroundColor: '#ff0066',
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
    <Box
      mt={8}
      w={1}
    >
      <Tabs
        sx={{
          ml: {
            xs: 0,
            md: '20px',
          },
          mb: -2,
        }}
        variant="scrollable"
        value={currentTab}
        onChange={(_event, value) => dispatch(setInnovateTab(value))}
        TabIndicatorProps={{ sx: indicatorSx }}
        visibleScrollbar
      >
        <Tab label="Node Tree" disableRipple sx={tabSx} />
        <Tab label="Markdown" disableRipple sx={tabSx} />
        <Tab label="Workflow" disableRipple sx={tabSx} />
        <Tab label="And More" disableRipple sx={tabSx} />
        {/* <Tab label="Media" disableRipple sx={tabSx} /> */}
      </Tabs>
      <Box mt={3}>
        <AnimateOnView>
          <Section borderRadius={{
            xs: 2,
            sm: 3,
            md: 5,
          }}
          >
            {currentTab === 0 && <LandingPageTree />}
            {currentTab === 1 && <LandingPageMarkdown />}
            {currentTab === 2 && <Workflow />}
            {currentTab === 3 && <Other />}
          </Section>
        </AnimateOnView>
      </Box>
    </Box>
  );
}
