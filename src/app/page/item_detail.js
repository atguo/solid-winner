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
import FlatButton from 'material-ui/FlatButton'
import {blue500} from 'material-ui/styles/colors'
import {setTitle} from '../action/navigation'

import {addCartItem} from '../action/shopping_cart'


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
  },
  fontLeft: {
    paddingLeft: 96,
  },
  fontRight: {
    paddingLeft: 60,
  },
};

const tilesData = [
  {
    img: 'http://placehold.it/500/500',
  },
  {
    img: 'http://placehold.it/500/500',
  },
  {
    img: 'http://placehold.it/500/500',
  },
  {
    img: 'http://placehold.it/500/500',
  },
  {
    img: 'http://placehold.it/500/500',
  },
  {
    img: 'http://placehold.it/500/500',
  },
  {
    img: 'http://placehold.it/500/500',
  },

]

const infos = [
  {
    zz: "xxx"
  },
  {
    zz: "xxx"
  },
  {
    zz: "xxx"
  },
  {
    zz: "xxx"
  },
]


class ItemDetail extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  getData() {
    console.log(this.state);
    if(this.state.data == null) {
      this.setState({itemID: this.props.params.itemID})
      //TO DO: request itemID info
      call('itemDetail',
          {itemID: this.state.itemID},
          (data,error) => {
            console.log('data', data,error);
            this.setState(data.details);

          }
      )

    }
  }

  componentWillMount() {
    this.getData();
    store.dispatch(setTitle('SAPE: 电商平台'));
  }



  render() {
      return (
          <div>
            <Tabs>
              <Tab label="简介">
                <Card>
                  <CardMedia
                      overlay={
                    <CardTitle title={this.state.picName} subtitle={this.state.picSubTitle} />
                  }
                  >
                    <img src={this.state.itemURL}/>
                  </CardMedia>
                  <Card>
                    <CardHeader title={this.state.itemName}
                                actAsExpander={true}
                                showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                      {this.state.itemInfo}
                    </CardText>
                    <CardActions expandable={true}>
                      <FlatButton label="加入购物车"
                                  style={styles.button}
                                  onClick={()=> {
                                    store.dispatch(addCartItem(this.props.params.itemID))}}

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
                    {infos.map((info) => (
                        <TableRow selectable={false}>
                          <TableRowColumn style={styles.fontLeft}>zz</TableRowColumn>
                          <TableRowColumn style={styles.fontRight}>{info.zz}</TableRowColumn>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <GridList cols={1}
                          cellHeight={500}
                          style={styles.gridList}
                >
                  {
                    tilesData.map((tile) => (
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
}


export default ItemDetail;
