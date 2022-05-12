import { UPDATE_MICRON, INCREMENT_MICRONS_Y_ENDS } from '../../../../../../actions/types';

export default class NodePositionService {
  constructor(props) {
    this.props = props;
  }

  updateNode(changeObject) {
    this.props.dispatch({
      type: UPDATE_MICRON,
      payload: {
        ...this.props.node,
        ...changeObject,
      },
    });
  }

  updateParentsYEnds(change) {
    this.props.dispatch({
      type: INCREMENT_MICRONS_Y_ENDS,
      payload: { ids: this.props.parentChainIDs, increment: change },
    });
  }
}
