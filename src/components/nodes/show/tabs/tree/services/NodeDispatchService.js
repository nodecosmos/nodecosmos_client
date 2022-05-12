import { UPDATE_NODE, INCREMENT_NODES_Y_ENDS } from '../../../../../../actions/types';

export default class NodePositionService {
  constructor(props) {
    this.props = props;
  }

  updateNode(changeObject) {
    this.props.dispatch({
      type: UPDATE_NODE,
      payload: {
        ...this.props.node,
        ...changeObject,
      },
    });
  }

  updateParentsYEnds(change) {
    this.props.dispatch({
      type: INCREMENT_NODES_Y_ENDS,
      payload: { ids: this.props.parentChainIDs, increment: change },
    });
  }
}
