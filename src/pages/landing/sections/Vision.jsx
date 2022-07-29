import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

export default function Vision() {
  return (
    <Grid
      container
      align="center"
      alignItems="center"
      sx={{
        marginTop: 5,
        padding: 4,
        backgroundColor: '#2f3438',
        borderRadius: 8,
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 50%),'
          + ' 1px 0px 2px -1px rgb(0 0 0 / 50%),'
          + ' -1px -1px 2px -1px rgb(0 0 0 / 25%)',
      }}
    >
      <Grid item xs={12}>
        <Box
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            position="absolute"
            zIndex={1}
            textAlign="left"
            width="52%"
            left="0"
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', minWidth: 380 }}>
              <Typewriter
                options={{ loop: true, delay: 80, deleteSpeed: 0 }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Innovation Collaboration')
                    .pauseFor(2000)
                    .deleteAll(20)
                    .typeString('Crypto Investment')
                    .pauseFor(2000)
                    .deleteAll(20)
                    .start();
                }}
              />
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Platform
            </Typography>
            <ul>
              <li>
                <Typography
                  variant="h6"
                  mt="42px"
                  color="#dfddff"
                  whiteSpace="normal"
                  sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                >
                  create innovation
                </Typography>
              </li>
              <li>
                <Typography
                  variant="h6"
                  color="#dfddff"
                  whiteSpace="normal"
                  mt={2}
                  sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                >
                  collaborate
                </Typography>
              </li>
              <li>
                <Typography
                  variant="h6"
                  color="#dfddff"
                  whiteSpace="normal"
                  mt={2}
                  sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                >
                  get crypto investments
                </Typography>
              </li>
              <li>
                <Typography
                  variant="h6"
                  whiteSpace="normal"
                  mt={2}
                  sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                >
                  issue virtual shares as
                  <b> ERC-20 </b>
                  tokens
                </Typography>
              </li>
            </ul>
          </Box>
          <video
            width="100%"
            height="auto"
            autoPlay
            muted
            loop
            style={{ overflow: 'hidden' }}
          >
            <source src="space.mp4" type="video/mp4" />
          </video>

          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            width="100%"
            height="auto"
            autoPlay
            muted
            loop
            style={{ overflow: 'hidden' }}
          >
            <source src="earth8.mp4" type="video/mp4" />
          </video>
        </Box>
      </Grid>
    </Grid>
  );
}
