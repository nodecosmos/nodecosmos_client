import { Typography, Box } from '@mui/material';
import React from 'react';
import AnimateOnView from './AnimateOnView';
import Section from './Section';

export default function OpenSource() {
  return (
    <Box mt={{
      md: 7,
      xs: 5,
    }}
    >
      <AnimateOnView threshold={0.9}>
        <Typography
          variant="h4"
          textAlign="center"
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
          <Box component="span" color="#d09dff" fontWeight="bold">
            {' '}
            Open Source
            {' '}
          </Box>
        </Typography>
      </AnimateOnView>
      <Box mt={5}>
        <AnimateOnView threshold={0.9} delay={200}>
          <Section>
            <Typography
              fontSize={25}
              fontFamily="Roboto Mono"
              fontWeight="bold"
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
              mt={3}
              pl="40px"
              sx={{
                listStyle: 'none',
              }}
            >
              <li>
                <Typography
                  fontFamily="'Roboto Mono',sans-serif"
                  mt={3}
                >
                  One of the most powerful things about software development is
                  {' '}
                  <Box
                    component="a"
                    fontWeight="bold"
                    color="#d09dff"
                    sx={{
                      cursor: 'pointer',
                      borderBottom: '4px solid #d09dff',
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
                  fontFamily="'Roboto Mono',sans-serif"
                  mt={3}
                >
                  It enables companies and engineers to collaborate on open source projects
                  and integrate them into their own products.
                </Typography>
              </li>
              <li>
                <Typography
                  fontFamily="'Roboto Mono',sans-serif"
                  mt={3}
                >
                  What if we take this concept and apply it to other areas?
                </Typography>
              </li>
              <li>
                <Typography
                  fontFamily="'Roboto Mono',sans-serif"
                  mt={3}
                >
                  Nodecosmos plans to cover that gap by providing a platform that allows users
                  to freely collaborate on projects that are not limited to software.
                </Typography>
              </li>
            </Box>

            <Box mt={3}>
              <Typography
                fontSize={25}
                fontFamily="Roboto Mono"
                fontWeight="bold"
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
          </Section>
        </AnimateOnView>
      </Box>
    </Box>
  );
}
