import useTreeContext from './useTreeContext';
import { NodecosmosDispatch } from '../../../../store';
import { ObjectType, UUID } from '../../../../types';
import { SELECTED_OBJ_Q, useSelectObject } from '../../../app/hooks/useSelectObject';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { setNodeScrollTo } from '../../nodes.actions';
import { selectExpandedNodes, selectSelected } from '../../nodes.selectors';
import {
    useCallback, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export default function useTreeEvents() {
    const {
        expandNode, expandNodes, collapseNode, orderedTreeNodeIds,
    } = useTreeContext();
    const selected = useSelector(selectSelected);
    const selId = selected?.id;
    const expandedNodes = useSelector(selectExpandedNodes);
    const selectObject = useSelectObject();
    const { branchId, originalId } = useBranchContext();

    const handleArrowKey = useCallback((event: KeyboardEvent) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            if (selId) {
                const selIdx = orderedTreeNodeIds.indexOf(selId);
                let moveToId;

                if (event.key === 'ArrowDown') {
                    moveToId = orderedTreeNodeIds[selIdx + 1];
                } else {
                    moveToId = orderedTreeNodeIds[selIdx - 1];
                }

                if (moveToId) {
                    selectObject({
                        originalId,
                        branchId,
                        objectNodeId: moveToId,
                        objectId: moveToId,
                        objectType: ObjectType.Node,
                    });
                }
            }
        }
        if (event.key === 'Enter' && !event.ctrlKey) {
            event.preventDefault();

            if (document.getElementById('node-input')) {
                return;
            }

            if (selId) {
                if (!expandedNodes.has(selId)) {
                    selectObject({
                        originalId,
                        branchId,
                        objectNodeId: selId,
                        objectId: selId,
                        objectType: ObjectType.Node,
                    });
                    expandNode(selId);
                } else {
                    collapseNode(selId);
                }
            }
        }
    }, [selId, orderedTreeNodeIds, selectObject, originalId, branchId, expandedNodes, expandNode, collapseNode]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (document.getElementById('editor-container')) {
            return;
        }

        handleArrowKey(event);
    }, [handleArrowKey]);

    useEffect(() => {
        // on keydown
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const expandedNodesFromParams = useRef<boolean>(false);
    const [searchParams] = useSearchParams();
    const { treeNodes } = useTreeContext();
    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (expandedNodesFromParams.current) {
            return;
        }

        const encodedData = searchParams.get(SELECTED_OBJ_Q);

        if (encodedData && (Object.keys(treeNodes).length > 0)) {
            const data = JSON.parse(atob(encodedData));

            if (data.objectType === ObjectType.Node && treeNodes[data.objectId]) {
                const ids = [];
                const ancestorIds = data.metadata?.ancestorIds;

                ancestorIds?.forEach((id: UUID) => {
                    ids.push(id);
                });

                ids.push(data.objectId);

                expandNodes(ids);

                setTimeout(() => {
                    dispatch(setNodeScrollTo(data.objectId));
                }, 10);
                expandedNodesFromParams.current = true;
            } else if (data.objectType !== ObjectType.Node) {
                expandedNodesFromParams.current = true;
            }
        }

        setTimeout(() => {
            expandedNodesFromParams.current = true;
        }, 500);
    }, [expandNodes, searchParams, treeNodes, dispatch]);
}
