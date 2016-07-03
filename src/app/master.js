import React, {Component} from 'react';
import Title from 'react-title-component'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

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
          />

          <Drawer
            open={this.state.navDrawerOpen}
            docked={false}
            onRequestChange={this.handleChangeRequestNavDrawer}
          >
          </Drawer>
          
          {this.props.children}

        </div>
      </MuiThemeProvider>
    )
  }
}

export default Master;
