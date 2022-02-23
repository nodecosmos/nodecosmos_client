import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import {
  Typography, Box, Button,
} from '@mui/material';
/* icons */
import TagRounded from '@mui/icons-material/TagRounded';
import MicronToolbar from '../../MicronToolbar';

class MicronTreeItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actionsOpacity: 0,
    };
  }

  handleMicronClick = () => {
    this.setState((prevState) => ({ actionsOpacity: prevState.actionsOpacity === 0 ? 1 : 0 }));
    this.props.handleMicronClick(this.props.micron);
  }

  render() {
    const { actionsOpacity } = this.state;

    // TODO: path needs to go above (top-left) unless it's root

    return (
      <svg x={this.props.x} y={this.props.y}>
        <g className="DropShadow">
          <circle cx={20} cy={20} r="5" fill="#fcfbec" />
          {
            !this.props.root && (
            <>
              <circle cx={60} cy={60} r="5" fill="#fcfbec" />
              <path
                className="Path animated"
                strokeWidth={4}
                d="M 20 20 L 20 40 C 20 60, 20 60, 30 60 L 60 60"
                stroke="#fcfbec"
                fill="transparent"
              />
            </>
            )
          }
        </g>
        <foreignObject
          className="MicronName"
          width="500px"
          height="50"
          x={32}
          y={0}
        >
          <Box alignItems="center" display="flex" width="100%">
            <Button
              onClick={this.handleMicronClick}
              disableRipple
              startIcon={<TagRounded sx={{ ml: 0, mr: -2 }} />}
            >
              <Typography variant="h6" fontWeight="bold">{this.props.micron.title}</Typography>
            </Button>
            <Box className="MicronActions" sx={{ ml: 2, opacity: actionsOpacity, height: 42 }}>
              <MicronToolbar />
            </Box>
          </Box>
        </foreignObject>
      </svg>
    );
  }
}

MicronTreeItem.defaultProps = {
  root: false,
};

MicronTreeItem.propTypes = {
  micron: PropTypes.object.isRequired,
  handleMicronClick: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  root: PropTypes.bool,
};

export default MicronTreeItem;
