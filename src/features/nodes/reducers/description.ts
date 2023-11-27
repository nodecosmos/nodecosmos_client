import { getNodeDescription, getNodeDescriptionBase64 } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export function getNodeDescriptionFulfilled(
    state: NodeState,
    action: ReturnType<typeof getNodeDescription.fulfilled>,
) {
    const {
        branchId, id, description, descriptionMarkdown, coverImageURL,
    } = action.payload;

    state.byBranchId[branchId][id].description = description as string | null;
    state.byBranchId[branchId][id].descriptionMarkdown = descriptionMarkdown as string | null;
    state.byBranchId[branchId][id].coverImageURL = coverImageURL as string | null;
}

export function getNodeDescriptionBase64Fulfilled(
    state: NodeState,
    action: ReturnType<typeof getNodeDescriptionBase64.fulfilled>,
) {
    const {
        branchId, id, descriptionBase64,
    } = action.payload;

    if (descriptionBase64) {
        state.byBranchId[branchId][id].descriptionBase64 = descriptionBase64;
    }
}
