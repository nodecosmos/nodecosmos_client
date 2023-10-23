// import { useEffect, useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
//
// /* nodecosmos */
// // eslint-disable-next-line
// import tree, { calculate_position } from '../../../../wasm/tree/pkg';
// import { selectOrderedTreeNodeIds, selectTreeNodes } from '../../trees.selectors';
//
// /**
//  *
//  * @param rootId
//  * @description
//  * This is sample hook that is used to calculate the position of each node in the
//  * tree using the wasm tree library that
//  * we have written in rust src/wasm/tree/src/lib.rs.
//  *
//  * Note that calculating the position of each node in the tree is not performance bottleneck,
//  * but it was good sample
//  * project, as we might need to use wasm in future for some other performance critical tasks.
//  *
//  * However, calculation in this sample seems to be slower than the original javascript implementation.
//  * Reason is serialization and deserialization of data.
//  */
//
// // eslint-disable-next-line no-underscore-dangle
// export default function _useWasmTreePositionCalculator(rootId) {
//     const treeNodes = useSelector(selectTreeNodes(rootId));
//     const orderedTreeNodeIds = useSelector(selectOrderedTreeNodeIds(rootId));
//
//     const [initiated, setInitiated] = useState(false);
//
//     return useMemo(() => {
//         if (!treeNodes || !orderedTreeNodeIds.length) return {};
//         const date = new Date();
//
//         const positionsByIdMap = calculate_position(orderedTreeNodeIds, treeNodes);
//
//         // around 30ms
//         console.log('wasm calculation time', new Date() - date);
//
//         return Object.fromEntries(positionsByIdMap);
//     }, [orderedTreeNodeIds, treeNodes, initiated]);
// }
