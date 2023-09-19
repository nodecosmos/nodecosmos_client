import { base64ToUint8Array } from '../../../../common/serializer';

export default function getNodeDescriptionBlobFulfilled(state, action) {
  const { node } = action.payload;

  if (node.descriptionBlob) {
    state.byId[node.id].descriptionBlob = base64ToUint8Array(node.descriptionBlob);
  }
}
