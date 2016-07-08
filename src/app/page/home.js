import React, {Component} from 'react';
import {setTitle} from '../action/navigation'
import {store} from '../app'

import {Card, CardHeader, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      components: [
        {
          type: 'category',
        }, {
          type: 'pic',
          img: 'http://www.baidu.com/img/bd_logo1.png',
          link: '/#/Pay',
          style: {
            width: '100%'
          }
        }, {
          type: 'card',
          title: '猜你喜欢',
          subtitle: '',
          items: [
            {
              img: 'http://placehold.it/300x300',
              title: 'Breakfast',
              price: "30$",
              intro: 'jill111',
            },
            {
              img: 'http://placehold.it/300x300',
              title: 'Tasty burger',
              price: "30$",
              intro: 'pashminu',
            },
            {
              img: 'http://placehold.it/300x300',
              title: 'Camera',
              price: "30$",
              intro: 'Danson67',
            },
            {
              img: 'http://placehold.it/300x300',
              title: 'Morning',
              price: "30$",
              intro: 'fancycrave1',
            },
            {
              img: 'http://placehold.it/300x300',
              title: 'Hats',
              price: "30$",
              intro: 'Hans',
            },
            {
              img: 'http://placehold.it/300x300',
              title: 'Honey',
              price: "30$",
              intro: 'fancycravel',
            },
            {
              img: 'http://placehold.it/300x300',
              title: 'Vegetables',
              price: "30$",
              intro: 'jill111',
            },
            {
              img: 'http://placehold.it/300x300',
              title: 'Water plant',
              price: "30$",
              intro: 'BkrmadtyaKarki',
            },
          ]
        },
      ]
    }
  }

  componentWillMount() {
    store.dispatch(setTitle('SAPE: 电商平台'));
  }

  render() {
    return (
      <div>
        {
          this.state.components.map((elem) => {
            switch (elem.type) {
              case 'pic': {
                return (
                  <a href={elem.link}>
                    <img src={elem.img} style={elem.style}/>
                  </a>
                );
              }

              case 'card': {
                return (
                  <Card zDepth={2}>
                    <CardHeader
                      title={elem.title}
                      subtitle={elem.subtitle}
                    />

                    <CardText>
                      <GridList
                        cols={4}
                        padding={10}
                      >
                      {
                        elem.items.map((item) => (
                            <GridTile
                              key={item.title}
                              title={item.title}
                              subtitle={item.intro}
                            >
                              <img src={item.img}/>
                            </GridTile>

                      ))}
                      </GridList>
                    </CardText>
                  </Card>
                );
              }

              default:
                return <p> 未知类型：{elem.type} </p>
            }
          })
        }
      </div>);
  }
}

export default Home;
