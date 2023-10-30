import AnimateOnView from './AnimateOnView';
import OpenSourceLink1 from './open-source/OpenSourceLink1';
import OpenSourceLink2 from './open-source/OpenSourceLink2';
import OpenSourceLink3 from './open-source/OpenSourceLink3';
import OpenSourceLink4 from './open-source/OpenSourceLink4';
import OpenSourceLink5 from './open-source/OpenSourceLink5';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function OpenSource() {
    return (
        <Box mt={8}>
            <Box display="flex" alignItems="center" justifyContent="center">
                <AnimateOnView>
                    <Typography
                        variant="h4"
                        variantMapping={{ h4: 'h3' }}
                        textAlign="center"
                        fontSize={{
                            xs: '28px',
                            sm: '32px',
                        }}
                        fontFamily="Comfortaa, sans-serif"
                    >
            Explore possibilities with
                        <Box component="span" color="secondary.main" fontWeight="bold">
                            {' '}
              Open Collaboration
                            {' '}
                        </Box>
                    </Typography>
                </AnimateOnView>
            </Box>
            <Box sx={{
                transform: {
                    xs: 'scale(1.1) translateX(-10px)',
                    sm: 'scale(1)',
                },
                mt: {
                    xs: 8,
                    sm: 3,
                },
            }}
            >
                <OpenSourceLink1 />
                <OpenSourceLink2 />
                <OpenSourceLink3 />
                <OpenSourceLink4 />
                <OpenSourceLink5 />
            </Box>
        </Box>
    );
}
