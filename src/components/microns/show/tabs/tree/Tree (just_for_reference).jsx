import React, { useState } from 'react';
import PropTypes from 'prop-types';
/* mui */
import {
  Box, Button, Typography,
} from '@mui/material';
import TagRounded from '@mui/icons-material/TagRounded';
/* micro */
import MicronToolbar from '../../MicronToolbar';

export default function Tree(props) {
  const { micron } = props;
  // const [actionsX, setActionsX] = useState(70);
  // const [actionsY, setActionsY] = useState(0);
  const [actionsOpacity, setActionsOpacity] = useState(0);

  if (!micron) return null;

  const handleMicronClick = (opacity = actionsOpacity === 0 ? 1 : 0) => {
    setActionsOpacity(opacity);
  };

  // const nestedPath = () => {
  //   <path
  //     className="Path animated"
  //     strokeWidth={3}
  //     d={`M ${this.nestedMicronsX} ${this.nestedMicronsY}
  //       L ${this.nestedMicronsX} ${this.nestedMicronsY + 20}
  //       C ${this.nestedMicronsX} ${this.yEdgeLength},
  //         ${this.nestedMicronsX} ${this.yEdgeLength},
  //         ${this.nestedMicronsX + 5} ${this.yEdgeLength}`}
  //     stroke="#43464e"
  //     fill="transparent"
  //   />;
  // };

  return (
    <Box className="Tree" sx={{ p: 4, width: 1, height: 1 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <foreignObject
          className="MicronName"
          width="500px"
          height="50"
          x={30}
          y={0}
        >
          <Box display="flex" width="100%">
            <Button
              onClick={() => handleMicronClick()}
              disableRipple
              startIcon={<TagRounded sx={{ ml: 0, mr: -2 }} />}
            >
              <Typography variant="h6" fontWeight="bold">{micron.title}</Typography>
            </Button>
          </Box>
        </foreignObject>
        <g className="DropShadow">
          <circle cx={20} cy={20} r="5" fill="#43464e" />
          <circle cx={60} cy={60} r="5" fill="#43464e" />
          <path
            className="Path animated"
            strokeWidth={3}
            d="M 20 20 L 20 40 C 20 60, 20 60, 30 60 L 60 60"
            stroke="#43464e"
            fill="transparent"
          />
          <svg x={40} y={40}>
            <circle cx={20} cy={20} r="5" fill="#43464e" />
            <circle cx={60} cy={60} r="5" fill="#43464e" />
            <path
              className="Path animated"
              strokeWidth={3}
              d="M 20 20 L 20 40 C 20 60, 20 60, 30 60 L 60 60"
              stroke="#43464e"
              fill="transparent"
            />
            <foreignObject
              className="MicronName"
              width="500px"
              height="50"
              x={30}
              y={0}
            >
              <Box display="flex" width="100%">
                <Button
                  onClick={() => handleMicronClick()}
                  disableRipple
                  startIcon={<TagRounded sx={{ ml: 0, mr: -2 }} />}
                >
                  <Typography variant="h6" fontWeight="bold">{micron.title}</Typography>
                </Button>
              </Box>
            </foreignObject>
          </svg>
          <svg x={40} y={80}>
            <circle cx={20} cy={20} r="5" fill="#43464e" />
            <circle cx={60} cy={60} r="5" fill="#43464e" />
            <path
              className="Path animated"
              strokeWidth={3}
              d="M 20 20 L 20 40 C 20 60, 20 60, 30 60 L 60 60"
              stroke="#43464e"
              fill="transparent"
            />
            <foreignObject
              className="MicronName"
              width="500px"
              height="50"
              x={70}
              y={0}
            >
              <Box display="flex" width="100%">
                <Button
                  onClick={() => handleMicronClick()}
                  disableRipple
                  startIcon={<TagRounded sx={{ ml: 0, mr: -2 }} />}
                >
                  <Typography variant="h6" fontWeight="bold">{micron.title}</Typography>
                </Button>
              </Box>
            </foreignObject>
          </svg>
          <svg x={40} y={120}>
            <circle cx={20} cy={20} r="5" fill="#43464e" />
            <circle cx={60} cy={60} r="5" fill="#43464e" />
            <path
              className="Path animated"
              strokeWidth={3}
              d="M 20 20 L 20 40 C 20 60, 20 60, 30 60 L 60 60"
              stroke="#43464e"
              fill="transparent"
            />
            <foreignObject
              className="MicronName"
              width="500px"
              height="50"
              x={70}
              y={0}
            >
              <Box display="flex" width="100%">
                <Button
                  onClick={() => handleMicronClick()}
                  disableRipple
                  startIcon={<TagRounded sx={{ ml: 0, mr: -2 }} />}
                >
                  <Typography variant="h6" fontWeight="bold">{micron.title}</Typography>
                </Button>
              </Box>
            </foreignObject>
          </svg>
          <svg x={40} y={160}>
            <circle cx={20} cy={20} r="5" fill="#43464e" />
            <circle cx={60} cy={140} r="5" fill="#43464e" />
            <path
              className="Path animated"
              strokeWidth={3}
              d="M 20 20 L 20 80 C 20 140, 20 140, 30 140 L 60 140"
              stroke="#43464e"
              fill="transparent"
            />
            <foreignObject
              className="MicronName"
              width="500px"
              height="50"
              x={70}
              y={120}
            >
              <Box display="flex" width="100%">
                <Button
                  onClick={() => handleMicronClick()}
                  disableRipple
                  startIcon={<TagRounded sx={{ ml: 0, mr: -2 }} />}
                >
                  <Typography variant="h6" fontWeight="bold">{micron.title}</Typography>
                </Button>
              </Box>
            </foreignObject>
          </svg>
          <svg x={80} y={160}>
            <foreignObject
              className="MicronName"
              width="500px"
              height="50"
              x={30}
              y={0}
            >
              <Box display="flex" width="100%">
                <Button
                  onClick={() => handleMicronClick()}
                  disableRipple
                  startIcon={<TagRounded sx={{ ml: 0, mr: -2 }} />}
                >
                  <Typography variant="h6" fontWeight="bold">{micron.title}</Typography>
                </Button>
              </Box>
            </foreignObject>
            <circle cx={20} cy={20} r="5" fill="#43464e" />
            <circle cx={60} cy={60} r="5" fill="#43464e" />
            <path
              className="Path animated"
              strokeWidth={3}
              d="M 20 20 L 20 40 C 20 60, 20 60, 30 60 L 60 60"
              stroke="#43464e"
              fill="transparent"
            />
          </svg>
          <svg x={80} y={200}>
            <foreignObject
              className="MicronName"
              width="500px"
              height="50"
              x={70}
              y={0}
            >
              <Box display="flex" width="100%">
                <Button
                  onClick={() => handleMicronClick()}
                  disableRipple
                  startIcon={<TagRounded sx={{ ml: 0, mr: -2 }} />}
                >
                  <Typography variant="h6" fontWeight="bold">{micron.title}</Typography>
                </Button>

                <Box className="MicronActions" sx={{ ml: 2, opacity: actionsOpacity, height: 35 }}>
                  <MicronToolbar />
                </Box>
              </Box>
            </foreignObject>
            <circle cx={20} cy={20} r="5" fill="#43464e" />
            <circle cx={60} cy={60} r="5" fill="#43464e" />
            <path
              className="Path animated"
              strokeWidth={3}
              d="M 20 20 L 20 40 C 20 60, 20 60, 30 60 L 60 60"
              stroke="#43464e"
              fill="transparent"
            />
            <foreignObject
              className="MicronName"
              width="500px"
              height="50"
              x={70}
              y={40}
            >
              <Box display="flex" width="100%">
                <Button
                  onClick={() => handleMicronClick()}
                  disableRipple
                  startIcon={<TagRounded sx={{ ml: 0, mr: -2 }} />}
                >
                  <Typography variant="h6" fontWeight="bold">{micron.title}</Typography>
                </Button>

                <Box className="MicronActions" sx={{ ml: 2, opacity: actionsOpacity, height: 35 }}>
                  <MicronToolbar />
                </Box>
              </Box>
            </foreignObject>
          </svg>
        </g>
      </svg>
    </Box>
  );
}

Tree.propTypes = {
  micron: PropTypes.object.isRequired,
};
