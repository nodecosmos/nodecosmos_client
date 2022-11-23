import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentNode } from '../../app/appSlice';
import AnimateOnView from './AnimateOnView';
import LandingPageMarkdown from './innovate/LandingPageMarkdown';
import LandingPageTree from './innovate/LandingPageTree';
import Workflow from './innovate/LandingPageWorkflow';
import Other from './innovate/AndMore';
import Section from './Section';

const PRESELECTED_NODE_ID = '635a91ea690cc413ead79ce2';

export default function Innovate() {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentNode(PRESELECTED_NODE_ID));
  }, [dispatch]);

  const tabSx = {
    fontWeight: 'normal',
    fontFamily: 'Roboto mono',
    mr: 3,
    '&.Mui-selected': {
      color: '#ff0066',
    },
  };

  const indicatorSx = {
    height: 3,
    borderRadius: 2,
    background: '#ff0066',
  };

  return (
    <Box mt={5}>
      <Tabs
        sx={{ ml: 2, mb: -2 }}
        variant="scrollable"
        value={currentPage}
        onChange={(_event, value) => setCurrentPage(value)}
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
          <Section>
            {currentPage === 0 && <LandingPageTree />}
            {currentPage === 1 && <LandingPageMarkdown />}
            {currentPage === 2 && <Workflow />}
            {currentPage === 3 && <Other />}
          </Section>
        </AnimateOnView>
      </Box>
    </Box>
  );
}
