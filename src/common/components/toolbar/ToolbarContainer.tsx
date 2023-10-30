import { HEADER_HEIGHT } from '../../../features/app/constants';
import { Box } from '@mui/material';
import React from 'react';

interface Props {
    children: React.ReactNode;
    round?: boolean;
    size?: string | number;
    ml?: number;
    mr?: number;
    fontSize?: string;
    hasText?: boolean;
    borderRadius?: number;
    showIndicator?: boolean;
    hoverColor?: string;
    activeColor?: string;
}

export default function ToolbarContainer(props: Props) {
    const {
        children, round = true, size = HEADER_HEIGHT, ml = 0, mr = 0, fontSize = '1rem', hasText = false,
        borderRadius = 0, showIndicator = true, hoverColor = 'toolbar.hover', activeColor = 'toolbar.active',
    } = props;

    return (
        <Box
            className="Toolbar"
            sx={{
                '.ButtonWrapper': {
                    ml,
                    mr,
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
                        p: 0,
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
