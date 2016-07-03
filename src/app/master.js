import React, {Component} from 'react';
import Title from 'react-title-component'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionSettings from 'material-ui/svg-icons/action/settings';

class Master extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
    };

    this.handleTouchTapLeftIconButton = () => {
      this.setState({
        navDrawerOpen: !this.state.navDrawerOpen,
      });
    };

    this.handleChangeRequestNavDrawer = (open) => {
      this.setState({
        navDrawerOpen: open,
      });
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <Title render='Title.render' />

          <AppBar
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            title='AppBar.title'
            iconElementRight={
              <IconButton>
                <ActionShoppingBasket />
              </IconButton>
            }
          />

          <Drawer
            open={this.state.navDrawerOpen}
            docked={false}
            onRequestChange={this.handleChangeRequestNavDrawer}
          >
            <List>
              <ListItem
                disabled={true}
                children={
                  <div style={{height: 60}}>
                    <div style={{display: 'inline-block', position: 'absolute'}}>
                      <Avatar size={60}>UN</Avatar>
                    </div>
                    <div style={{position: 'absolute', display:'inline-block', left: 100}}>
                      <div>游客</div>
                      <div>登录</div>
                    </div>
                  </div>
                }
              />
              <ListItem primaryText='主页' leftIcon={<ActionHome />}/>
              <ListItem primaryText='搜索' leftIcon={<ActionSearch />}/>
              <ListItem primaryText='购物车' leftIcon={<ActionShoppingBasket />}/>
              <ListItem primaryText='设置' leftIcon={<ActionSettings />}/>
            </List>
          </Drawer>
        
          {this.props.children}

        </div>
      </MuiThemeProvider>
    )
  }
}

export default Master;
