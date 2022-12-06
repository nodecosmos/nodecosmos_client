import React from 'react';
import { Typography, Box, Card } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setHomepageTab } from '../homeSlice';
import AnimateOnView from './AnimateOnView';

export default function OpenSource() {
  const dispatch = useDispatch();

  const typographySx = {
    fontFamily: "'Roboto Mono', monospace",
    // letterSpacing: '-0.01em',
    fontWeight: '300',
    fontSize: 20,
    color: '#9aa3b0',
  };

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
            <img src="node-link-3.svg" alt="node-handle" style={{ width: '75%', marginTop: 8 }} />
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
              Open Collaboration
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
            mt: {
              xs: 0,
              md: 2,
            },
            backgroundColor: 'transparent',
          }}
        >
          <Box>
            <Box display="flex" alignItems="stretch">
              <Box m={4}>
                <Typography
                  fontSize={{
                    xs: 20,
                    sm: 25,
                  }}
                  fontFamily="'Montserrat',sans-serif"
                  textAlign="left"
                  sx={{
                    background: {
                      xs: 'linear-gradient(35deg, #c666ff 0%, #ff2d65 36%)',
                      sm: 'linear-gradient(35deg, #c666ff 0%, #ff2d65 12%)',
                    },
                    WebkitBackgroundClip: 'text!important',
                    backgroundClip: 'text!important',
                    WebkitTextFillColor: 'transparent!important',
                    WebkitBoxDecorationBreak: 'clone',
                    color: '#f2caff',
                    // textShadow: '0 0 4px #f2caff47',
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
                    <Typography sx={typographySx} mt={3}>
                      One of the most powerful concepts in software development is
                      {' '}
                      <Box
                        component="a"
                        color="#e4cdff"
                        sx={{
                          cursor: 'pointer',
                          lineHeight: 2,
                        }}
                        href="https://en.wikipedia.org/wiki/Open_source"
                        target="_blank"
                      >
                        Open Source.
                      </Box>
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={typographySx} mt={3}>
                      It enables engineers and companies to openly collaborate on solutions
                      that can be embedded in any product.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      fontFamily="'Roboto Mono', monospace"
                      sx={{
                        color: '#9aa3b0',
                      }}
                      my={4}
                    >
                      What if we take this concept and apply it to other areas?
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={typographySx} mt={3}>
                      By utilizing this concept, you are opening your innovation to the community
                      that can help you from the beginning down to the finest details via
                      {' '}
                      <Box
                        component="span"
                        // fontWeight="bold"
                        color="#e4cdff"
                        sx={{
                          cursor: 'pointer',
                          lineHeight: 2,
                        }}
                        onClick={() => dispatch(setHomepageTab(1))}
                        target="_blank"
                      >
                        Contribution Request
                      </Box>
                      {' '}
                      features.
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={typographySx} mt={3}>
                      Nodecosmos will allow users to freely collaborate on public nodes.
                    </Typography>
                  </li>
                </Box>

                <Typography
                  fontSize={{
                    xs: 20,
                    sm: 25,
                  }}
                  fontFamily="'Montserrat',sans-serif"
                  textAlign="left"
                  sx={{
                    background: {
                      xs: 'linear-gradient(35deg, #c666ff 0%, #ff2d65 36%)',
                      sm: 'linear-gradient(35deg, #c666ff 0%, #ff2d65 12%)',
                    },
                    WebkitBackgroundClip: 'text!important',
                    backgroundClip: 'text!important',
                    WebkitTextFillColor: 'transparent!important',
                    WebkitBoxDecorationBreak: 'clone',
                    color: '#f2caff',
                    // textShadow: '0 0 4px #f2caff47',
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
