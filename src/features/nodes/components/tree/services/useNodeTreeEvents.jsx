import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNode } from '../../../../app/appSlice';
import { collapseNode, expandNode } from '../../../nodeSlice';

export default function useNodeTreeEvents(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const nodeExpanded = useSelector((state) => state.nodes[id].expanded);

  const onNodeClick = () => {
    if (nodeExpanded) {
      dispatch(collapseNode({ id }));
    } else {
      dispatch(expandNode({ id }));
      dispatch(setCurrentNode(id));
    }
  };

  return {
    onNodeClick,
  };
}
