import React from 'react';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import Transformable from '../landing-page-tree/Transformable';
import { setCurrentWorkflowStep } from './landingPageWorkflowSlice';
import WorkflowStepDescriptionMd from './WorkflowStepDescriptionMd';
import WorkflowStepDescriptionSm from './WorkflowStepDescriptionSm';

// DUMB IMPLEMENTATION FOR LANDING PAGE
export default function Workflow() {
  const dispatch = useDispatch();
  const setStep = (step) => {
    dispatch(setCurrentWorkflowStep(step));
  };

  return (
    <Box>
      <WorkflowStepDescriptionSm />
      <Transformable treeHeight={790}>
        <g>
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
              stroke="#ff306b"
              strokeWidth={2}
              cursor="pointer"
            />
            <text
              x="200"
              y="185"
              textAnchor="middle"
              style={{
                fontSize: 14,
                fill: '#fff',
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
              stroke="#414650"
              fill="transparent"
            />
            <rect
              rx="5"
              x="150"
              y="261"
              fill="transparent"
              stroke="#c1ff68"
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
                fill: '#fff',
                cursor: 'pointer',
              }}
            >
              Take off
            </text>
          </g>
          <path
            strokeWidth={2}
            d="M 200 302 L 200 352"
            stroke="#414650"
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
              stroke="#c1ff68"
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
                fill: '#fff',
                cursor: 'pointer',
              }}
            >
              Fly
            </text>
          </g>
          <path
            strokeWidth={2}
            d="M 200 393 L 200 443"
            stroke="#414650"
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
              stroke="#c1ff68"
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
                fill: '#fff',
                cursor: 'pointer',
              }}
            >
              Land
            </text>
          </g>
          <path
            strokeWidth={2}
            d="M 200 484 L 200 534"
            stroke="#414650"
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
              stroke="#58deff"
              strokeWidth={2}
              cursor="pointer"
            />
            <text
              x="200"
              y="569"
              textAnchor="middle"
              style={{
                fontSize: 14,
                fill: '#fff',
                cursor: 'pointer',
              }}
            >
              Stop
            </text>
          </g>
          <WorkflowStepDescriptionMd />
        </g>
      </Transformable>
    </Box>
  );
}
