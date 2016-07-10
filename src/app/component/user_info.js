import React, {Component} from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper'
import {store} from '../app'
import call from '../api'
import * as accountAction from '../action/account'

import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginDialogOpen: false,
    };

    this.handleSetLoginDialogOpen = (state) => {
      this.setState({loginDialogOpen: state});
    }
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
        <div>
          <RaisedButton
            label='登出'
            primary={true}
            onClick={this.props.onLogout}
          />
      </div>
      );
    } else {
      logInOutButton = (
        <div>
          <RaisedButton
            label='登录 / 注册'
            primary={true}
            onClick={() => { this.handleSetLoginDialogOpen(true); }}
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
      <div>

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

      <Dialog
        title='登录'
        open={this.state.loginDialogOpen}
        onRequestClose={() => this.handleSetLoginDialogOpen(false)}
        contentStyle={{width: 400}}
        actions={[
          <FlatButton
            label='注册'
            secondary={true}
            onClick={
              () => {
                this.props.history.push('/Register');
                this.props.handleSetNavDrawerOpen(false);
                this.handleSetLoginDialogOpen(false);
              }
            }
          />,
          <FlatButton
            label='登录'
            primary={true}
            onClick={
              () => {
                call('login', {
                  username: this.state.username,
                  password: this.state.password
                }, (data, err) => {
                  store.dispatch({type: accountAction.LOGIN_RESP,
                                  data: data})
                });
                this.handleSetLoginDialogOpen(false);
              }
            }
          />,
        <FlatButton
          label='取消'
          onClick={() => {this.handleSetLoginDialogOpen(false)}}
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

    </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return update(props, {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
