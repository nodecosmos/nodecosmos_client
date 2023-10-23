export default function getNodeDescriptionFulfilled(state, action) {
    const { node } = action.payload;
    state.byId[node.id].description = node.description;
    state.byId[node.id].descriptionMarkdown = node.descriptionMarkdown;
    state.byId[node.id].coverImageUrl = node.coverImageUrl;
}
