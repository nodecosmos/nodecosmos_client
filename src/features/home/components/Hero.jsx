import React from 'react';
import { Box, Typography } from '@mui/material';
import AnimateOnView from './AnimateOnView';

export default function Hero() {
    return (
        <Box
            mt={{
                xs: 4,
                md: 8,
            }}
            mb={{
                xs: 12,
                sm: 30,
                md: 50,
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}
        >
            <Box
                component="img"
                src="hero.svg"
                alt="hero"
                sx={{
                    width: 1,
                    top: {
                        xs: 320,
                        sm: 240,
                        md: 360,
                    },
                    position: 'absolute',
                    animation: 'appear 3s forwards',
                }}
            />
            <Box
                display="flex"
                justifyContent={{
                    xs: 'center',
                    sm: 'space-between',
                    md: 'center',
                }}
                flexDirection={{
                    xs: 'column',
                    sm: 'row',
                }}
                alignItems={{
                    xs: 'flex-start',
                    sm: 'center',
                }}
                width={{
                    xs: 'auto',
                    sm: 1,
                }}
                gap={2}
            >
                <AnimateOnView delay={200}>
                    <Typography
                        variant="h1"
                        fontSize={{
                            xs: 44,
                            sm: 54,
                            md: 85,
                            lg: 90,
                        }}
                        color="text.primary"
                        fontFamily="'Cherry Bomb One', sans-serif"
                        sx={{
                            maxWidth: {
                                xs: 300,
                                sm: 340,
                                md: 517,
                                lg: 600,
                            },
                        }}
                    >
            Innovation Collaboration Platform
                    </Typography>
                </AnimateOnView>
                <Box
                    component="ul"
                    variant="h6"
                    fontFamily="'Cherry Bomb One', sans-serif"
                    fontSize={{
                        xs: 20,
                        sm: 24,
                        md: 31,
                    }}
                    fontWeight={700}
                    textAlign="left"
                    lineHeight={1.5}
                    mt={1.5}
                    color="text.tertiary"
                    sx={{
                        mt: 2,
                        width: 'fit-content',
                        p: 0,
                        m: 0,
                        listStyle: 'none',
                        WebkitTextFillColor: 'transparent',
                        WebkitTextStrokeWidth: 1,
                        'li:not(:last-child)': {
                            mb: {
                                xs: 1,
                                md: 4,
                            },
                        },
                    }}
                >
                    <Box component="li" color="tree.backgrounds.1">
                        <AnimateOnView delay={300}>
              💡 Share Your Innovation
                        </AnimateOnView>
                    </Box>
                    <Box component="li" color="tree.backgrounds.3">
                        <AnimateOnView delay={450}>
              👩‍💻 Connect With Communities
                        </AnimateOnView>
                    </Box>
                    <Box component="li" color="tree.backgrounds.4">
                        <AnimateOnView delay={600}>
              🔧 Get Contributions
                        </AnimateOnView>
                    </Box>
                    <AnimateOnView delay={750}>
                        <Box component="li" color="tree.backgrounds.5">
              ✨ And much more...
                        </Box>
                    </AnimateOnView>
                </Box>
            </Box>
        </Box>
    );
}
