import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* mui */
import { Grid, Box } from '@mui/material';
/* micro-lib */
import { indexMicrons, setCurrentToolbar, setSubtitle } from '../../actions';
import MicronCard from './shared/MicronCard';

class MicronContainer extends React.Component {
  componentDidMount = () => {
    this.props.indexMicrons();
    this.props.setCurrentToolbar('MicronIndexToolbar');
    this.props.setSubtitle('‍🔬explore');
  }

  renderMicrons = () => Object.keys(this.props.microns).map((micronId) => {
    const micron = this.props.microns[micronId];
    return (
      <Box width="60%" p={2} key={micronId}>
        <MicronCard micron={micron} />
      </Box>
    );
  })

  render() {
    return (
      <Box height={1} display="flex">
        <Box width={300} height={1} className="BoxShadowRight BorderRight" />
        <Box width="calc(100% - 300px)">
          <Grid container height={1}>
            <Grid item xs={12} height={1}>
              <Box p={2} mt="2px" height={0.96}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  spacing={3}
                  mt={-2}
                  height={1}
                  overflow="auto"
                >
                  {this.renderMicrons()}
                  {this.renderMicrons()}
                  {this.renderMicrons()}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

MicronContainer.propTypes = {
  microns: PropTypes.object.isRequired,
  indexMicrons: PropTypes.func.isRequired,
  setCurrentToolbar: PropTypes.func.isRequired,
  setSubtitle: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { microns } = state;
  return { microns };
}

export default connect(mapStateToProps, { indexMicrons, setCurrentToolbar, setSubtitle })(MicronContainer);
