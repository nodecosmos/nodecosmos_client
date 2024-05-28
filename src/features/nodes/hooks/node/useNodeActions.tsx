import useNodeAdd from './actions/useNodeAdd';
import useNodeClick from './actions/useNodeClick';
import useNodeDelete from './actions/useNodeDelete';
import useNodeDrag from './actions/useNodeDrag';
import useNodeEdit from './actions/useNodeEdit';
import useNodeRestore from './actions/useNodeRestore';
import useNodeSave from './actions/useNodeSave';
import useNodeUndoDeletion from './actions/useNodeUndoDeletion';
import { useMemo } from 'react';

export default function useNodeActions() {
    const clickNode = useNodeClick();
    const editNode = useNodeEdit();
    const addNode = useNodeAdd();
    const deleteNode = useNodeDelete();
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

    return useMemo(() => (
        {
            clickNode,
            editNode,
            addNode,
            deleteNode,
            saveNode,
            blurNode,
            startDrag,
            stopDrag,
            dragOver,
            dragLeave,
            dropCapture,
            restoreNode,
            undoNodeDeletion,
        }
    ),
    [
        clickNode,
        editNode,
        addNode,
        deleteNode,
        saveNode,
        blurNode,
        startDrag,
        stopDrag,
        dragOver,
        dragLeave,
        dropCapture,
        restoreNode,
        undoNodeDeletion,
    ]);
}
