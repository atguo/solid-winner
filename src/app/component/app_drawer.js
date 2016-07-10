import React, {Component} from 'react';

import UserInfo from './user_info'

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionSettings from 'material-ui/svg-icons/action/settings';

class AppDrawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Drawer
        open={this.props.open}
        docked={this.props.docked}
        zDepth={this.props.zDepth}
        onRequestChange={this.props.handleSetNavDrawerOpen}
      >
        <List>
          <ListItem
            disabled={true}
            children={
              <UserInfo
                handleSetNavDrawerOpen={this.props.handleSetNavDrawerOpen}
                history={this.props.history}
              />
            }
          />

          <div
            onClick={(e) => {
              this.props.handleSetNavDrawerOpen(false);
            }}
          >
            <ListItem
              key='Home'
              primaryText='主页'
              leftIcon={<ActionHome />}
              onClick={() => {this.props.history.push('/Home')}}
            />

            <ListItem
              key='Search'
              primaryText='搜索'
              leftIcon={<ActionSearch />}
              onClick={() => {this.props.history.push('/ItemList')}}
            />

            <ListItem
              key='ShoppingCart'
              primaryText='购物车'
              leftIcon={<ActionShoppingBasket />}
              onClick={() => {this.props.history.push('/ShoppingCart')}}
            />

            <ListItem
              key='Settings'
              primaryText='设置'
              leftIcon={<ActionSettings />}
              onClick={() => {this.props.history.push('/setting')}}
            />

            {this.props.lower ? <Divider /> : ''}
            {this.props.lower}
          </div>
        </List>
      </Drawer>
    );
  }
}

export default AppDrawer;
