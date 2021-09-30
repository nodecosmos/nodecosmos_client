import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

function MicroAnimate(props) {
  const {
    animate,
    children,
    appAnimationEnabled,
    animationEnabled,
  } = props;

  return (
    <motion.div
      initial={appAnimationEnabled && animationEnabled}
      animate={animate}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

MicroAnimate.defaultProps = {
  animate: { scale: [1, 1.01, 1] },
  animationEnabled: true,
};

MicroAnimate.propTypes = {
  animate: PropTypes.object,
  children: PropTypes.node.isRequired,
  appAnimationEnabled: PropTypes.bool.isRequired,
  animationEnabled: PropTypes.bool,
};

function mapStateToProps(state) {
  const { appAnimationEnabled } = state.app;
  return { appAnimationEnabled };
}

export default connect(mapStateToProps)(MicroAnimate);
