import { getDescription, getDescriptionBase64 } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export function getDescriptionFulfilled(
    state: NodeState,
    action: ReturnType<typeof getDescription.fulfilled>,
) {
    const { treeBranchId } = action.meta.arg;
    const {
        id, description, descriptionMarkdown, coverImageURL,
    } = action.payload;

    state.byBranchId[treeBranchId][id].description = description || 'This node has no description yet!';
    state.byBranchId[treeBranchId][id].descriptionMarkdown = descriptionMarkdown as string | null;
    state.byBranchId[treeBranchId][id].coverImageURL = coverImageURL as string | null;
}

export function getDescriptionBase64Fulfilled(
    state: NodeState,
    action: ReturnType<typeof getDescriptionBase64.fulfilled>,
) {
    const { treeBranchId } = action.meta.arg;
    const { id, descriptionBase64 } = action.payload;

    if (descriptionBase64) {
        state.byBranchId[treeBranchId][id].descriptionBase64 = descriptionBase64;
    }
}
