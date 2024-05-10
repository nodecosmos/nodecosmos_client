import useTreeActions from './useTreeActions';
import useTreeContext from './useTreeContext';
import { selectExpandedNodes, selectSelected } from '../../nodes.selectors';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useTreeEvents() {
    const { orderedTreeNodeIds } = useTreeContext();
    const {
        selectNode, expandNode, collapseNode,
    } = useTreeActions();
    const selected = useSelector(selectSelected);
    const selId = selected?.id;
    const expandedNodes = useSelector(selectExpandedNodes);

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
                    selectNode(moveToId);
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
                    selectNode(selId);
                    expandNode(selId);
                } else {
                    collapseNode(selId);
                }
            }
        }

        if (event.key === 'ArrowLeft' && !event.ctrlKey) {
            event.preventDefault();
            if (selId) {
                if (expandedNodes.has(selId)) {
                    collapseNode(selId);
                }
            }
        }
    }, [selId, orderedTreeNodeIds, selectNode, expandedNodes, expandNode, collapseNode]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (document.getElementById('remirror-editor-container')) {
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
}
