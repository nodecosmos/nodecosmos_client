import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setHomepageTab } from '../homeSlice';
import AnimateOnView from './AnimateOnView';
import Section from './Section';

export default function OpenSource() {
  const dispatch = useDispatch();

  return (
    <Box mt={{
      xs: 8,
      md: 32,
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
              src="home/node-link-3.svg"
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
            mb={8}
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
            <Box component="span" color="#cdd4ff" fontWeight="bold">
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
              src="home/node-link-3.svg"
              alt="node-handle"
              style={{
                width: '75%',
                marginTop: 8,
              }}
            />
          </AnimateOnView>
        </Box>
      </Box>
      <Box mt={{
        xs: 0,
        md: 1,
      }}
      >
        <AnimateOnView delay={1000}>
          <Section elevation={2} padding={6}>
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
            <Box ml={2} mt={2}>
              <Typography
                variant="h6"
                fontFamily="'Roboto Mono', sans-serif"
              >

                One of the most powerful concepts in software development is
                {' '}
                <Box
                  component="a"
                  color="#cdd4ff"
                  sx={{
                    cursor: 'pointer',
                  }}
                  href="https://en.wikipedia.org/wiki/Open_source"
                  target="_blank"
                >
                  Open Source
                </Box>
                .
              </Typography>
            </Box>

            <Box ml={2}>
              <Typography
                variant="h6"
                fontFamily="'Roboto Mono', sans-serif"
                mt={2}
              >
                It enables engineers and companies to openly collaborate on solutions
                that benefit the entire community.
              </Typography>
            </Box>

            <Box ml={2}>
              <Typography
                variant="h6"
                fontFamily="'Roboto Mono', sans-serif"
                mt={2}
              >
                What if we applied this concept to other areas in a more structured manner than is currently possible?
              </Typography>
            </Box>

            <Box ml={2}>
              <Typography
                variant="h6"
                fontFamily="'Roboto Mono', sans-serif"
                mt={2}
              >
                By utilizing this concept, you are opening your innovation to the community
                that can help you from the beginning down to the finest details via
                {' '}
                <Box
                  component="span"
                  color="#cdd4ff"
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => dispatch(setHomepageTab(1))}
                  target="_blank"
                >
                  Contribution Request
                </Box>
                {' '}
                features.
              </Typography>
            </Box>

            <Box ml={2}>
              <Typography
                variant="h6"
                fontFamily="'Roboto Mono', sans-serif"
                mt={2}
              >
                Nodecosmos will allow users to freely collaborate on public nodes.
              </Typography>
            </Box>

            <Box ml={2}>
              <Typography
                variant="h6"
                fontFamily="'Roboto Mono', sans-serif"
              />
            </Box>
            <Typography
              mt={2}
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
          </Section>
        </AnimateOnView>
      </Box>
    </Box>
  );
}
