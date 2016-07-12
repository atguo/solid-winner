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

  getInfoDetail() {
    call("infodetail",
        {ID: this.props.itemIDs},
        (data, err) => {
          if (data !== null) {
            //console.log("data  :", data, err);
            this.setState(data);
            this.setState({hasInfoData: true})
          }
        }
    )
  }

  componentWillMount() {
    this.getIntroData();
    this.getInfoDetail();
    store.dispatch(setTitle('SAPE: 电商平台'));
  }

  render() {
    let info = this.state[this.props.params.itemID];
    //console.log("info   ", info);
    //console.log("id:   ", this.props.params.itemID);
    //console.log("detail   ", this.state);

    if(info){
      //console.log("info   ", info);
      return (
          <div>
            <Tabs>
              <Tab label="简介">
                <Card>
                  <CardMedia
                      overlay={
                    <CardTitle title={info.picName} subtitle={info.picSubTitle} />
                  }
                  >
                    <img src={info.itemURL}/>
                  </CardMedia>
                  <Card>
                    <CardHeader title={info.itemName}
                                actAsExpander={true}
                                showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                      {info.itemInfo}
                    </CardText>ss
                    <CardActions expandable={true}>
                      <RaisedButton label="加入购物车"
                                    style={styles.button}
                                    primary={true}
                                    onClick={()=> {
                                      store.dispatch(addCartItem(this.props.params.itemID))}}
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

              <Tab label="详情">
                <Table>
                  <TableHeader displaySelectAll={false}>
                    <TableRow>
                      <TableRowColumn>xxx</TableRowColumn>
                      <TableRowColumn>xxx</TableRowColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {this.state.infos.map((info) => (
                        <TableRow selectable={false}>
                          <TableRowColumn style={styles.fontLeft}>属性</TableRowColumn>
                          <TableRowColumn style={styles.fontRight}>{info.属性}</TableRowColumn>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <GridList cols={1}
                          cellHeight={500}
                          style={styles.gridList}
                >
                  {
                    this.state.tilesData.map((tile) => (
                        <GridTile
                            titleBackground="linear-gradient(to bottom,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%),rgba(0,0,0,0) 100%)"
                            cols={2}
                        >
                          <img src={tile.img}/>
                        </GridTile>
                    ))}
                </GridList>
              </Tab>

              <Tab label="评论">
                <div></div>
              </Tab>

            </Tabs>
          </div>
      );
    }
    else{
      return <p>没有该商品</p>;
    }}
}
export default ItemDetail;
