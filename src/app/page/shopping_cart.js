import React, {Component} from 'react'
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import update from 'immutability-helper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';

const itemInfo = [
  {
    itemNo: "1111",
    itemName:"Bicycle",
    itemImg:"http://placehold.it/300x300",
    itemIntro:"Bicycle is something that has two wheels and people can ride on.",
    itemPrice: 3000,
  },
  {
    itemNo: "1111",
    itemName:"Bicycle",
    itemImg:"http://placehold.it/300x300",
    itemIntro:"Bicycle is something that has two wheels and people can ride on.",
    itemPrice: 3000,
  },
];

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 1,
    };

    this.handleNumberChange = (event) => {
      const number = parseInt(event.currentTarget.value, 10);
      if (!isNaN(number)) {
        this.setState({
          number: number,
        });

        this.props.onNumberChange(
          number,
          this.props.itemIndex
        );
      }
      this.handleDeleteTouch = (event) => {
        event.stopPropagation();
        alert("deleted");
      };
    }


  }
  
  render(){
    const {itemImage, itemIntro, itemName, itemIndex, itemPrice, ...other} = this.props;
    return  <TableRow {...other}>
      <TableRowColumn>
        <div>
          <img src={itemImage} />
        </div>
        <div>
          <p>{itemName}: {itemIntro}</p>
        </div>
      </TableRowColumn>
      <TableRowColumn>{itemPrice}</TableRowColumn>
      <TableRowColumn>
        <TextField
          id={itemIndex}
          value={this.state.number}
          onChange={this.handleNumberChange} />
      </TableRowColumn>
      <TableRowColumn>{itemPrice * this.state.number}</TableRowColumn>
      <TableRowColumn>
        <FlatButton
          label="Delete"
          onClick={this.handleDeleteTouch}
        />
      </TableRowColumn>

    </TableRow>
  }
}

class CartChecker extends Component {
  render() {
    return <Toolbar>
      <ToolbarGroup
        firstChild={true}>
        Sum: {this.props.sum}

      </ToolbarGroup>
      <ToolbarGroup>
        <RaisedButton
          label="Check"
          primary={true}
        />
      </ToolbarGroup>
      </Toolbar>
  }

}




class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numbers: Array(itemInfo.length).fill(1),
    };

    this.onNumberChange = (number, index) => {
      let instruct = {};
      instruct[index] = {$set: number};
      const arr = update(this.state.numbers, instruct);
      console.log(arr['0']);
      this.setState({
        numbers: arr,
      });
    }

  }

  render() {
    const sum = itemInfo
      .map((item, index) => (item.itemPrice * this.state.numbers[index]))
      .reduce((p, c) => (p + c));

    return <Paper
        zDepth={1}
      >
      <Table
        allRowsSelected={true}
        multiSelectable={true}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Item</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Number</TableHeaderColumn>
            <TableHeaderColumn>Sum</TableHeaderColumn>
            <TableHeaderColumn>Action</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemInfo.map((item, index) => (
            <CartItem
              itemImage={item.itemImg}
              itemName={item.itemName}
              itemPrice={item.itemPrice}
              itemIntro={item.itemIntro}
              itemIndex={index}
              onNumberChange={this.onNumberChange}
            />
          ))}
        </TableBody>
      </Table>
      <CartChecker
        sum={sum}
        />
    </Paper>
  }
}

export default ShoppingCart;