import React from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { scrollIntoView } from 'seamless-scroll-polyfill';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

export default function ContributionRequest() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const viewBox = isMobile ? '0 0 370 364' : '0 0 512 364';

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <Box
      component="svg"
      width={1}
      height={1}
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        transformOrigin: 'top left',
      }}
      viewBox={viewBox}
    >
      <g style={{ transform: 'translate(-44px, -34px)' }}>
        <g>
          <circle cx="50" cy="40" r="6" fill="#414650" />
        </g>
        <g>
          <g>
            <path
              strokeWidth="3.5"
              d="M 50 43.75
                     C 50 43.75
                       49 51.625
                       50 69.5
                     L 50 69.5
                     C 50 69.5
                       50 79.5
                       58 79.5
                     L 95 79.5"
              stroke="#414650"
              fill="transparent"
            />
            <circle
              cx="95"
              cy="79.5"
              r="5.5"
              fill="#b764ff"
            />
          </g>
          <foreignObject className="NodeName" width="100%" height="29" x="110" y="65">
            <Typography
              fontWeight="bold"
              color="#a793ff"
              sx={{
                background: 'linear-gradient(35deg, #f14bff 0%, #ff366c 45%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitBoxDecorationBreak: 'clone',
                color: '#a793ff',
                letterSpacing: 1.1,
                mt: { xs: '6px', sm: 0 },
                fontSize: { xs: 14, sm: 20 },
              }}
            >
              Create Contribution Request
            </Typography>
          </foreignObject>
          <g>
            <g>
              <path
                strokeWidth="3.5"
                d="M 95 86
                       C 95 86
                         94 91.375
                         95 109.25
                       L 95 109.25
                       C 95 109.25
                         95 119.25
                         103 119.25
                       L 140 119.25"
                stroke="#414650"
                fill="transparent"
              />
              <circle
                cx="140"
                cy="119.25"
                r="5.5"
                fill="#414650"
              />
            </g>
            <foreignObject className="NodeName" width="100%" height="29" x="155" y="105">
              <Typography
                color="#8b949e"
                fontSize={{ xs: 14, sm: 18 }}
              >
                Add/Remove/Update Nodes in the
                {' '}
                <Box
                  component="span"
                  color="#e4cdff"
                  fontWeight="bold"
                  sx={{
                    cursor: 'pointer',
                    borderBottom: '6px solid #e4cdff',
                  }}
                  onClick={() => scrollIntoView(document.getElementById('innovate'))}
                >
                  tree
                </Box>
              </Typography>
            </foreignObject>
          </g>
          <g>
            <g>
              <path
                strokeWidth="3.5"
                d="M 95 85
                       C 95 85
                         94 111.625
                         95 149
                       L 95 149
                       C 95 149
                         95 159
                         103 159
                       L 140 159"
                stroke="#414650"
                fill="transparent"
              />
              <circle cx="140" cy="159" r="5.5" fill="#414650" />
            </g>
            <foreignObject className="NodeName" width="100%" height="29" x="155" y="145">
              <Typography
                color="#8b949e"
                fontSize={{ xs: 14, sm: 18 }}
              >
                Add/Remove/Update Workflow
              </Typography>
            </foreignObject>
          </g>
          <g>
            <g>
              <path
                strokeWidth="3.5"
                d="M 95 86
                       C 95 124
                         94 151.375
                         95 188.75
                       L 95 188.75
                       C 95 188.75
                         95 198.75
                         103 198.75
                       L 140 198.75"
                stroke="#414650"
                fill="transparent"
              />
              <circle cx="140" cy="198.75" r="5.5" fill="#414650" />
            </g>
            <foreignObject className="NodeName" width="100%" height="29" x="155" y="185">
              <Typography
                color="#8b949e"
                fontSize={{ xs: 14, sm: 18 }}
              >
                Add/Remove/Update Drawing
              </Typography>
            </foreignObject>
          </g>
        </g>
        <g>
          <g>
            <path
              strokeWidth="3.5"
              d="M 50 44.5
                    C 50 44.5
                      49 131.5
                      50 228.5
                    L 50 228.5
                    C 50 228.5
                      50 238.5
                      58 238.5
                    L 95 238.5"
              stroke="#414650"
              fill="transparent"
            />
            <circle
              cx="95"
              cy="238.5"
              r="5.5"
              fill="#b764ff"
            />
          </g>
          <foreignObject className="NodeName" width="100%" height="29" x="110" y="225">
            <Typography
              fontWeight="bold"
              color="#a793ff"
              sx={{
                background: 'linear-gradient(35deg, #f14bff 0%, #ff366c 45%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitBoxDecorationBreak: 'clone',
                color: '#a793ff',
                letterSpacing: 1.1,
                mt: { xs: '6px', sm: 0 },
                fontSize: { xs: 14, sm: 20 },
              }}
            >
              Review Contribution
            </Typography>
          </foreignObject>
          <g>
            <g>
              <path
                strokeWidth="3.5"
                d="M 95 245
                       C 95 245
                         94 250.375
                         95 268.25
                       L 95 268.25
                       C 95 268.25
                         95 278.25
                         103 278.25
                       L 140 278.25"
                stroke="#414650"
                fill="transparent"
              />
              <circle cx="140" cy="278.25" r="5.5" fill="#414650" />
            </g>
            <foreignObject className="NodeName" width="100%" height="29" x="155" y="264">
              <Typography
                color="#8b949e"
                fontSize={{ xs: 14, sm: 18 }}
              >
                Discuss Contribution
              </Typography>
            </foreignObject>
          </g>
          <g>
            <g>
              <path
                strokeWidth="3.5"
                d="M 95 245
                   C 95 245
                     94 270.625
                     95 308
                   L 95 308
                   C 95 308
                     95 318
                     103 318
                   L 140 318"
                stroke="#414650"
                fill="transparent"
              />
              <circle cx="140" cy="318" r="5.5" fill="#414650" />
            </g>
            <foreignObject className="NodeName" width="100%" x="155" y="299" height="29">
              <Box display="flex" alignItems="center">
                <DoneIcon htmlColor="#a3ff48" />
                <Typography
                  ml={2}
                  color="#8298a0"
                  fontSize={{ xs: 14, sm: 18 }}
                >
                  Approve
                </Typography>
                <Box
                  ml={2}
                  mr={2}
                  color="#8298a0"
                  fontSize={{ xs: 14, sm: 18 }}
                >
                  /
                </Box>
                <CloseIcon htmlColor="#ff1a55" />
                <Typography
                  ml={2}
                  color="#8298a0"
                  fontSize={{ xs: 14, sm: 18 }}
                >
                  Reject
                </Typography>
              </Box>
            </foreignObject>
          </g>
          <g>
            <g>
              <path
                strokeWidth="3.5"
                d="M 50 200
                   C 50 300.25
                     49 310.625
                     50 348
                   L 50 348
                   C 50 348
                     50 358
                     58 358
                   L 95 358"
                stroke="#414650"
                fill="transparent"
              />
              <circle
                cx="95"
                cy="358"
                r="5.5"
                fill="#a3ff48"
              />
            </g>
            <foreignObject
              className="NodeName"
              x="115"
              y="345"
              width="425"
              height="80"
            >
              <Typography
                fontWeight="bold"
                color="#a3ff48"
                sx={{ letterSpacing: 1 }}
                fontSize={{ xs: 14, sm: 18 }}
              >
                Merge Contribution Request
              </Typography>
              <Typography
                color="#8b949e"
                fontSize={{ xs: 14, sm: 18 }}
              >
                let contribution become part of your innovation
              </Typography>
            </foreignObject>
          </g>
        </g>
      </g>
    </Box>
  );
}
