/**
 * Created by luoop on 16-7-4.
 */
import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper';
import call from '../api'
import {store} from '../app'
import {deleteCartItem} from '../action/shopping_cart'
import {setTitle} from '../action/navigation'


import {Card,
  CardActions,
  CardHeader
} from 'material-ui/Card';

import {Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn
} from "material-ui/Table"

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const address = [
  {
    name: "x",
    addr: "xx",
  },
  {
    name: "z",
    addr: "zzzzz",
  },
  {
    name: "c",
    addr: "cccc",
  },
  {
    name: "a",
    addr: "aaaa",
  },
]
const items = [];
for (let i=0 ;i <address.length;i++){
  items.push(<MenuItem value={i} label={address[i].name} primaryText={address[i].addr}/>);
}


class Pay extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      hasData: false,
      choiceID: [],
    }
    this.handleChange = (event, index, value) => {
      this.setState({
        value: value,
      });
    }

  }

  getData() {
    call('itemdetail',
        {},
        (data,error) => {
          //console.log("data:   ", data, error);
          if(data !== null){
            this.itemsinfo = data;
            this.setState(update(this.state, {hasData: {$set: true}}));
          }
        }
    )
  }

  componentWillMount() {
    this.getData();
    store.dispatch(setTitle('结算'));
  }


  render() {
    //console.log("state:   ", this.state);
    //console.log("infos:   ", infos);

    if(this.state.hasData){
      return(
        <div>
          <Card>
            <CardHeader title="收货人信息"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions expandable={true}>
              <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                {items}
              </DropDownMenu>
              <TextField value={address[this.state.value].addr}/>
            </CardActions>
          </Card>

          <Card>
            <CardHeader title="支付方式"
              actAsExpander={true}
              showExpandableButton={true}
            />>
            <CardActions expandable={true}>
              <FlatButton label="账户余额"/>
              <FlatButton label="支付宝"
                linkButton={true}
                href="https://github.com/borgnix/solid-winner"/>
            </CardActions>
          </Card>

          <Card>
            <CardHeader title="订单"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardActions expandable={true}>
                <Table selectable={false}>
                  <TableHeader displaySelectAll={false}
                               adjustForCheckbox={false}>
                    <TableRow>
                      <TableRowColumn>itemName</TableRowColumn>
                      <TableRowColumn>itemAmount</TableRowColumn>
                      <TableRowColumn>Price</TableRowColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {this.props.items.map((item) => (
                      <TableRow selectable={false}>
                        <TableRowColumn>{this.itemsinfo[item.itemID].itemName}</TableRowColumn>
                        <TableRowColumn>{item.itemAmount}</TableRowColumn>
                        <TableRowColumn>{
                          parseInt(this.itemsinfo[item.itemID].itemPrice*item.itemAmount, 10)
                        }</TableRowColumn>
                      </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardActions>
              </Card>

              <div style={{width: '100%', textAlign: 'center'}}>
                <RaisedButton label="提交订单"
                  linkButton={true}
                  primary={true}
                  style={{
                    marginTop: 20,
                    display: 'inline-block'
                  }}
                  onClick={() =>
                    this.props.items.map((item) => {
                      store.dispatch(deleteCartItem(item.itemID));
                    })
                  }
                />
              </div>

            </div>
        );
    }
    else{
      return <p>没有该商品</p>;
    }
  }
}

const mapStateToProps = (state, props) => {
  let cart = state.shopping_cart.cart;
  let items = [];
  for (let i=0; i < cart.length; i++) {
    items.push({
      itemID: cart[i].itemID,
      itemAmount: cart[i].itemAmount,
    });
  }
  return update(props, {items: {$set: items}});
};

export default connect(mapStateToProps)(Pay);
