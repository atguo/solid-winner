import React, {Component} from 'react'
import {setTitle} from '../action/navigation'
import {store} from '../app'
import {connect} from 'react-redux';
import {deleteCartItem, changeCartItemAmount} from '../action/shopping_cart';
import call from '../api'

import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import update from 'immutability-helper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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
          onClick={() => {
            this.props.history.push('/Pay')
          }}
        />
      </ToolbarGroup>
    </Toolbar>
  }
}

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false,
    }

    this.TableRows = () => {
      return this.props.itemIDs.map((itemID, index) => {

        let item = this.itemInfo[itemID];
        console.log("item:  ", item);
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
              <img src={item.headImage}
                style={{display:"inline-block",
                  width: 100, height: 100, margin: 5}}/>
                <div style={{display:"inline-block", verticalAlign:"top", margin: 5}}>
                  <h1 style={{fontSize:"20", fontWeight:"400"}}>{item.name}</h1>
                  <p>{item.description}</p>
                </div>
              </div>
            </TableRowColumn>

            <TableRowColumn>
              {item.unitPrice}
            </TableRowColumn>

            <TableRowColumn>
              <TextField
                value={this.props.amount[itemID]}
                onChange={onAmountChange}
                itemName={index}
              />
            </TableRowColumn>

            <TableRowColumn>
              {parseInt(this.props.amount[itemID], 10) * item.unitPrice}
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
    }
  }


  getData() {
    call("getItemDetail", {
        IDs: this.props.itemIDs
      },
      (data, err) => {
        if (data !== null) {
          this.itemInfo = data.result;
          this.setState({hasData: true})
        }
      }
    )
  }

  componentWillMount() {
    this.getData();
    store.dispatch(setTitle('购物车'));
  }

  render() {
    //console.log("itemInfo   ", this.itemInfo)
    if (this.state.hasData) {

      let sum = this.props.itemIDs
          .map((itemID) => (
          this.itemInfo[parseInt(itemID)].unitPrice * this.props.amount[parseInt(itemID)]))
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
            history={this.props.history}
        />
      </Paper>;
    }
    else {
      return <p>等待数据</p>;
    }
  }
}
const mapStateToProps = (state, props) => {
  let cart = state.shopping_cart.cart;
  let amount = {};
  cart.forEach((item) => {
    amount[item.itemID] = item.itemAmount;
  });
  return update(props, {amount: {$set: amount}, itemIDs: {$set: cart.map((item) => item.itemID)}});
}

export default connect(mapStateToProps)(ShoppingCart);
