/**
 * Created by luoop on 16-7-4.
 */
import React from 'react';
import {Card,
    CardActions,
    CardHeader} from 'material-ui/Card';
import {Table ,
    TableBody,
    TableHeader,
    TableRow,
    TableRowColumn} from "material-ui/Table"
import FlatButton from 'material-ui/FlatButton'
import {Component} from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import update from 'immutability-helper';



const styles = {
    position: {
        color: "0x986468" ,
        left: 0,
        right: 0,
        position: "absolute",
    },
    button: {
        height: 50,
        width: 120,
    },
};

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
        }
        this.handleChange = (event, index, value) => {
            this.setState({
                value: value,
            });
        }
    }


    render() {
        console.log(this.props.items[0].itemPrice);
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
                    <FlatButton label="支付包"
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
                    <Table>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableRowColumn>itemName</TableRowColumn>
                                <TableRowColumn>itemAmount</TableRowColumn>
                                <TableRowColumn>Price</TableRowColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckBox={false}>
                            {this.props.items.map((item) => (
                                <TableRow selectable={false}>
                                    <TableRowColumn>{item.itemName}</TableRowColumn>
                                    <TableRowColumn>{item.itemAmount}</TableRowColumn>
                                    <TableRowColumn>{parseInt(item.itemPrice*item.itemAmount, 10)}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardActions>
            </Card>
            <FlatButton label="提交订单"
                    linkButton={true}
                    style={styles.position}
                    href="https://github.com/borgnix/solid-winner"/>
        </div>
        );
    };
}

const mapStateToProps = (state, props) => {
    let cart = state.shopping_cart.cart;
    let items = [];
    for (let i=0; i < cart.length; i++) {
        items.push({
            itemNo: cart[i].itemNo,
            itemName: "name",  //name
            itemAmount: cart[i].itemAmount,
            itemPrice: 3000,
        });
    }
    return update(props, {items: {$set: items}});
};

export default connect(mapStateToProps)(Pay);

