import React, {Component, PropTypes} from 'react'
import {DragSource} from 'react-dnd'

var cardSource = {
  beginDrag: function (props) {
    return {location: props.location}
  },
  endDrag: function(props, monitor) {
    if (monitor.didDrop()){
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult()
      props.onMoveItem({prev: item.location, next: dropResult.location})
      props.onEndDrag()
    }
  }
};

@DragSource('card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class ItemCell extends Component {
  static propTypes = {
    gridKeyPress: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    item: PropTypes.object,
    location: PropTypes.shape({
      row: PropTypes.number.isRequired,
      column: PropTypes.number.isRequired
    }).isRequired,
  }

  item() {
    return React.cloneElement(
        this.props.item,
        {
          hovered: this.props.hover,
          isSelected: this.props.isSelected,
          gridKeyPress: this.props.gridKeyPress
        }
    )
  }

  render = () => {
    let classes = 'GiantFilledCell'
    classes += this.props.isDragging ? ' isDragging' : ''
    return this.props.connectDragSource(
      <div className={classes}>
        {!this.props.isDragging && this.item()}
      </div>
    )
  }
}
