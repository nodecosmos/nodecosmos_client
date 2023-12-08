import AnimateOnView from './AnimateOnView';
import LandingPageTree from './innovate/LandingPageTree';
import LandingPageWorkflow from './innovate/LandingPageWorkflow';
import Section from './Section';
import { setCurrentNode } from '../../app/appSlice';
import { setInnovateTab } from '../homeSlice';
import { faDiagramNested, faChartNetwork } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Tab, Tabs, Box, useMediaQuery, useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
            <Box display="flex" justifyContent="s">
                <Tabs
                    textColor="secondary"
                    indicatorColor="secondary"
                    sx={{
                        '.MuiButtonBase-root': {
                            mb: -1,
                            color: 'button.contrastText',
                        },
                        mb: -1.5,
                        svg: { fontSize: 24 },
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
                        icon={<FontAwesomeIcon icon={faChartNetwork} />}
                        label="Workflow"
                        disableRipple
                        sx={tabSx}
                    />
                </Tabs>
            </Box>
            <Box mt={3}>
                <AnimateOnView>
                    <Section overflow={currentTab === 0 ? 'initial' : 'hidden'}>
                        {currentTab === 0 && <LandingPageTree />}
                        {currentTab === 1 && <LandingPageWorkflow />}
                    </Section>
                </AnimateOnView>
            </Box>
        </Box>
    );
}
