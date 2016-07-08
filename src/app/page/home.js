import React, {Component} from 'react';
import {setTitle} from '../action/navigation'
import {store} from '../app'
import call from '../api'

import {Card, CardHeader, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getData() {
    call(
      'home',
      {},
      (data, err) => {
        console.log(data, err)
        this.setState(data);
      }
    )
  }

  componentWillMount() {
    this.getData();
    store.dispatch(setTitle('SAPE: 电商平台'));
  }

  render() {
    console.log('home.render', this.state)
    if (this.state.components == null) {
      return <p>正在加载</p>;
    }
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
