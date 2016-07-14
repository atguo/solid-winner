/**
 * Created by luoop on 16-7-12.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper'
import call from '../api'
import {store} from '../app'

import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class OrderComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      orderButton: {
        backgroundColor: 'rgba(241, 241, 241, 0)',
      }
    }
  }

  render() {
    let info = this.props.info;
    if(this.state.hasData) {
      return (
        <Paper zDepth={2}>
          <div>
            <p>
              <span style={{marginRight:20}}>{info.date}</span>
              订单号:
              <FlatButton label={info.id}
                style={this.styles.orderButton}
                labelStyle={{paddingLeft:0,
                  paddingRight:60}}
              />
            </p>
          </div>

          <Table selectable={false}>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              {
                (() => {
                  info.details.map((detail) => {
                    return (
                      <TableRow>
                        <TableRowColumn>
                          <h1> {detail.name} </h1>
                        </TableRowColumn>

                        <TableRowColumn> {detail.unitPrice} </TableRowColumn>

                        <TableRowColumn> {detail.amount} </TableRowColumn>
                      </TableRow>
                    );
                  })
                })()
              }
            </TableHeader>
          </Table>
        </Paper>
      );
    }
    else {
      return <p>加载数据</p>;
    }
  }
}

class Order extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    call("getUserOrderInfo",
      {token: store.getState().account.token},
      (data, err) => {
        if(data !== null) {
          this.orderInfo = data.orderInfo;
          this.setState({hasData: true});
        }
      })
  }

  render() {
    if (!this.orderInfo) {
      return <p> Loading... </p>;
    }

    return (<Table selectable={false}>
      <TableHeader
        adjustForCheckbox={false}
        displaySelectAll={false}>
        <TableRow>
          <TableRowColumn>名称</TableRowColumn>
          <TableRowColumn>单价</TableRowColumn>
          <TableRowColumn>数量</TableRowColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          (() => {
            this.orderInfo.map((order) => (
              <OrderComponent info={order.details}/>
            ));
          })()
        }
      </TableBody>
    </Table>);
  }
}

export default Order;
