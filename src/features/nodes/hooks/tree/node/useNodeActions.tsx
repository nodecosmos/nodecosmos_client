import useNodeAdd from './actions/useNodeAdd';
import useNodeClick from './actions/useNodeClick';
import useNodeDrag from './actions/useNodeDrag';
import useNodeEdit from './actions/useNodeEdit';
import useNodeRemove from './actions/useNodeRemove';
import useNodeRestore from './actions/useNodeRestore';
import useNodeSave from './actions/useNodeSave';
import useNodeUndoDeletion from './actions/useNodeUndoDeletion';

export default function useNodeActions() {
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
