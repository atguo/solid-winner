import React, {Component} from 'react';
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
        TableHeaderColumn,
        TableRow,
        TableRowColumn} from "material-ui/Table"
import {GridList, GridTile} from 'material-ui/GridList'
import FlatButton from 'material-ui/FlatButton'
import {blue500} from 'material-ui/styles/colors'

import {setTitle} from '../action/navigation'
import {store} from '../app'

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
  }
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
  componentWillMount() {
    store.dispatch(setTitle('SAPE: 电商平台'))
  }

  render() {
    return(
      <div>
        <Tabs>

          <Tab label="简介" >
            <Card>
              <CardHeader title="图片"
                          titleColor={blue500}
                          avatar="http://loempixel.com/100/100nature/"
                          subtitle="xxxx"
              />
              <CardMedia
                overlay={
                  <CardTitle title="Miku" subtitle="小提琴" />
                }
              >
                <img src="http://puu.sh/kpNYq/e61a7c77ba.jpg" />
              </CardMedia>
              <Card>
                <CardHeader title="item"
                            actAsExpander={true}
                            showExpandableButton={true}
                />
                <CardText expandable={true}>
                  这里是商品的一些简单描述
                </CardText>
                <CardActions expandable={true}>
                  <FlatButton label="xxx"/>
                  <FlatButton label="加入购物车"
                              linkButton={true}
                              style={styles.button}
                              href="https://github.com/borgnix/solid-winner"/>
                </CardActions>
              </Card>
            </Card>
          </Tab>


          <Tab label="详情" >
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableRowColumn>xxx</TableRowColumn>
                  <TableRowColumn>xxx</TableRowColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                  {infos.map((info) => (
                    <TableRow selectable={false} >
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
                  <img src={tile.img} />
                </GridTile>
              ))}
            </GridList>
          </Tab>

          <Tab label="评论" >
            <div> </div>
          </Tab>

      </Tabs>
    </div>
    );
  }
}

export default ItemDetail;
