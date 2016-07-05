import React, {Component} from 'react';
import Title from 'react-title-component'
import {connect} from 'react-redux';
import update from 'immutability-helper'

import * as accountAction from './action/account'
import call from './api'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionSettings from 'material-ui/svg-icons/action/settings';

class Master extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      loginDialogOpen: false,
    };

    this.handleLoginDialogOpen = (state) => {
      this.setState({loginDialogOpen: state});
    }

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
    let logInOutButton;
    let confirmText;

    switch (this.props.status) {
      case 'incorrect': {
        confirmText = '用户名或密码错误';
        break;
      }
      case 'error': {
        confirmText = '网络通信失败';
        break;
      }
    }

    if (this.props.status == 'logged in') {
      logInOutButton = (
        <RaisedButton
          label='登出'
          primary={true}
          onClick={this.props.onLogout}
        />
      );
    } else {
      logInOutButton = (
        <div>
          <RaisedButton
            label='登录'
            primary={true}
            onClick={() => { this.handleLoginDialogOpen(true); }}
          />
          <Dialog
            title='登录失败'
            open={!!confirmText}
            onRequestClose={this.props.onConfirmError}
            actions={
              <FlatButton
                label='确定'
                primary={true}
                onClick={this.props.onConfirmError}
              />
            }
          >
            {confirmText}
          </Dialog>
        </div>
      );
    }

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

          <Dialog
            title='登录'
            open={this.state.loginDialogOpen}
            onRequestClose={() => this.handleLoginDialogOpen(false)}
            contentStyle={{width: 400}}
            actions={[
              <FlatButton
                label='登录'
                primary={true}
                onClick={
                  () => {
                    call('login', {
                      username: this.state.username,
                      password: this.state.password
                    }, accountAction.LOGIN_RESP);
                    this.handleLoginDialogOpen(false);
                  }
                }
              />,
              <FlatButton
                label='取消'
                onClick={() => {this.handleLoginDialogOpen(false)}}
              />
            ]}
          >
            <TextField
              floatingLabelText='用户名'
              style={{width: '100%'}}
              onBlur={(e) => {this.setState({username: e.target.value})}}
            />
            <br />
            <TextField
              floatingLabelText='密码'
              type='Password'
              style={{width: '100%'}}
              onBlur={(e) => {this.setState({password: e.target.value})}}
            />
          </Dialog>

          <Drawer
            open={this.state.navDrawerOpen}
            docked={false}
            onRequestChange={this.handleChangeRequestNavDrawer}
          >
            <List>
              <ListItem
                disabled={true}
                children={
                  <div style={{height: 80}}>
                    <div style={{display: 'inline-block', position: 'absolute'}}>
                      <Avatar size={60}>{this.props.username[0]}</Avatar>
                    </div>
                    <div style={{position: 'absolute',
                      display: 'inline-block',
                      left: 100
                    }}>
                      {logInOutButton}
                      <div style={{marginTop: 10}}>{this.props.username}</div>
                    </div>
                  </div>
                }
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
    status: {$set: state.account.status},
    username: {$set: state.account.username ? state.account.username : '游客'},
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    onConfirmError: () => {
      dispatch(accountAction.confirmLoginError());
    },
    onLogout: () => {
      dispatch(accountAction.logout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Master);
