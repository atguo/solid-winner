import React, {Component} from 'react';
import {setTitle} from '../action/navigation'
import {store} from '../app'
import call from '../api'

import {Card, CardHeader, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {ListItem} from 'material-ui/List';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    call('home', {},
      (data, err) => {
        this.props.onLowerDrawerChange(
          data.category.map((elem) => {
            return <ListItem
              key={elem.name}
              primaryText={elem.name}
              href={elem.href}
            />
          })
        );
        this.setState(data);
      }
    )
    store.dispatch(setTitle('SAPE: 电商平台'));
  }

  render() {
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
                  <img
                    src={elem.img}
                    onClick={() => {
                      this.props.history.push(elem.link);
                    }}
                    style={elem.style}
                  />
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
                              onClick={() => {
                                if (item.link) this.props.history.push(item.link);
                              }}
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
