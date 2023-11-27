import { indexNodes } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function indexNodesFulfilled(state: NodeState, action: ReturnType<typeof indexNodes.fulfilled>) {
    const nodes = action.payload;
    state.indexNodesById = {};

    nodes.forEach((node) => {
        state.indexNodesById[node.id] = node;
    });
}
