import React, {Component} from 'react';
import {Tabs,Tab} from 'material-ui/Tabs';
import{Card, CardMedia,CardTitle,CardText,CardHeader} from 'material-ui/Card';

const styles ={
  headline:{
    fotSize:24,
    paddingTop:16,
    marginButtom:12,
    fontWeight:400,
  }
}

class TabsExampleSwipeable extends Component{
  render() {
    return(
      <div>
        <Tabs>
          <Tab label="商品简介" >
              <div>
                <Card>
                  <CardHeader title="图片"/>
                  <CardMedia overlay={<CardTitle title="Miku" subtitle="小提琴" /> }
                    >
                    <img src="http://puu.sh/kpNYq/e61a7c77ba.jpg" />

                  </CardMedia>
                ` <CardTitle title="item" />
                  <CardText>
                    目的棕色做梦都在怎么大门大麻素面大麻素的马斯的妈妈所得  
                  </CardText>> `
                </Card>

              </div>
          </Tab>

          <Tab label="商品详情" >
             <div>
              <h1> Tab2 </h1>
             </div>
          </Tab>
          <Tab label="评论" >
             <div>
                


             </div>
          </Tab>
       </Tabs>
      </div>
    );
  }
}

export default TabsExampleSwipeable ;
