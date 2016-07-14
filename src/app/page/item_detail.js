import React, {Component} from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper'
import {store} from '../app'

import call from '../api'

import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,
        CardMedia,
        CardTitle,
        CardText,
        CardActions,
        CardHeader} from 'material-ui/Card';
import {Table,
        TableBody,
        TableHeader,
        TableRow,
        TableRowColumn} from "material-ui/Table"
import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import {setTitle} from '../action/navigation'

import Snackbar from 'material-ui/Snackbar'
import {addCartItem, deleteCartItem} from '../action/shopping_cart'


const styles = {
  root: {
    dispaly: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    overflowY: 'auto',
    marginBottom: 24,
  },
  table: {
    height: 10,
  },
  button: {
    height: 50,
    width: 120,
    margin: 12,
  },
  fontLeft: {
    paddingLeft: 96,
  },
  fontRight: {
    paddingLeft: 60,
  },
};

class ItemDetail extends Component{
  constructor(props) {
    super(props);

    this.state = {
      dataIntro: null,
      hasDataDetail: false,
      snackBarOpen: false,
    }

    this.handleTouchTap = () => {
      this.setState({
        snackBarOpen: true,
      })
    }

    this.handleRequestClose = () => {
      this.setState({
        snackBarOpen: false,
      })
    }
  }

  getIntroData() {
    if(this.state.dataIntro == null) {
      //TO DO: request itemID info
      call('itemdetail',
          {ID: this.props.params.itemID},
          (data,error) => {
            //console.log("data:   ", data, error);
            this.setState(data);
          }
      )
    }
  }

  componentWillMount() {
    call("getItemDetail",
        {IDs: [parseInt(this.props.params.itemID)]},
        (data, err) => {
          if (data !== null) {
            console.log("ItemDetail: ", data, err);
            this.setState({info: data.result});
          }
        }
    )
    store.dispatch(setTitle('SAPE: 电商平台'));
  }

  render() {
    let info;
    if (this.state.info) {
      info = this.state.info[parseInt(this.props.params.itemID)];
    }
    if (!info) {
      return <p>正在加载……</p>;
    }

    return (
      <div>
        <Tabs>
          <Tab label="简介">
            <Card>

              <CardMedia
                overlay={
                  <CardTitle title={info.name}/>
                  }
              >
                <img src={info.headImage}/>
              </CardMedia>

              <Card>
                <CardHeader title="Description" />
                <CardText>
                  {info.description}
                </CardText>

                <CardActions>
                  <RaisedButton label="加入购物车"
                    style={styles.button}
                    primary={true}
                    onClick={
                      ()=> {
                        store.dispatch(addCartItem(this.props.params.itemID))
                      }
                    }
                    onTouchTap={this.handleTouchTap}
                  />
                  <Snackbar open={this.state.snackBarOpen}
                    message="已添加至购物车"
                    autoHideDuration={1000}
                    onRequestClose={this.handleRequestClose}
                  />
                </CardActions>

              </Card>
            </Card>
          </Tab>

          <Tab label="参数">
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableRowColumn>Attribute</TableRowColumn>
                  <TableRowColumn>Value</TableRowColumn>
                </TableRow>
              </TableHeader>

              <TableBody displayRowCheckbox={false}>
                {
                  (() => {
                    let ret = [];
                    for (let key in info.properties) {
                      let value = info.properties[key];
                      ret.push(
                        <TableRow selectable={false}>
                          <TableRowColumn style={styles.fontLeft}>
                            {key}
                          </TableRowColumn>
                          <TableRowColumn style={styles.fontRight}>
                            {value}
                          </TableRowColumn>
                        </TableRow>
                      )
                    }
                    return ret;
                  })()
                }
              </TableBody>
            </Table>
          </Tab>

          <Tab label="图片">
            {
              info.images.map((imageUrl) => (
                <img src={imageUrl} style={{width: "100%"}}/>
              ))
            }
          </Tab>

        </Tabs>
      </div>
    );

  }
}
export default ItemDetail;
