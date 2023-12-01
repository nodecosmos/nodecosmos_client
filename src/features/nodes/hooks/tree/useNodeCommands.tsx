import useNodeAdd from './commands/useNodeAdd';
import useNodeClick from './commands/useNodeClick';
import useNodeDrag from './commands/useNodeDrag';
import useNodeEdit from './commands/useNodeEdit';
import useNodeRemove from './commands/useNodeRemove';
import useNodeSaver from './commands/useNodeSaver';

export default function useNodeCommands() {
    const clickNode = useNodeClick();
    const editNode = useNodeEdit();
    const addNode = useNodeAdd();
    const removeNode = useNodeRemove();
    const { saveNode, blurNode } = useNodeSaver();
    const {
        startDrag,
        stopDrag,
        dragOver,
        dragLeave,
        dropCapture,
    } = useNodeDrag();

    return {
        clickNode,
        editNode,
        addNode,
        removeNode,
        saveNode,
        blurNode,
        startDrag,
        stopDrag,
        dragOver,
        dragLeave,
        dropCapture,
    };
}
