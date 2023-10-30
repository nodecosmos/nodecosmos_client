import useNodeAdd from './commands/useNodeAdd';
import useNodeClick from './commands/useNodeClick';
import useNodeDrag from './commands/useNodeDrag';
import useNodeEdit from './commands/useNodeEdit';
import useNodeRemove from './commands/useNodeRemove';
import useNodeTitleChange from './commands/useNodeTitleChange';

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
