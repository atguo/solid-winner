import React, {Component} from 'react';

class Master extends Component {
  render() {
    return (
      <div>
        Master:
        {this.props.children}
      </div>)
  }
}

export default Master;
