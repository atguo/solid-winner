import React, {Component} from 'react';
import Title from 'react-title-component'
import {connect} from 'react-redux';
import update from 'immutability-helper'

import * as accountAction from './action/account'
import UserInfo from './component/user_info'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
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
          <Title render={this.props.title} />
          <AppBar
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            title={this.props.title}
            iconElementRight={
              <IconButton
                onClick={
                  () => {
                    window.location.replace('/#/ShoppingCart')
                  }
                }
              >
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
                children={<UserInfo />}
              />

              <div
                onClick={() => {
                  this.setState({
                    navDrawerOpen: false,
                  });
                }}
              >
                <ListItem
                  key='Home'
                  primaryText='主页'
                  leftIcon={<ActionHome />}
                  href='/#/Home'
                />

                <ListItem
                  key='Search'
                  primaryText='搜索'
                  leftIcon={<ActionSearch />}
                  href='/#/ItemList'
                />

                <ListItem
                  key='ShoppingCart'
                  primaryText='购物车'
                  leftIcon={<ActionShoppingBasket />}
                  href='/#/ShoppingCart'
                />

                <ListItem
                  key='Settings'
                  primaryText='设置'
                  leftIcon={<ActionSettings />}
                  href='/#/ItemDetail/Xxx'
                />
              </div>

            </List>
          </Drawer>

          {this.props.children}

        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state, props) => {
  return update(props, {
    title: {$set: state.navigation.title},
  });
}

export default connect(mapStateToProps)(Master);
