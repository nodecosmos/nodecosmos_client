import { selectIndexNodesById } from '../../nodes.selectors';
import { useSelector } from 'react-redux';

export default function useNodeIndexVirtualizer() {
    const nodes = useSelector(selectIndexNodesById);
}
