/**
 * Created by luoop on 16-7-4.
 */
import React from 'react';
import {Card,
    CardMedia,
    CardTitle,
    CardText,
    CardActions,
    CardHeader} from 'material-ui/Card';
import {Table ,
    TableHeader,
    TableRow,
    TableRowColumn} from "material-ui/Table"
import FlatButton from 'material-ui/FlatButton'
import {Component} from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField'


const styles = {
    container: {
        width: "100%",
    },
    position: {
        color: "0x986468" ,
        left: 0,
        right: 0,
        position: "absolute"
    },
    button: {
        height: 50,
        width: 120,
    },
};

const address = [
     "xxxxxx",
     "zzzzzz",
     "cccccc",
     "aaaaaa",
     "ssssss"
]
const items = [];
for (let i=0 ;i <address.length;i++){
    items.push(<MenuItem value={i} primaryText={address[i]}/>);
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
                    <TextField value={address[this.state.value]}/>
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
                                <TableRowColumn>Num</TableRowColumn>
                                <TableRowColumn>price</TableRowColumn>
                            </TableRow>
                        </TableHeader>
                    </Table>
                </CardActions>
            </Card>
            <div style={styles.container}>
                <FlatButton label="提交订单"
                        linkButton={true}
                        style={styles.position}
                        href="https://github.com/borgnix/solid-winner"/>
            </div>
        </div>
        );
    };
}
export default Pay;

