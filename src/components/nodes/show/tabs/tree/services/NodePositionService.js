export default class NodePositionService {
  marginLeft = 20

  nodeButtonHeight = 28.5

  marginTop = this.nodeButtonHeight / 2

  edgeLength = 40

  constructor(node) {
    this.props = node.props;
  }

  calculatePosition() {
    return {
      x: this.calculateX(),
      xEnds: this.calculateXEnds(),
      y: this.calculateY(),
      yEnds: this.calculateY(),
    };
  }

  calculateX() {
    return this.props.parent.x + this.marginLeft + this.edgeLength;
  }

  calculateXEnds() {
    return this.calculateX() + this.edgeLength;
  }

  calculateY() {
    return (this.props.upperSibling.yEnds || this.props.parent.y) + this.marginTop + this.edgeLength;
  }
}
