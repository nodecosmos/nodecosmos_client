import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import { selectSelectedWorkflowDiagramObject } from '../../workflows.selectors';

export default function useWorkflowNodeButtonBg({ id, diagramId }) {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);
  const nestedLevel = useSelector(selectNodeAttribute(id, 'nestedLevel'));

  const theme = useTheme();

  const { backgrounds } = theme.palette.tree;
  const backgroundCount = backgrounds.length;
  const color = backgrounds[nestedLevel % backgroundCount];

  const isSelected = selectedWorkflowDiagramObject?.diagramId === diagramId;

  const backgroundColor = isSelected ? color : theme.palette.tree.outlineBackground;
  const outlineColor = isSelected ? 'transparent' : color;

  return {
    backgroundColor,
    outlineColor,
    color: isSelected ? theme.palette.tree.selectedText : color,
  };
}
