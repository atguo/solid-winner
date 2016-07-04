import React, {Component} from 'react'
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
import {store} from '../app'
import {connect} from 'react-redux';

const itemInfo = [
  {
    itemNo: "1111",
    itemName:"Bicycle",
    itemImg:"http://placehold.it/300x300",
    itemIntro:"Bicycle is something that has two wheels and people can ride on.",
    itemPrice: 3000,
  },
  {
    itemNo: "12212",
    itemName:"Bicycle",
    itemImg:"http://placehold.it/300x300",
    itemIntro:"Bicycle is something that has two wheels and people can ride on.",
    itemPrice: 3000,
  },
];

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
  componentWillMount() {
    store.dispatch(setTitle('购物车'));
  }

  constructor(props) {
    super(props);

    this.onAmountChange = (event) => {
      event.stopPropagation();
      const amount = parseInt(event.currentTarget.value, 10);
      const index = parseInt(event.currentTarget.name, 10);

      if (!isNaN(amount)) {
        store.dispatch(changeCartItemAmount(itemInfo[index].itemNo, amount));
      }
    }


    this.onDeleteClick = (event) => {
      event.stopPropagation();
    }

    this.onAmountClick = (event) => {
      event.stopPropagation();
      console.log(event);
    }

  }

  render() {
    let sum = itemInfo
      .map((item) => (
        item.itemPrice * this.props.amount[item.itemNo]))
      .reduce((p, c) => (
        p + c
      ));
    return <Paper>
    <Table
      multiSelectable={true}>
      <TableHeader
        enableSelectAll={true}>
        <TableRow>
          <TableHeaderColumn>Item</TableHeaderColumn>
          <TableHeaderColumn>Price</TableHeaderColumn>
          <TableHeaderColumn>Amount</TableHeaderColumn>
          <TableHeaderColumn>Sum</TableHeaderColumn>
          <TableHeaderColumn>Operation</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        deselectOnClickaway={false}>
        {itemInfo.map((item, index) => (
          <TableRow>
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
                value={this.props.amount[item.itemNo]}
                onChange={this.onAmountChange}
                onClick={this.onAmountClick}
                name={index}
                />
            </TableRowColumn>
            <TableRowColumn>
              {parseInt(this.props.amount[item.itemNo], 10) * item.itemPrice}
            </TableRowColumn>
            <TableRowColumn>
              <FlatButton
                label="Delete"
                onClick={this.onDeleteClick}

              />
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      <CartChecker
        sum={sum}
        />
    </Paper>
  }
}

const mapStateToProps = (state, props) => {
  return update(props, {amount: {$set: state.shopping_cart.cart}});
};

export default connect(mapStateToProps)(ShoppingCart);
