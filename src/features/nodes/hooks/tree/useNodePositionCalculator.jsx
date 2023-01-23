import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevProps from '../../../app/hooks/usePrevProps';
import { EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP } from '../../components/tree/constants';
import { updateNodeState, updateNodeY } from '../../nodeSlice';

export default function useNodePositionCalculator(props) {
  const {
    id,
    upperSiblingId,
    isRoot,
  } = props;

  //--------------------------------------------------------------------------------------------------------------------
  const dispatch = useDispatch();

  const upperSiblingYEnds = useSelector((state) => (upperSiblingId && state.nodes[upperSiblingId].position.yEnds));

  const parentId = useSelector((state) => !isRoot && state.nodes[id].parent_id);
  const parentX = useSelector((state) => !isRoot && state.nodes[parentId].position.x);
  const parentY = useSelector((state) => !isRoot && state.nodes[parentId].position.y);

  const isPositionCalculated = useSelector((state) => state.nodes[id]?.isPositionCalculated);
  const isParentPositionCalculated = useSelector((state) => state.nodes[parentId]?.isPositionCalculated);
  const isUpperSiblingPositionCalculated = useSelector((state) => (state.nodes[upperSiblingId]?.isPositionCalculated));

  const x = isRoot ? EDGE_LENGTH : (parentX + MARGIN_LEFT + EDGE_LENGTH);
  const xEnds = x + EDGE_LENGTH;

  const y = (isRoot ? 0 : (upperSiblingYEnds || parentY)) + MARGIN_TOP + EDGE_LENGTH;
  const prevY = usePrevProps(y);

  //--------------------------------------------------------------------------------------------------------------------
  const calculateInitialPosition = useCallback(
    () => {
      if (upperSiblingId && !isUpperSiblingPositionCalculated) return;
      if (!isRoot && !upperSiblingId && !isParentPositionCalculated) return;
      if (isPositionCalculated) return;

      requestAnimationFrame(() => {
        dispatch(updateNodeState({
          id,
          isPositionCalculated: true,
          position: {
            xEnds,
            x,
            y,
            yEnds: y,
          },
        }));
      });
    },
    [
      dispatch,
      id,
      isRoot,
      isPositionCalculated,
      isParentPositionCalculated,
      isUpperSiblingPositionCalculated,
      upperSiblingId,
      x,
      xEnds,
      y,
    ],
  );

  const monitorYChanges = useCallback(
    () => {
      if (upperSiblingId && !isUpperSiblingPositionCalculated) return;
      if (!isRoot && !upperSiblingId && !isParentPositionCalculated) return;
      if (!isPositionCalculated) return;
      if (!prevY || prevY === y) return;

      const change = y - prevY;

      requestAnimationFrame(() => {
        dispatch(updateNodeY({
          id,
          change,
        }));
      });
    },
    [
      dispatch,
      id,
      isParentPositionCalculated,
      isPositionCalculated,
      isRoot,
      isUpperSiblingPositionCalculated,
      prevY,
      upperSiblingId,
      y,
    ],
  );

  //--------------------------------------------------------------------------------------------------------------------
  useEffect(() => calculateInitialPosition(), [calculateInitialPosition]);
  useEffect(() => monitorYChanges(), [monitorYChanges]);
}
