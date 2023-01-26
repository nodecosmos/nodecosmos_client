// import { useDispatch, useSelector } from 'react-redux';
// import { EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP } from '../../components/tree/constants';
// import { setNodePosition } from '../../nodeSlice';
//
// export default function useCalculateInitialPosition(props) {
//   const {
//     id,
//     isRoot,
//     upperSiblingId,
//   } = props;
//
//
//   const dispatch = useDispatch();
//
//   const upperSiblingYEnds = useSelector((state) => (upperSiblingId && state.nodes.byId[upperSiblingId].yEnds));
//
//   const parentId = useSelector((state) => !isRoot && state.nodes.byId[id].parent_id);
//   const parentX = useSelector((state) => !isRoot && state.nodes.byId[parentId].x);
//   const parentY = useSelector((state) => !isRoot && state.nodes.byId[parentId].y);
//
//   const x = isRoot ? EDGE_LENGTH : (parentX + MARGIN_LEFT + EDGE_LENGTH);
//   const xEnds = x + EDGE_LENGTH;
//
//   const y = (isRoot ? 0 : (upperSiblingYEnds || parentY)) + MARGIN_TOP + EDGE_LENGTH;
//
//   dispatch(setNodePosition({
//     id,
//     xEnds,
//     x,
//     y,
//     yEnds: y,
//   }));
// }
