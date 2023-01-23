import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mountNode, unmountNode } from '../../nodeSlice';

export default function useNestedNodesMount(id) {
  const dispatch = useDispatch();

  const isExpanded = useSelector((state) => state.nodes[id].isExpanded);
  const isMounted = useSelector((state) => state.nodes[id].isExpanded);
  const nodeIds = useSelector((state) => state.nodes[id].node_ids);

  useLayoutEffect(() => {
    if (isExpanded === undefined) return;

    if (isExpanded && isMounted) {
      requestAnimationFrame(() => {
        nodeIds.forEach((nodeId) => {
          dispatch(mountNode({ id: nodeId }));
        });
      });
    } else {
      requestAnimationFrame(() => {
        nodeIds.forEach((nodeId) => {
          dispatch(unmountNode({ id: nodeId }));
        });
      });
    }
  }, [dispatch, id, isExpanded, isMounted, nodeIds]);
}
