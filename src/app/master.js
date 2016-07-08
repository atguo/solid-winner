import React, {Component} from 'react';
import Title from 'react-title-component'
import {connect} from 'react-redux';
import update from 'immutability-helper'

import AppDrawer from './component/app_drawer'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';

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

    this.handleSetNavDrawerOpen = (open) => {
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

          <AppDrawer
            open={this.state.navDrawerOpen}
            lower={this.state.lowerDrawer}
            handleSetNavDrawerOpen={this.handleSetNavDrawerOpen}
          />

          {
            React.cloneElement(this.props.children, {
              onLowerDrawerChange: (lower) => {
                this.setState({lowerDrawer: lower});
              }
            })
          }

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
