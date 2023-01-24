import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mountNode, unmountNode } from '../../nodeSlice';

export default function useNodeMountService({ id }) {
  const dispatch = useDispatch();

  const isExpanded = useSelector((state) => state.nodes[id].isExpanded);
  const nestedNodeIds = useSelector((state) => state.nodes[id].node_ids);

  const chunkSize = 5;
  const nodeIdsChunks = useMemo(() => {
    const chunks = [];

    for (let i = 0; i < nestedNodeIds.length; i += chunkSize) {
      chunks.push(nestedNodeIds.slice(i, i + chunkSize));
    }

    return chunks;
  }, [nestedNodeIds]);

  // it mounts node and increments ancestors yEnds so that it can be used to calculate the next node's Y-starts
  useEffect(() => {
    nodeIdsChunks.forEach((nodeIdsChunk) => {
      nodeIdsChunk.forEach((nestedNodeId) => {
        if (isExpanded) {
          dispatch(mountNode({ id: nestedNodeId }));
        } else {
          dispatch(unmountNode({ id: nestedNodeId }));
        }
      });
    });
  }, [dispatch, id, isExpanded, nodeIdsChunks]);
}
