/**
 * Created by luoop on 16-7-12.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper'
import call from '../api'

import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false,
        }

        this.styles = {
            orderButton: {
                backgroundColor: 'rgba(241, 241, 241, 0)',
            }
        }
    }

    getOrderInfo() {
        call("order",
            {"ID": this.props.orderID},
            (data,err) => {
                if(data !==null) {
                    //console.log("userID   orderID:", this.props.userID, this.props.orderID);
                    //console.log("data    :", data);
                    //console.log("orderIndo  ", data[this.props.userID][this.props.orderID]);

                    this.orderInfo = data[this.props.userID][this.props.orderID];
                    this.setState({hasData: true});
                }
            })
    }

    componentWillMount() {
        this.getOrderInfo();
    }

    render() {
        //console.log("orderInfo:   ", this.orderInfo);
        if(this.state.hasData){
            return(
                <Paper zDepth={2}>
                    <div>
                        <p>
                            <span style={{marginRight:20}}>{this.orderInfo.date}</span>
                            订单号:
                            <FlatButton label={this.props.orderID}
                                        style={this.styles.orderButton}
                                        labelStyle={{paddingLeft:0,
                                                        paddingRight:60}}
                                        onClick={() => {window.open("./#/orderdetail/1")}}
                        />
                        </p>
                    </div>
                    <Table selectable={false}>
                        <TableHeader adjustForCheckbox={false}
                                 displaySelectAll={false}>
                            <TableRow>
                                <TableRowColumn >
                                    <h1>{this.orderInfo.itemName}</h1>
                                </TableRowColumn>

                                <TableRowColumn >
                                    {this.orderInfo.price}
                                </TableRowColumn>

                                <TableRowColumn>
                                    {this.orderInfo.itemAmount}
                                </TableRowColumn>

                                <TableRowColumn>
                                    {this.orderInfo.userName}
                                </TableRowColumn>

                                <TableRowColumn>
                                    {this.orderInfo.total}
                                </TableRowColumn>
                            </TableRow>
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
    
    render() {
        return (<Table selectable={false}>
            <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}>
                <TableRow>
                    <TableRowColumn>名称</TableRowColumn>
                    <TableRowColumn>单价</TableRowColumn>
                    <TableRowColumn>数量</TableRowColumn>
                    <TableRowColumn>收货人</TableRowColumn>
                    <TableRowColumn>金额</TableRowColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                <OrderComponent userID={1} orderID={1}/>
                <OrderComponent userID={1} orderID={2}/>
            </TableBody>
        </Table>);
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

export default connect(mapStateToProps)(Order);