import useNodeAdd from './actions/useNodeAdd';
import useNodeDelete from './actions/useNodeDelete';
import useNodeEdit from './actions/useNodeEdit';
import useNodeRestore from './actions/useNodeRestore';
import useNodeUndoDeletion from './actions/useNodeUndoDeletion';
import { useMemo } from 'react';

export default function useNodeActions() {
    const editNode = useNodeEdit();
    const addNode = useNodeAdd();
    const deleteNode = useNodeDelete();
    const restoreNode = useNodeRestore();
    const undoNodeDeletion = useNodeUndoDeletion();

    return useMemo(() => ({
        editNode,
        addNode,
        deleteNode,
        restoreNode,
        undoNodeDeletion,
    }), [editNode, addNode, deleteNode, restoreNode, undoNodeDeletion]);
}
