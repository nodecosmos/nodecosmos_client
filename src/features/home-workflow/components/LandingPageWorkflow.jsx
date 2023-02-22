import React from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { setCurrentWorkflowStep } from '../landingPageWorkflowSlice';
import LandingPageWorkflowStepDescription from './LandingPageWorkflowStepDescription';

// DUMB IMPLEMENTATION FOR LANDING PAGE
export default function LandingPageWorkflow() {
  const dispatch = useDispatch();
  const setStep = (step) => {
    dispatch(setCurrentWorkflowStep(step));
  };

  const theme = useTheme();

  const {
    default: defaultColor,
    level1,
    level2,
    level3,
  } = theme.palette.tree;

  return (
    <Box
      display={{
        xs: 'block',
        md: 'flex',
      }}
      sx={{
        width: 1,
        mb: -4,
      }}
    >

      <Box
        width={{
          xs: 1,
          md: '38.19700%',
        }}
        height={{
          xs: 400,
          sm: 800,
        }}
        borderRight={{
          xs: 0,
          md: 1,
        }}
        borderColor={{
          xs: 'borders.box.xs',
          md: 'borders.box.md',
        }}
        boxShadow={{
          xs: 'container.right.xs',
          md: 'container.right.md',
        }}
        zIndex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          width={100}
          height={450}
          sx={{
            transform: {
              xs: 'scale(0.7)',
              sm: 'scale(1)',
            },
          }}
        >
          <Box
            component="g"
            sx={{
              transform: 'translate(-150px, -148px)',
            }}
          >
            <g
              onClick={() => {
                setStep({
                  title: 'Step 1',
                  description: 'Plane starting procedure!',
                });
              }}
            >
              <circle
                cx="200"
                cy="180"
                r="30"
                fill="transparent"
                stroke={level1}
                strokeWidth={2}
                cursor="pointer"
              />
              <text
                x="200"
                y="185"
                textAnchor="middle"
                style={{
                  fontSize: 14,
                  fill: theme.palette.text.contrast,
                  cursor: 'pointer',
                }}
              >
                Start
              </text>
            </g>
            <g
              onClick={() => {
                setStep({
                  title: 'Step 2',
                  description: 'Takeoff is the phase of flight in which an aerospace vehicle '
                      + 'leaves the ground and becomes airborne.',
                });
              }}
            >
              <path
                strokeWidth={2}
                d="M 200 211 L 200 261"
                stroke={defaultColor}
                fill="transparent"
              />
              <rect
                rx="5"
                x="150"
                y="261"
                fill="transparent"
                stroke={level2}
                strokeWidth={1}
                cursor="pointer"
                width="100"
                height="40"
              />
              <text
                x="200"
                y="285"
                textAnchor="middle"
                style={{
                  fontSize: 14,
                  fill: theme.palette.text.contrast,
                  cursor: 'pointer',
                }}
              >
                Take off
              </text>
            </g>
            <path
              strokeWidth={2}
              d="M 200 302 L 200 352"
              stroke={defaultColor}
              fill="transparent"
            />
            <g
              onClick={() => {
                setStep({
                  title: 'Step 3',
                  description: 'Flying is the process by which an object moves through a space without contacting any '
                      + 'planetary surface, either within an atmosphere or through the '
                      + 'vacuum of outer space. ',
                });
              }}
            >
              <rect
                rx="5"
                x="150"
                y="352"
                fill="transparent"
                stroke={level2}
                strokeWidth={1}
                cursor="pointer"
                width="100"
                height="40"
              />
              <text
                x="200"
                y="376"
                textAnchor="middle"
                style={{
                  fontSize: 14,
                  fill: theme.palette.text.contrast,
                  cursor: 'pointer',
                }}
              >
                Fly
              </text>
            </g>
            <path
              strokeWidth={2}
              d="M 200 393 L 200 443"
              stroke={defaultColor}
              fill="transparent"
            />
            <g
              onClick={() => {
                setStep({
                  title: 'Step 4',
                  description: 'Landing is the last part of a flight, where aircraft  returns to the ground.',
                });
              }}
            >
              <rect
                rx="5"
                x="150"
                y="443"
                fill="transparent"
                stroke={level2}
                strokeWidth={1}
                cursor="pointer"
                width="100"
                height="40"
              />
              <text
                x="200"
                y="467"
                textAnchor="middle"
                style={{
                  fontSize: 14,
                  fill: theme.palette.text.contrast,
                  cursor: 'pointer',
                }}
              >
                Land
              </text>
            </g>
            <path
              strokeWidth={2}
              d="M 200 484 L 200 534"
              stroke={defaultColor}
              fill="transparent"
            />
            <g
              onClick={() => {
                setStep({
                  title: 'Step 5',
                  description: 'Plane stopping procedure!',
                });
              }}
            >
              <circle
                cx="200"
                cy="564"
                r="30"
                fill="transparent"
                stroke={level3}
                strokeWidth={2}
                cursor="pointer"
              />
              <text
                x="200"
                y="569"
                textAnchor="middle"
                style={{
                  fontSize: 14,
                  fill: theme.palette.text.contrast,
                  cursor: 'pointer',
                }}
              >
                Stop
              </text>
            </g>
          </Box>
        </Box>
      </Box>
      <Box width={{
        xs: 1,
        md: '61.80300%',
      }}
      >
        <LandingPageWorkflowStepDescription />
      </Box>
    </Box>
  );
}
