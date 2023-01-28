import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useShallowEqualSelector from '../../../app/hooks/useShallowEqualSelector';
import { setPositionsById } from '../../nodeSlice';
import TreePositionCalculator from '../../services/tree/TreePositionCalculator';

export default function useTreePositionCalculator(id) {
  const nestedNodesByParentId = useShallowEqualSelector((state) => state.nodes.nestedNodesByParentId);
  const mountedTreeNodesById = useShallowEqualSelector((state) => state.nodes.mountedTreeNodesById);

  const { allTreeNodes, positionsById } = TreePositionCalculator({ id, nestedNodesByParentId, mountedTreeNodesById });

  const dispatch = useDispatch();
  useEffect(() => { dispatch(setPositionsById(positionsById)); }, [dispatch, positionsById]);

  return allTreeNodes;
}
