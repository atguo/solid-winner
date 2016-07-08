import React, {Component} from 'react'
import {setTitle} from '../action/navigation'
import {store} from '../app'
import {connect} from 'react-redux';
import {deleteCartItem, changeCartItemAmount} from '../action/shopping_cart';

import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import update from 'immutability-helper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

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

const style = {
  itemColumnStyle: {
    width: "50%",
    verticalAlign: "start"
  }
}

class CartChecker extends Component {
  render() {
    return <Toolbar>
      <ToolbarGroup>
        <ToolbarTitle text={this.props.sum === 0 ? "0" : "总价: " + this.props.sum} />
      </ToolbarGroup>
      <ToolbarGroup>
        <RaisedButton
          label="结帐"
          primary={true}
          linkButton={true}
          href="/#/pay"
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

    this.TableRows = ()=> (
        this.props.itemIDs.map((itemID, index) => {
          let item = itemInfo[itemID];

          let onDeleteClick = (event) => {
            store.dispatch(deleteCartItem(itemID))
          };

          let onAmountChange = (event) => {
            const amount = parseInt(event.currentTarget.value, 10);

            if (!isNaN(amount)) {
              store.dispatch(changeCartItemAmount(itemID, amount));
            }
          };

          return <TableRow>
            <TableRowColumn style={style.itemColumnStyle}>
              <div>
                <img src={item.itemImg}
                     style={{display:"inline-block",
                             width: 100, height: 100, margin: 5}}/>
                <div style={{display:"inline-block", verticalAlign:"top", margin: 5}}>
                  <h1 style={{fontSize:"20", fontWeight:"400"}}>{item.itemName}</h1>
                  <p>{item.itemIntro}</p>
                </div>
              </div>
            </TableRowColumn>

            <TableRowColumn>
              {item.itemPrice}
            </TableRowColumn>

            <TableRowColumn>
              <TextField
                  value={this.props.amount[itemID]}
                  onChange={onAmountChange}
                  name={index}
              />
            </TableRowColumn>

            <TableRowColumn>
              {parseInt(this.props.amount[itemID], 10) * item.itemPrice}
            </TableRowColumn>

            <TableRowColumn>
              <FlatButton
                  label="删除"
                  id={index + 'delete'}
                  onClick={onDeleteClick}
              />
            </TableRowColumn>
          </TableRow>
        })
    )
  }

  render() {
    let sum = this.props.itemIDs
      .map((itemID) => (
        itemInfo[itemID].itemPrice * this.props.amount[itemID]))
      .reduce((p, c) => (
        p + c
      ), 0);
    
    
    return <Paper>
    <Table
      selectable={false}>
      <TableHeader
        adjustForCheckbox={false}
        displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={style.itemColumnStyle}>商品</TableHeaderColumn>
          <TableHeaderColumn>价格</TableHeaderColumn>
          <TableHeaderColumn>数量</TableHeaderColumn>
          <TableHeaderColumn>总价</TableHeaderColumn>
          <TableHeaderColumn>操作</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}>

        {this.TableRows()}

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
    amount[item.itemID] = item.itemAmount;
  });
  return update(props, {amount: {$set: amount}, itemIDs: {$set: cart.map((item) => item.itemID)}});
};

export default connect(mapStateToProps)(ShoppingCart);
