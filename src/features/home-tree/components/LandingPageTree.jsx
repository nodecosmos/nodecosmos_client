import LandingPageNestedNodes from './LandingPageNestedNodes';
import LandingPageNode from './LandingPageNode';
import LandingPageNodeDescription from './LandingPageNodeDescription';
import SwipeableEdgeDrawer from './LandingPageSwipeableNodeDescMobile';
import LandingPageTransformable from './LandingPageTransformable';
import { terminateNewNode } from '../landingPageNodeSlice';
import {
    Box, useMediaQuery, useTheme,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import React, { useEffect } from 'react';
/* mui */
import { useDispatch } from 'react-redux';
/* nodecosmos */

export default function LandingPageTree(props) {
    const { id } = props;
    const dispatch = useDispatch();

    useEffect(() => () => {
        dispatch(terminateNewNode());
    }, [dispatch]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div>
            <Box className="Tree">
                <LandingPageTransformable>
                    <g>
                        <LandingPageNode
                            id={id}
                            nestedLevel={0}
                            isRoot
                        >
                            <LandingPageNestedNodes currentNodeId={id} />
                        </LandingPageNode>
                        {!isMobile && <LandingPageNodeDescription />}
                    </g>
                </LandingPageTransformable>

            </Box>
            <Box
                backgroundColor="background.5"
                overflow="hidden"
                position="sticky"
                my={0}
                bottom={0}
                mx={{
                    xs: -3,
                    sm: -4,
                }}
            >
                {isMobile && <SwipeableEdgeDrawer />}
            </Box>
        </div>
    );
}

LandingPageTree.propTypes = { id: PropTypes.string.isRequired };
