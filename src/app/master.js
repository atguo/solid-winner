import React, {Component} from 'react';
import Title from 'react-title-component'
import {connect} from 'react-redux';
import update from 'immutability-helper'

import AppDrawer from './component/app_drawer'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';

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
    let docked;
    let contentStyle;
    let theme = getMuiTheme(lightBaseTheme);
    if (this.props.width == LARGE) {
      docked = true;
      contentStyle = {
        marginLeft: theme.drawer.width,
      };
    } else {
      docked = false;
      contentStyle = {};
    }

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div style={contentStyle}>
          <Title render={this.props.title} />
          <AppBar
            iconElementLeft={docked ? <div /> : null}
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
            open={this.state.navDrawerOpen || docked}
            docked={docked}
            zDepth={docked ? 1 : 2}
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

export default connect(mapStateToProps)(withWidth()(Master));
