import React, { memo } from 'react';
import { useTheme } from '@mui/material';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
/* nodecosmos */
import usePrevious from '../../../common/hooks/usePrevious';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  MARGIN_LEFT,
  MARGIN_TOP,
  TRANSITION_ANIMATION_DURATION,
} from '../trees.constants';
import { selectPosition, selectTreeNodeAttribute } from '../trees.selectors';

function NestedNodesBranch(props) {
  const { treeNodeId } = props;

  const isExpanded = useSelector(selectTreeNodeAttribute(treeNodeId, 'isExpanded'));
  const treeLastChildId = useSelector(selectTreeNodeAttribute(treeNodeId, 'treeLastChildId'));
  const { xEnd, y } = useSelector(selectPosition(treeNodeId));
  const { y: pathYEnd } = useSelector(selectPosition(treeLastChildId));
  const prevPathYEnd = usePrevious(pathYEnd);

  const theme = useTheme();

  const x = xEnd + MARGIN_LEFT;
  const linkY = y + MARGIN_TOP;

  const yEnd = pathYEnd || prevPathYEnd;

  if (!isExpanded || !treeLastChildId || !yEnd) return null;

  return (
    <path
      stroke={theme.palette.tree.default}
      fill="transparent"
      strokeWidth={3.5}
      d={`M ${x} ${linkY} L ${x} ${yEnd}`}
      style={{
        opacity: 0,
        animation: `node-path-appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
        transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
      }}
    />
  );
}

NestedNodesBranch.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};

export default memo(NestedNodesBranch);
