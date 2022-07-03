import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevProps from '../../../../../helpers/usePrevProps';
import { incrementNodesYEnds, updateNodePosition, updateNodePositionYEnds } from '../../../nodeSlice';
import { EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP } from '../constants';

export default function useNodePositionCalculator(props) {
  const {
    id,
    parentID,
    parentChainIDs,
    upperSiblingID,
    isRoot,
  } = props;

  const dispatch = useDispatch();

  const nodePosition = useSelector((state) => state.nodes[id].position);

  const upperSiblingPosition = useSelector(
    (state) => (state.nodes[upperSiblingID] && state.nodes[upperSiblingID].position),
  );

  const parentPosition = useSelector(
    (state) => (state.nodes[parentID] && state.nodes[parentID].position),
  );

  const prevParentPosition = usePrevProps(parentPosition);
  const prevUpperSiblingPosition = usePrevProps(upperSiblingPosition);

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

  const handleUpperSiblingPositionUpdate = useCallback(() => {
    if (!prevUpperSiblingPosition || !prevUpperSiblingPosition.yEnds) return; // no previous state
    if (upperSiblingPosition.yEnds === prevUpperSiblingPosition.yEnds) return; // upperSibling position unchanged

    const change = upperSiblingPosition.yEnds - prevUpperSiblingPosition.yEnds;
    const yEnds = nodePosition.yEnds + change;

    dispatch(updateNodePositionYEnds({ id, yEnds }));
  }, [dispatch, id, nodePosition.yEnds, prevUpperSiblingPosition, upperSiblingPosition]);

  const incrementParentsYEnds = useCallback(() => {
    const increment = EDGE_LENGTH + MARGIN_TOP;

    dispatch(incrementNodesYEnds({ ids: parentChainIDs, increment }));
  }, [dispatch, parentChainIDs]);

  const decrementParentsYEnds = useCallback(() => {
    const initialParentIncrement = EDGE_LENGTH + MARGIN_TOP;
    const decrement = -initialParentIncrement;

    dispatch(incrementNodesYEnds({ ids: parentChainIDs, increment: decrement }));
  }, [dispatch, parentChainIDs]);

  /* initial */
  useLayoutEffect(() => { setInitialPosition(); }, [setInitialPosition]);
  // TODO: fix deps
  // eslint-disable-next-line
  useEffect(() => decrementParentsYEnds, []);
  // eslint-disable-next-line
  useEffect(() => incrementParentsYEnds(), []);
  /* updates */
  useLayoutEffect(() => handleParentPositionUpdate(), [handleParentPositionUpdate]);
  useLayoutEffect(() => handleUpperSiblingPositionUpdate(), [handleUpperSiblingPositionUpdate]);
}
