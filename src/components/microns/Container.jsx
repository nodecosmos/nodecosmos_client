import Typography from '@mui/material/Typography';
import React from 'react';
import * as PropTypes from 'prop-types';
/* material ui */
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
/* micro-lib */
import { indexMicrons } from '../../actions';
import Micron from './card/Micron';
import Toolbar from './Toolbar';

class Container extends React.Component {
  componentDidMount = (formValues) => {
    this.props.indexMicrons();
  }

  renderMicrons = () => Object.keys(this.props.microns).map((micronId) => {
    const micron = this.props.microns[micronId];
    return (
      <Grid item xs={12} key={micronId}>
        <Micron micron={micron} />
      </Grid>
    );
  })

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
          Categories/Search
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Toolbar />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                {this.renderMicrons()}
                {this.renderMicrons()}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Trending Microns
              </Typography>
              <Typography>
                Trending Creators
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Container.propTypes = {
  microns: PropTypes.object.isRequired,
  indexMicrons: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { microns } = state;
  return { microns };
}

export default connect(mapStateToProps, { indexMicrons })(Container);
