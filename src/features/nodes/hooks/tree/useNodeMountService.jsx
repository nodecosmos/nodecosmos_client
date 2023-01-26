import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mountNodes } from '../../nodeSlice';

export default function useNodeMountService({ id }) {
  const dispatch = useDispatch();

  const isExpanded = useSelector((state) => state.nodes.byId[id].isExpanded);
  const nestedNodeIds = useSelector((state) => state.nodes.byId[id].node_ids);

  const chunkSize = 25;
  const nodeIdsChunks = useMemo(() => {
    const chunks = [];

    for (let i = 0; i < nestedNodeIds.length; i += chunkSize) {
      chunks.push(nestedNodeIds.slice(i, i + chunkSize));
    }

    return chunks;
  }, [nestedNodeIds]);

  useEffect(() => {
    if (isExpanded) {
      nodeIdsChunks.forEach((nodeIdsChunk) => {
        setTimeout(() => dispatch(mountNodes({ ids: nodeIdsChunk })));
      });
    }
  }, [dispatch, id, isExpanded, nodeIdsChunks]);
}
