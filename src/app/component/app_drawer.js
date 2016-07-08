import React, {Component} from 'react';

import UserInfo from './user_info'

import Drawer from 'material-ui/Drawer';
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
        docked={false}
        onRequestChange={this.props.handleSetNavDrawerOpen}
      >
        <List>
          <ListItem
            disabled={true}
            children={
              <UserInfo
                handleSetNavDrawerOpen={this.props.handleSetNavDrawerOpen}
              />
            }
          />

          <div
            onClick={() => {
              this.props.handleSetNavDrawerOpen(false);
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
    );
  }
}

export default AppDrawer;
