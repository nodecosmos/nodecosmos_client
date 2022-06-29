/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { INCREMENT_NODES_Y_ENDS, UPDATE_NODE } from '../../../../../actions/types';
import { EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP } from '../constants';
import usePrevProps from '../../../../helpers/usePrevProps';

export default function useNodePositionCalculator(props) {
  const {
    node,
    parent,
    upperSibling,
    parentChainIDs,
  } = props;

  const dispatch = useDispatch();

  const prevParent = usePrevProps(parent);
  const prevUpperSibling = usePrevProps(upperSibling);

  const x = parent.x + MARGIN_LEFT + EDGE_LENGTH;
  const xEnds = x + EDGE_LENGTH;
  const y = (upperSibling ? upperSibling.yEnds : parent.y) + MARGIN_TOP + EDGE_LENGTH;

  const setInitialPosition = () => dispatchPosition(y);

  const dispatchPosition = (yEnds) => dispatch({
    type: UPDATE_NODE,
    payload: {
      ...node,
      xEnds,
      x,
      y,
      yEnds,
    },
  });

  const incrementParentsYEnds = () => {
    const increment = EDGE_LENGTH + MARGIN_TOP;

    dispatch({ type: INCREMENT_NODES_Y_ENDS, payload: { ids: parentChainIDs, increment } });
  };

  const decrementParentsYSize = () => {
    const increment = -(EDGE_LENGTH + MARGIN_TOP);

    dispatch({ type: INCREMENT_NODES_Y_ENDS, payload: { ids: parentChainIDs, increment } });
  };

  const handleParentPositionUpdate = () => {
    // we don't care about parent change if we have upperSibling as it will handle change
    if (upperSibling || !prevParent) return;
    if (parent.y === prevParent.y) return;

    const change = parent.y - prevParent.y;
    const yEnds = node.yEnds + change;

    dispatchPosition(yEnds);
  };

  const handleUpperSiblingPositionUpdate = () => {
    if (!upperSibling || !prevUpperSibling) return;
    if (upperSibling.yEnds === prevUpperSibling.yEnds) return;

    const change = upperSibling.yEnds - prevUpperSibling.yEnds;
    const yEnds = node.yEnds + change;

    dispatchPosition(yEnds);
  };

  useLayoutEffect(() => {
    incrementParentsYEnds();
    setInitialPosition();

    return () => {
      decrementParentsYSize();
    };
  }, []);

  useLayoutEffect(() => handleParentPositionUpdate(), [parent]);
  useLayoutEffect(() => handleUpperSiblingPositionUpdate(), [upperSibling]);
}
