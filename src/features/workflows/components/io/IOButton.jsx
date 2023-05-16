import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonBase, useTheme } from '@mui/material';
import { faArrowDownTriangleSquare } from '@fortawesome/pro-light-svg-icons';
import { IO_BUTTON_HEIGHT } from '../../../trees/trees.constants';

const MemoizedButtonBase = memo(ButtonBase);
const MemoizedIcon = memo(() => <FontAwesomeIcon className="fa-hashtag" icon={faArrowDownTriangleSquare} />);

export default function IOButton(props) {
  const theme = useTheme();

  return (
    <g>
      <g>
        <circle
          cx={75}
          cy={120}
          r={5}
          fill={theme.palette.tree.default}
        />
        <path
          strokeWidth={3.5}
          d={`M ${75} ${120}
            L ${110} ${120}`}
          stroke={theme.palette.tree.default}
          fill="transparent"
        />
      </g>
      <foreignObject
        width={150}
        height={55}
        x={100}
        y={100}
      >
        <div className="NodeButtonContainer">
          <MemoizedButtonBase
            variant="outlined"
            type="button"
            className="NodeButton"
            style={{
              backgroundColor: theme.palette.tree.default,
              height: IO_BUTTON_HEIGHT,
              marginTop: 8,
              marginLeft: 6,
              transform: 'skewX(-20deg)',
            }}
          >
            <MemoizedIcon />
            <div className="IOButtonText">
              Output 1
            </div>
          </MemoizedButtonBase>
        </div>
      </foreignObject>
    </g>
  );
}
