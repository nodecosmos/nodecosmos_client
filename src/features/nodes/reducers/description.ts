import {
    getDescription, getDescriptionBase64, getOriginalDescriptionBase64,
} from '../nodes.thunks';
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
    const {
        id, description, descriptionMarkdown, descriptionBase64,
    } = action.payload;

    state.byBranchId[treeBranchId][id].description = description;
    state.byBranchId[treeBranchId][id].descriptionMarkdown = descriptionMarkdown;
    state.byBranchId[treeBranchId][id].descriptionBase64 = descriptionBase64;
}

export function getOriginalDescriptionBase64Fulfilled(
    state: NodeState,
    action: ReturnType<typeof getOriginalDescriptionBase64.fulfilled>,
) {
    const { currentRootNodeId } = action.meta.arg;
    const {
        id,
        description: originalDescription,
        descriptionBase64: originalBranchBase64,
        descriptionMarkdown: originalBranchMarkdown,
    } = action.payload;

    state.byBranchId[currentRootNodeId][id].description = originalDescription;
    state.byBranchId[currentRootNodeId][id].descriptionBase64 = originalBranchBase64;
    state.byBranchId[currentRootNodeId][id].descriptionMarkdown = originalBranchMarkdown;
}
