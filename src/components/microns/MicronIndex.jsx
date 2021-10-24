import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* material ui */
import Grid from '@mui/material/Grid';

/* micro-lib */
import { indexMicrons } from '../../actions';
import MicronCard from './MicronCard';
import Toolbar from './Toolbar';

class MicronContainer extends React.Component {
  componentDidMount = () => {
    this.props.indexMicrons();
  }

  renderMicrons = () => Object.keys(this.props.microns).map((micronId) => {
    const micron = this.props.microns[micronId];
    return (
      <Grid item xs={8} key={micronId}>
        <MicronCard micron={micron} />
      </Grid>
    );
  })

  render() {
    return (
      <Box height={1}>
        <Grid container height={1}>
          <Grid item xs={2} className="BoxShadowRight" />
          <Grid item xs={10} height={1}>
            <Box p={2} mt={1} height={0.96}>
              <Grid
                container
                justifyContent="center"
                spacing={3}
                pb={3}
                mt={-2}
                height={1}
                overflow="auto"
              >
                <Grid item xs={8}>
                  <Toolbar />
                </Grid>
                {this.renderMicrons()}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

MicronContainer.propTypes = {
  microns: PropTypes.object.isRequired,
  indexMicrons: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { microns } = state;
  return { microns };
}

export default connect(mapStateToProps, { indexMicrons })(MicronContainer);
