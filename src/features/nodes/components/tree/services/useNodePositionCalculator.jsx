import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevProps from '../../../../../helpers/usePrevProps';
import useShallowEqualSelector from '../../../../../helpers/useShallowEqualSelector';
import { incrementNodesYEnds, updateNodePosition, updateNodePositionYEnds } from '../../../nodeSlice';
import { EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP } from '../constants';

export default function useNodePositionCalculator(props) {
  const {
    id,
    upperSiblingID,
    isRoot,
  } = props;

  const dispatch = useDispatch();

  const nodePosition = useSelector((state) => state.nodes[id].position);
  const nodeAncestorIdObjects = useSelector((state) => state.nodes[id].ancestor_ids);
  const nodeAncestorIds = useShallowEqualSelector(
    () => !isRoot && nodeAncestorIdObjects.map((nodeIdObject) => nodeIdObject.$oid),
  );

  const upperSiblingPosition = useSelector(
    (state) => (upperSiblingID && state.nodes[upperSiblingID].position),
  );

  const parentID = useSelector((state) => state.nodes[id].parent_id);

  const parentPosition = useSelector(
    (state) => (parentID && state.nodes[parentID].position),
  );

  const prevParentPosition = usePrevProps(parentPosition);
  const prevUpperSiblingPosition = usePrevProps(upperSiblingPosition);

  const isUpperSiblingNew = useSelector((state) => upperSiblingID && state.nodes[upperSiblingID].isNew);
  const prevIsUpperSiblingNew = usePrevProps(isUpperSiblingNew);

  const x = isRoot ? EDGE_LENGTH : parentPosition.x + MARGIN_LEFT + EDGE_LENGTH;
  const xEnds = x + EDGE_LENGTH;
  const y = ((upperSiblingID && upperSiblingPosition.yEnds)
    || (parentPosition && parentPosition.y) || 0) + MARGIN_TOP + EDGE_LENGTH;

  const setInitialPosition = useCallback(() => {
    dispatch(updateNodePosition({
      id,
      position: {
        xEnds,
        x,
        y,
        yEnds: y,
      },
    }));
  }, [dispatch, id, x, xEnds, y]);

  const handleParentPositionUpdate = useCallback(() => {
    // we don't care about parent change if we have upperSiblingPosition as it will handle change
    if (upperSiblingID) return;
    if (!prevParentPosition || !prevParentPosition.y) return; // no previous state
    if (parentPosition.y === prevParentPosition.y) return; // parent position unchanged

    const change = parentPosition.y - prevParentPosition.y;
    const yEnds = nodePosition.yEnds + change;

    dispatch(updateNodePositionYEnds({ id, yEnds }));
  }, [upperSiblingID, dispatch, id, nodePosition.yEnds, parentPosition, prevParentPosition]);

  // TODO: fix upper sibling changes
  const handleNewUpperSibling = useCallback(() => {
    if (!isUpperSiblingNew && !prevIsUpperSiblingNew) return;
    if (upperSiblingPosition && !upperSiblingPosition.y) return;
    if (upperSiblingPosition
      && prevUpperSiblingPosition
      && upperSiblingPosition.yEnds === prevUpperSiblingPosition.yEnds) return;

    let change = MARGIN_TOP + EDGE_LENGTH;

    if (prevUpperSiblingPosition && !upperSiblingPosition) {
      change = -change;
    }

    const yEnds = nodePosition.yEnds + change;

    dispatch(updateNodePositionYEnds({ id, yEnds }));
  },
  [
    dispatch,
    id,
    isUpperSiblingNew,
    prevIsUpperSiblingNew,
    upperSiblingPosition,
    prevUpperSiblingPosition,
    nodePosition,
  ]);

  const handleUpperSiblingPositionUpdate = useCallback(() => {
    if (isUpperSiblingNew || prevIsUpperSiblingNew) return;
    if (!upperSiblingPosition || !prevUpperSiblingPosition || !prevUpperSiblingPosition.yEnds) return;
    if (upperSiblingPosition.yEnds === prevUpperSiblingPosition.yEnds) return;

    const change = upperSiblingPosition.yEnds - prevUpperSiblingPosition.yEnds;

    const yEnds = nodePosition.yEnds + change;

    dispatch(updateNodePositionYEnds({ id, yEnds }));
  },
  [
    dispatch,
    id,
    isUpperSiblingNew,
    prevIsUpperSiblingNew,
    nodePosition,
    prevUpperSiblingPosition,
    upperSiblingPosition,
  ]);

  const incrementParentsYEnds = useCallback(() => {
    const increment = EDGE_LENGTH + MARGIN_TOP;

    if (!isRoot) dispatch(incrementNodesYEnds({ ids: nodeAncestorIds, increment }));
  }, [dispatch, isRoot, nodeAncestorIds]);

  const decrementParentsYEnds = useCallback(() => {
    const initialParentIncrement = EDGE_LENGTH + MARGIN_TOP;
    const decrement = -initialParentIncrement;

    if (!isRoot) dispatch(incrementNodesYEnds({ ids: nodeAncestorIds, increment: decrement }));
  }, [dispatch, isRoot, nodeAncestorIds]);

  /* initial */
  useLayoutEffect(() => { setInitialPosition(); }, [setInitialPosition]);

  useEffect(() => () => decrementParentsYEnds(), [decrementParentsYEnds]);
  useEffect(() => incrementParentsYEnds(), [incrementParentsYEnds]);
  /* updates */
  useLayoutEffect(() => handleParentPositionUpdate(), [handleParentPositionUpdate]);
  useLayoutEffect(() => handleUpperSiblingPositionUpdate(), [handleUpperSiblingPositionUpdate]);
  useLayoutEffect(() => handleNewUpperSibling(), [handleNewUpperSibling]);
}
