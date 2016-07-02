import React, {Component} from 'react';
import Title from 'react-title-component'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class Master extends Component {
  handleTouchTapLeftIconButton() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  };


  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <Title render='Title.render' />

          <AppBar
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            title='AppBar.title'
          />

          Master:
          {this.props.children}


          <AppNavDrawer
            style={styles.navDrawer}
            location={location}
            docked={docked}
            onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
            onChangeList={this.handleChangeList}
            open={navDrawerOpen}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Master;
