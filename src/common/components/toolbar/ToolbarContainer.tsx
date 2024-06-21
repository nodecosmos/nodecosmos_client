import { HEADER_HEIGHT } from '../../../features/app/constants';
import { Box } from '@mui/material';
import React from 'react';

interface Props {
    children: React.ReactNode;
    round?: boolean;
    size?: string | number;
    fontSize?: string | number;
    ml?: number;
    mr?: number;
    hasText?: boolean;
    hasBg?: boolean;
    borderRadius?: number | string;
    showIndicator?: boolean;
    hoverColor?: string;
    activeColor?: string;
    overflowX?: string;
}

export default function ToolbarContainer(props: Props) {
    const {
        children, round = true, size = HEADER_HEIGHT, ml = 0, mr = 0, hasText = false, hasBg = false, fontSize = '1rem',
        borderRadius = 0, showIndicator = true, hoverColor = 'toolbar.hover', activeColor = 'toolbar.active',
        overflowX = 'hidden',
    } = props;

    return (
        <Box
            className="Toolbar"
            sx={{
                overflowX,
                '.ButtonWrapper': {
                    ml,
                    mr,
                    whiteSpace: 'nowrap',
                    '&:hover': {
                        button: {
                            borderRadius: round ? '50%' : borderRadius,
                            backgroundColor: hoverColor,
                        },
                    },
                    '&.active': {
                        button: {
                            backgroundColor: activeColor,
                            borderRadius,
                        },
                    },

                    button: {
                        backgroundColor: hasBg ? activeColor : 'transparent',
                        fontWeight: 500,
                        borderBottom: showIndicator ? 3 : 0,
                        borderColor: 'transparent',
                        height: size,
                        minWidth: size,
                        borderRadius,
                        '&.active': {
                            backgroundColor: activeColor,
                            borderColor: 'inherit',
                            borderRadius,
                        },
                        svg: {
                            ml: hasText ? 1.5 : 0,
                            fontSize,
                        },
                    },
                },
            }}
        >
            {children}
        </Box>
    );
}
