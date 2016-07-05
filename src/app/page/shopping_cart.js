import React, {Component} from 'react'
import {connect} from 'react-redux';
import {setTitle} from '../action/navigation'
import {store} from '../app'

import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import update from 'immutability-helper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {addCartItem, changeCartItemAmount} from '../action/shopping_cart';

const itemInfo = {
  '1': {
    itemName: "Bicycle",
    itemImg: "http://placehold.it/300x300",
    itemIntro: "Bicycle is something that has two wheels and people can ride on.",
    itemPrice: 3000,
  },
  '2': {
    itemName: "Bicycle",
    itemImg: "http://placehold.it/300x300",
    itemIntro: "Bicycle is something that has two wheels and people can ride on.",
    itemPrice: 3000,
  },
}

class CartChecker extends Component {
  render() {
    console.log(this.props.sum);
    return <Toolbar>
      <ToolbarGroup
        firstChild={true}>
        Sum: {this.props.sum === 0 ? "0" : this.props.sum}

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
  componentWillMount() {
    store.dispatch(setTitle('购物车'));
  }

  constructor(props) {
    super(props);
  }

  render() {
    console.log("Shopping Cart", this.props.amount);
    let sum = this.props.itemNos
      .map((itemNo) => (
        itemInfo[itemNo].itemPrice * this.props.amount[itemNo]))
      .reduce((p, c) => (
        p + c
      ), 0);
    console.log(sum);
    return <Paper>
    <Table
      selectable={false}>
      <TableHeader
        displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Item</TableHeaderColumn>
          <TableHeaderColumn>Price</TableHeaderColumn>
          <TableHeaderColumn>Amount</TableHeaderColumn>
          <TableHeaderColumn>Sum</TableHeaderColumn>
          <TableHeaderColumn>Operation</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}>

        {this.props.itemNos.map((itemNo, index) => {
          let item = itemInfo[itemNo];

          let onDeleteClick = (event) => {
            store.dispatch(deleteCartItem(itemNo))
          };

          let onAmountChange = (event) => {
            const amount = parseInt(event.currentTarget.value, 10);

            if (!isNaN(amount)) {
              store.dispatch(changeCartItemAmount(itemNo, amount));
            }
          };

          return <TableRow>
            <TableRowColumn>
              <div>
                <img src={item.itemImg}/>
                <p>{item.itemName}</p>
                <p>{item.itemIntro}</p>
              </div>
            </TableRowColumn>
            <TableRowColumn>{item.itemPrice}</TableRowColumn>
            <TableRowColumn>
              <TextField
                value={this.props.amount[itemNo]}
                onChange={onAmountChange}
                name={index}
                />
            </TableRowColumn>
            <TableRowColumn>
              {parseInt(this.props.amount[itemNo], 10) * item.itemPrice}
            </TableRowColumn>
            <TableRowColumn>
              <FlatButton
                label="Delete"
                id={index + 'delete'}
                onClick={onDeleteClick}
              />
            </TableRowColumn>
          </TableRow>
        })}
      </TableBody>
    </Table>
      <CartChecker
        sum={sum}
        />
    </Paper>
  }
}

const mapStateToProps = (state, props) => {
  let cart = state.shopping_cart.cart;
  let amount = {};
  cart.forEach((item) => {
    amount[item.itemNo] = item.itemAmount;
  });
  return update(props, {amount: {$set: amount}, itemNos: {$set: cart.map((item) => item.itemNo)}});
};

export default connect(mapStateToProps)(ShoppingCart);
