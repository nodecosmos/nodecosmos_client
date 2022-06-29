import { MARGIN_LEFT, MARGIN_TOP } from '../constants';

export default function useNodeButtonAnimationStyle(props) {
  const { parent, node, isRoot } = props;

  const animationXStarts = parent.xEnds + MARGIN_LEFT;
  const animationYStarts = parent.y + MARGIN_TOP;
  const pathString = `M ${animationXStarts} ${animationYStarts}
                        L ${animationXStarts} ${node.y - MARGIN_TOP}
                        C ${animationXStarts} ${node.y - MARGIN_TOP}
                          ${animationXStarts} ${node.y - MARGIN_TOP}
                          ${animationXStarts + 10} ${node.y - MARGIN_TOP}
                        L ${node.xEnds} ${node.y - MARGIN_TOP}`.replace(/\n/g, '');
  const animationDuration = isRoot ? 0 : 0.25;

  return {
    offsetPath: `path("${pathString}")`,
    animation: `move ${animationDuration}s forwards`,
    transition: `all ${animationDuration}s`,
  };
}
