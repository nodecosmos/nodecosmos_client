import useNodeAdd from './commands/useNodeAdd';
import useNodeClick from './commands/useNodeClick';
import useNodeDrag from './commands/useNodeDrag';
import useNodeEdit from './commands/useNodeEdit';
import useNodeRemove from './commands/useNodeRemove';
import useNodeRestore from './commands/useNodeRestore';
import useNodeSave from './commands/useNodeSave';
import useNodeUndoDeletion from './commands/useNodeUndoDeletion';

export default function useNodeCommands() {
    const clickNode = useNodeClick();
    const editNode = useNodeEdit();
    const addNode = useNodeAdd();
    const removeNode = useNodeRemove();
    const { saveNode, blurNode } = useNodeSave();
    const {
        startDrag,
        stopDrag,
        dragOver,
        dragLeave,
        dropCapture,
    } = useNodeDrag();
    const restoreNode = useNodeRestore();
    const undoNodeDeletion = useNodeUndoDeletion();

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
        restoreNode,
        undoNodeDeletion,
    };
}
