import useNodeAdd from './commands/useNodeAdd';
import useNodeClick from './commands/useNodeClick';
import useNodeDrag from './commands/useNodeDrag';
import useNodeEdit from './commands/useNodeEdit';
import useNodeRemove from './commands/useNodeRemove';
import useNodeUpsert from './commands/useNodeUpsert';

export default function useNodeCommands() {
    const clickNode = useNodeClick();
    const editNode = useNodeEdit();
    const addNode = useNodeAdd();
    const removeNode = useNodeRemove();
    const { changeTitle, blurNode } = useNodeUpsert();
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
