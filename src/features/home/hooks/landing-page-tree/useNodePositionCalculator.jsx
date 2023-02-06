import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevProps from '../../../common/hooks/usePrevProps';
import useShallowEqualSelector from '../../../common/hooks/useShallowEqualSelector';
import { EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP } from '../../components/landing-page-tree/constants';
import {
  incrementNodesYEnds,
  updateNodePosition,
} from '../../components/landing-page-tree/landingPageNodeSlice';

export default function useNodePositionCalculator(props) {
  const {
    id,
    upperSiblingId,
    isRoot,
  } = props;

  const dispatch = useDispatch();

  const nodePosition = useShallowEqualSelector((state) => state.landingPageNodes[id].position);
  const nodeAncestorIdObjects = useShallowEqualSelector((state) => state.landingPageNodes[id].ancestor_ids);
  const nodeAncestorIds = useShallowEqualSelector(
    () => !isRoot && nodeAncestorIdObjects.map((nodeIdObject) => nodeIdObject.$oid),
  );
  const upperSiblingPosition = useShallowEqualSelector(
    (state) => (upperSiblingId && state.landingPageNodes[upperSiblingId].position),
  );

  const upperSiblingYEnds = upperSiblingId && upperSiblingPosition.yEnds;

  const parentID = useSelector((state) => state.landingPageNodes[id].parent_id);
  const parentPosition = useShallowEqualSelector((state) => !isRoot && state.landingPageNodes[parentID].position);
  const parentY = !isRoot && parentPosition.y;

  const x = isRoot ? EDGE_LENGTH : (parentPosition.x + MARGIN_LEFT + EDGE_LENGTH);
  const xEnds = x + EDGE_LENGTH;

  const y = (isRoot ? 0 : (upperSiblingYEnds || parentY)) + MARGIN_TOP + EDGE_LENGTH;
  const prevY = usePrevProps(y);

  const currentYEnds = nodePosition.yEnds;

  const calculatePosition = useCallback(() => {
    if (prevY === y) return;

    let yEnds = y;

    if (prevY && prevY !== y) {
      const change = y - prevY;
      yEnds = currentYEnds + change;
    }

    dispatch(updateNodePosition({
      id,
      position: {
        xEnds,
        x,
        y,
        yEnds,
      },
    }));
  }, [currentYEnds, dispatch, id, prevY, x, xEnds, y]);

  const incrementAncestorsYEnds = useCallback(() => {
    const increment = EDGE_LENGTH + MARGIN_TOP;

    if (!isRoot) {
      dispatch(incrementNodesYEnds({
        ids: nodeAncestorIds,
        increment,
      }));
    }
  }, [dispatch, isRoot, nodeAncestorIds]);

  const decrementAncestorsYEnds = useCallback(() => {
    const initialParentIncrement = EDGE_LENGTH + MARGIN_TOP;
    const decrement = -initialParentIncrement;

    if (!isRoot) {
      dispatch(incrementNodesYEnds({
        ids: nodeAncestorIds,
        increment: decrement,
      }));
    }
  }, [dispatch, isRoot, nodeAncestorIds]);

  useLayoutEffect(() => {
    calculatePosition();
  }, [calculatePosition]);

  useEffect(() => incrementAncestorsYEnds(), [incrementAncestorsYEnds]);

  useEffect(() => () => {
    decrementAncestorsYEnds();
  }, [decrementAncestorsYEnds, id, dispatch]);
}
