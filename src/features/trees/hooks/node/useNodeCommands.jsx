import useNodeClick from './commands/useNodeClick';
import useNodeRemove from './commands/useNodeRemove';
import useNodeAdd from './commands/useNodeAdd';
import useNodeTitleChange from './commands/useNodeTitleChange';
import useNodeDrag from './commands/useNodeDrag';
import useNodeEdit from './commands/useNodeEdit';

export default function useNodeCommands() {
  const clickNode = useNodeClick();
  const editNode = useNodeEdit();
  const addNode = useNodeAdd();
  const removeNode = useNodeRemove();
  const { changeTitle, blurNode } = useNodeTitleChange();
  const {
    startDrag,
    stopDrag,
    dragOver,
    dragLeave,
    captureDroppedNode,
  } = useNodeDrag();

  return {
    clickNode,
    editNode,
    addNode,
    removeNode,
    changeTitle,
    blurNode,
    startDrag,
    stopDrag,
    dragOver,
    dragLeave,
    captureDroppedNode,
  };
}
