import { useSelector } from 'react-redux';
import {
  INITIAL_ANIMATION_DURATION,
  MARGIN_LEFT,
  MARGIN_TOP, TRANSITION_ANIMATION_DURATION,
} from '../../components/landing-page-tree/constants';

export default function useNodeButtonAnimationStyle(props) {
  const { id, isRoot, upperSiblingID } = props;

  const defaultParentPosition = {
    x: 60,
    y: 40,
    xEnds: 100,
    yEnds: 40,
  };

  const parentID = useSelector((state) => state.landingPageNodes[id].parent_id);
  const nodePosition = useSelector((state) => state.landingPageNodes[id].position);

  const parentPosition = useSelector(
    (state) => (!isRoot && state.landingPageNodes[parentID].position) || defaultParentPosition,
  );

  const upperPosition = useSelector(
    (state) => (upperSiblingID && state.landingPageNodes[upperSiblingID].position) || parentPosition,
  );

  if (!nodePosition) return null;

  const animationXStarts = parentPosition.xEnds + MARGIN_LEFT;

  const animationYStarts = upperPosition.y + MARGIN_TOP;

  const animationOffsetPath = `M ${animationXStarts} ${animationYStarts}
                               L ${animationXStarts} ${nodePosition.y - MARGIN_TOP}
                               L ${nodePosition.xEnds} ${nodePosition.y - MARGIN_TOP}`.replace(/\n/g, '');

  const animationDuration = isRoot ? 0 : INITIAL_ANIMATION_DURATION * 0.75;

  return {
    offsetPath: `path("${animationOffsetPath}")`,
    animation: `move ${animationDuration}s forwards`,
    transition: `all ${TRANSITION_ANIMATION_DURATION}s`,
  };
}
