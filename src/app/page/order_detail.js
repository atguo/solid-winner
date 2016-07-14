/**
 * Created by luoop on 16-7-14.
 */
import React from 'react'
import {Component} from 'react'

import call from '../api'
import update from 'immutability-helper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class OrderDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasData: false
        }
    }
    
    getData() {
        call('OrderDetailInfo',
            {orderID: "123"},
            (data ,err) => {
                if(data !== null){
                    //console.log("data:  ", data)
                    this.orderInfo = data;
                    this.setState(update(this.state, {hasData: {$set: true}}));
                }
            }
        )
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        //console.log("this.orderInfo:  ", this.orderInfo);
        if(this.state.hasData) {
            //console.log("this.orderInfo:  ", this.orderInfo.details);
            return<div>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                           <TableRowColumn>订单号</TableRowColumn>
                           <TableRowColumn>{this.orderInfo.id}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>金额</TableRowColumn>
                            <TableRowColumn>{this.orderInfo.sum}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>时间</TableRowColumn>
                            <TableRowColumn>{this.orderInfo.time}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>用户</TableRowColumn>
                            <TableRowColumn>{this.orderInfo.custName}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>收货地址</TableRowColumn>
                            <TableRowColumn>{this.orderInfo.custAddr}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>电话</TableRowColumn>
                            <TableRowColumn>{this.orderInfo.custPhone}</TableRowColumn>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                            <TableRowColumn>商品名</TableRowColumn>
                            <TableRowColumn>单价</TableRowColumn>
                            <TableRowColumn>数量</TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            {this.orderInfo.details.map((item) => {
                                <TableRow>
                                    <TableRowColumn>{item.name}</TableRowColumn>
                                    <TableRowColumn>{item.unitPrice}</TableRowColumn>
                                    <TableRowColumn>{item.amount}</TableRowColumn>
                                </TableRow>
                            })})
                    </TableBody>
                </Table>
            </div>;
        }
        else {
            return <p> wait for me </p>;
        }
    }
}

export default OrderDetail;