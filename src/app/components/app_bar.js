
class MyAppBar extends Component {
  render() {
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
          title='Title'
          iconElementRight={
            <IconButton>
              <ActionShoppingBasket />
            </IconButton>
          }
        />
      </div>
    );
  }
}
