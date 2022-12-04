import React from 'react';
import { Typography, Box, Card } from '@mui/material';
import AnimateOnView from './AnimateOnView';

export default function OpenSource() {
  return (
    <Box mt={{
      xs: 5,
      md: 7,
    }}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box
          display={{
            xs: 'none',
            md: 'block',
          }}
        >
          <AnimateOnView delay={600}>
            <img
              src="node-link-3.svg"
              alt="node-handle"
              style={{
                width: '75%',
                marginTop: 8,
              }}
            />
          </AnimateOnView>
        </Box>
        <AnimateOnView>
          <Typography
            variant="h4"
            textAlign="center"
            mb={5}
            lineHeight={{
              xs: 1.3,
              sm: 1,
            }}
            fontSize={{
              xs: '28px',
              sm: '32px',
            }}
          >
            Explore possibilities with
            <Box component="span" color="#e4cdff" fontWeight="bold">
              {' '}
              Open Source
              {' '}
            </Box>
          </Typography>
        </AnimateOnView>

        <Box sx={{
          transform: 'scaleX(-1)',
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
        >
          <AnimateOnView delay={600}>
            <img
              src="node-link-3.svg"
              alt="node-handle"
              style={{
                width: '75%',
                marginTop: 8,
              }}
            />
          </AnimateOnView>
        </Box>
      </Box>
      <AnimateOnView delay={1000}>
        <Card
          elevation={2}
          sx={{
            borderTop: '1px solid #3c4149',
            p: 0,
            mt: 3,
            backgroundColor: '#31353c',
          }}
        >
          <Box>
            <Box display="flex" alignItems="stretch">
              <Box m={4}>
                <Typography
                  fontSize={25}
                  fontFamily="'Montserrat',sans-serif"
                  fontWeight="900"
                  textAlign="left"
                  sx={{
                    background: 'linear-gradient(35deg, #c666ff 0%, #ff2d65 12%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    WebkitBoxDecorationBreak: 'clone',
                    color: '#d09dff',
                    lineHeight: 1,
                  }}
                >
                  {'<'}
                  source=
                  <Box
                    component="span"
                    sx={{
                      color: '#7fff92',
                      WebkitTextFillColor: '#7fff92',
                    }}
                  >
                    &quot;open&quot;
                  </Box>
                  {'>'}
                </Typography>
                <Box
                  component="ul"
                  pl={0}
                  m={3}
                  ml={{
                    xs: 3,
                    md: 4,
                  }}
                  sx={{
                    listStyle: 'none',
                  }}
                >
                  <li>
                    <Typography
                      fontFamily="'Roboto Mono', monospace"
                    >
                      One of the most powerful concepts in software development is
                      {' '}
                      <Box
                        component="a"
                        fontWeight="bold"
                        color="#e4cdff"
                        sx={{
                          cursor: 'pointer',
                          borderBottom: '4px solid #e4cdff',
                          lineHeight: 2,
                        }}
                        href="https://en.wikipedia.org/wiki/Open_source"
                        target="_blank"
                      >
                        Open Source
                      </Box>
                      .
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      fontFamily="'Roboto Mono', monospace"
                      mt={3}
                    >
                      It enables companies and engineers to collaborate on projects which
                      can be integrated into their own products.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      fontFamily="'Roboto Mono', monospace"
                      mt={3}
                    >
                      What if we take this concept and apply it to other areas?
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      fontFamily="'Roboto Mono', monospace"
                      mt={3}
                    >
                      Nodecosmos plans to cover that gap by providing a platform that allows users
                      to freely collaborate on projects that are not limited to software.
                    </Typography>
                  </li>
                </Box>

                <Typography
                  fontSize={25}
                  fontFamily="'Montserrat',sans-serif"
                  fontWeight="900"
                  textAlign="left"
                  sx={{
                    background: 'linear-gradient(35deg, #c666ff 0%, #ff2d65 12%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    WebkitBoxDecorationBreak: 'clone',
                    color: '#d09dff',
                    lineHeight: 1,
                  }}
                >
                  {'</'}
                  source
                  {'>'}
                  &#32;&#32;&#32;&#32;&#32;
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </AnimateOnView>
    </Box>
  );
}
