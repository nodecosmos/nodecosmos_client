export default function getNodeDescriptionBase64Fulfilled(state, action) {
    const { node } = action.payload;

    if (node.descriptionBase64) {
        state.byId[node.id].descriptionBase64 = node.descriptionBase64;
    }
}
