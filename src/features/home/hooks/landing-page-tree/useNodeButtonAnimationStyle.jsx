import { useSelector } from 'react-redux';
import { ANIMATION_DURATION, MARGIN_LEFT, MARGIN_TOP } from '../../components/landing-page-tree/constants';

export default function useNodeButtonAnimationStyle(props) {
  const { id, isRoot } = props;

  const defaultParentPosition = {
    x: 60,
    y: 40,
    xEnds: 100,
    yEnds: 40,
  };

  const parentID = useSelector((state) => state.landingPageNodes[id].parent_id);
  const nodePosition = useSelector((state) => state.landingPageNodes[id].position);
  const isNodeFetched = useSelector((state) => state.landingPageNodes[id].fetched);

  const parentPosition = useSelector(
    (state) => (!isRoot && state.landingPageNodes[parentID].position) || defaultParentPosition,
  );

  if (!nodePosition) return null;

  const animationXStarts = parentPosition.xEnds + MARGIN_LEFT;
  const animationYStarts = parentPosition.y + MARGIN_TOP;
  const animationOffsetPath = `M ${animationXStarts} ${animationYStarts}
                               L ${animationXStarts} ${nodePosition.y - MARGIN_TOP}
                               L ${nodePosition.xEnds} ${nodePosition.y - MARGIN_TOP}`.replace(/\n/g, '');
  const animationDuration = isRoot || isNodeFetched ? 0 : ANIMATION_DURATION;

  return {
    offsetPath: `path("${animationOffsetPath}")`,
    animation: `move ${animationDuration}s forwards`,
    transition: `all ${animationDuration}s`,
  };
}
