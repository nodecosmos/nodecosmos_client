import React from 'react';
import { useTheme } from '@mui/material';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import usePrevProps from '../../../../common/hooks/usePrevProps';
import { selectIsNodeExpandedById, selectNodePositionById } from '../../nodes.selectors';

import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  MARGIN_LEFT,
  MARGIN_TOP,
  TRANSITION_ANIMATION_DURATION,
} from './constants';

export default function NestedNodesBranch(props) {
  const { id, lastChildId } = props;

  const isExpanded = useSelector(selectIsNodeExpandedById(id));
  const { xEnds, y } = useSelector(selectNodePositionById(id));
  const { y: pathYEnds } = useSelector(selectNodePositionById(lastChildId));
  const prevPathYEnds = usePrevProps(pathYEnds);

  const theme = useTheme();

  const x = xEnds + MARGIN_LEFT;
  const linkY = y + MARGIN_TOP;

  const yEnds = pathYEnds || prevPathYEnds;

  if (!isExpanded || !lastChildId || !yEnds) return null;

  return (
    <path
      stroke={theme.palette.tree.default}
      fill="transparent"
      strokeWidth={3.5}
      d={`M ${x} ${linkY} L ${x} ${yEnds}`}
      style={{
        opacity: 0,
        animation: `node-path-appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
        transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
      }}
    />
  );
}

NestedNodesBranch.defaultProps = {
  lastChildId: null,
};

NestedNodesBranch.propTypes = {
  id: PropTypes.string.isRequired,
  lastChildId: PropTypes.string,
};
