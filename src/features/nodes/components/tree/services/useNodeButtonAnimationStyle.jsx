import { useSelector } from 'react-redux';
import { MARGIN_LEFT, MARGIN_TOP } from '../constants';

export default function useNodeButtonAnimationStyle(props) {
  const { id, parentID, isRoot } = props;

  const defaultParentPosition = {
    x: 60,
    y: 40,
    xEnds: 100,
    yEnds: 40,
  };

  const nodePosition = useSelector((state) => state.nodes[id].position);

  const parentPosition = useSelector(
    (state) => (!isRoot && state.nodes[parentID].position) || defaultParentPosition,
  );

  if (!nodePosition) return null;

  const animationXStarts = parentPosition.xEnds + MARGIN_LEFT;
  const animationYStarts = parentPosition.y + MARGIN_TOP;
  const pathString = `M ${animationXStarts} ${animationYStarts}
                      L ${animationXStarts} ${nodePosition.y - MARGIN_TOP}
                      C ${animationXStarts} ${nodePosition.y - MARGIN_TOP}
                        ${animationXStarts} ${nodePosition.y - MARGIN_TOP}
                        ${animationXStarts + 10} ${nodePosition.y - MARGIN_TOP}
                      L ${nodePosition.xEnds} ${nodePosition.y - MARGIN_TOP}`.replace(/\n/g, '');
  const animationDuration = isRoot ? 0 : 0.25;

  return {
    offsetPath: `path("${pathString}")`,
    animation: `move ${animationDuration}s forwards`,
    transition: `all ${animationDuration}s`,
  };
}
