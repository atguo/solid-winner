import React, {Component} from 'react';

class ItemDetail extends Component {
  render() {
    return <div> ItemDetail for {this.props.params.itemId} </div>;
  }
}

export default ItemDetail;
