import colors from '../../../../../themes/light';

// TODO: just dumb implementation
export default function useNodeButtonBackground(props) {
  const {
    node, nestedLevel, parent,
  } = props;

  const nodeBackgroundColors = [colors.red2, colors.green2, colors.blue2];
  const backgroundColor = node.expanded ? nodeBackgroundColors[nestedLevel % 3] : '#43464e';
  const parentBackgroundColor = parent && parent.expanded ? nodeBackgroundColors[(nestedLevel - 1) % 3] : '#43464e';

  return {
    backgroundColor,
    parentBackgroundColor,
  };
}
