// import useTreeActions from './useTreeActions';
// import useTreeContext, { TreeNode } from './useTreeContext';
// import { selectSelected } from '../../nodes.selectors';
// import { useCallback, useEffect } from 'react';
// import { useSelector } from 'react-redux';
//
// export default function useTreeEvents() {
//     const { treeNodes } = useTreeContext();
//     const { selectNode, expandNode } = useTreeActions();
//     const selected = useSelector(selectSelected);
//     const selId = selected?.id;
//
//     const handleArrowKey = useCallback((event: KeyboardEvent) => {
//         if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
//
//         }
//         if (event.key === 'ArrowRight' || event.key === 'Enter') {
//
//         }
//     }, []);
//
//     useEffect(() => {
//
//     }, [handleArrowKey]);
// }
