import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import { selectSelectedWorkflowDiagramObject } from '../../workflows.selectors';

export default function useWorkflowOutputButtonBg({ id, nodeId }) {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);
  const nestedLevel = useSelector(selectNodeAttribute(nodeId, 'nestedLevel')) || 1;

  const theme = useTheme();

  const { backgrounds } = theme.palette.tree;
  const backgroundCount = backgrounds.length;
  const color = backgrounds[nestedLevel % backgroundCount];

  const isSelected = selectedWorkflowDiagramObject?.id === id;

  const backgroundColor = isSelected ? color : theme.palette.background[2];

  return {
    backgroundColor,
    outlineColor: isSelected ? color : theme.palette.background[2],
    color: isSelected ? theme.palette.tree.selectedText : theme.palette.tree.defaultText,
  };
}
