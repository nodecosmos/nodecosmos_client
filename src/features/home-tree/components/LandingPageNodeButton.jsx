/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* nodecosmos */
import useNodeButtonBackground from '../hooks/useNodeButtonBackground';
import useNodeTreeEvents from '../hooks/useNodeTreeEvents';
import {
    INITIAL_ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION, MARGIN_TOP, NODE_BUTTON_HEIGHT, TRANSITION_ANIMATION_DURATION,
} from '../constants';
import LandingPageNodeButtonText from './LandingPageNodeButtonText';
import LandingPageNodeToolbar from './LandingPageNodeToolbar';

export default function LandingPageNodeButton(props) {
    const {
        id,
        isRoot,
        nestedLevel,
    } = props;

    const nodeExpanded = useSelector((state) => state.landingPageNodes[id].expanded);
    const currentNodeId = useSelector((state) => state.app.currentNodeId);
    const isEditing = useSelector((state) => state.landingPageNodes[id].isEditing);
    const isNew = useSelector((state) => state.landingPageNodes[id].isNew);

    const { onNodeClick } = useNodeTreeEvents({ id });
    const {
        outlineColor, backgroundColor, color, hashColor,
    } = useNodeButtonBackground({ id, nestedLevel, isRoot });

    const isCurrentNode = nodeExpanded && id === currentNodeId;

    const nodePosition = useSelector((state) => state.landingPageNodes[id].position);
    const x = nodePosition.xEnds;
    const y = nodePosition.y - MARGIN_TOP;

    return (
        <Box
            component="g"
            sx={{
                opacity: 0,
                animation: `node-button-appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
            }}
        >
            <foreignObject
                className="NodeName"
                width="500"
                height={NODE_BUTTON_HEIGHT + 6}
                x={x}
                y={y}
                style={{
                    transition: isNew ? null : `y ${TRANSITION_ANIMATION_DURATION}ms`,
                }}
            >
                <Box display="flex" width="100%">
                    <Box
                        component={isEditing ? 'div' : Button}
                        onClick={onNodeClick}
                        onKeyUp={(event) => event.preventDefault()}
                        display="inline-flex"
                        alignItems="center"
                        {...(!isEditing && { disableRipple: true })}
                        sx={{
                            transition: 'none',
                            border: 1,
                            borderColor: outlineColor,
                            height: NODE_BUTTON_HEIGHT,
                            backgroundColor,
                            color,
                            input: {
                                color,
                            },
                            '&:hover': {
                                backgroundColor,
                                outlineColor: 'tree.default',
                            },
                            borderRadius: 1.25,
                            p: '0px 12px',
                            cursor: 'pointer',
                            boxShadow: 'buttons.1',
                            whiteSpace: 'nowrap',
                            '.fa-hashtag': {
                                fontSize: 14,
                                color: hashColor,
                            },
                        }}
                    >
                        <FontAwesomeIcon icon={faHashtag} />
                        <LandingPageNodeButtonText id={id} />
                    </Box>
                    <Box filter="none">
                        {isCurrentNode && <Box className="NodeActions" sx={{ ml: 1 }}><LandingPageNodeToolbar id={id} /></Box>}
                    </Box>
                </Box>
            </foreignObject>
        </Box>
    );
}

LandingPageNodeButton.propTypes = {
    id: PropTypes.string.isRequired,
    isRoot: PropTypes.bool.isRequired,
    nestedLevel: PropTypes.number.isRequired,
};
