import React from 'react'
import {store} from '../app'

import {Component} from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import {setTitle} from '../action/navigation';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import update from 'immutability-helper';
import call from "../api";


class Item extends Component {
  render() {
    console.log("PROPS KEY", this.props.itemID);
    return <GridTile
      key={this.props.itemID}
      title={this.props.title}
      subtitle={this.props.price}
      onClick={() => {this.props.history.push("/itemDetail/" + this.props.itemID)}}
      actionIcon={<IconMenu
                    iconButtonElement={<NavigationMoreVert color="white"/>}
                    anchorOrigin={{horizontal: 'left', vertical:'top'}}
                    targetOrigin={{horizontal: 'left', vertical:'top'}}
                  >
                    <MenuItem primaryText="Add to cart" />
                    <MenuItem primaryText="Detail" />
                  </IconMenu>
                  }
      actionPosition="left"
      titlePosition="top"
      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      cols={1}
      rows={1}
    >
      <img src={this.props.img}/>
    </GridTile>
  }
}


class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        marginBottom: 24,
      },
    };
  }

  componentWillMount() {
    store.dispatch(setTitle('商品列表'));
  }

  render() {
    console.log("ID", this.props.itemsInfo);
    return <div style={this.styles.root}>
      <GridList
        style={this.styles.gridList}
        height={200}
        cols={5}
        padding={10}
      >
        {this.props.itemsInfo.map((tile) => (
          <Item
            itemID={tile.itemID}
            title={tile.title}
            price={tile.price}
            img={tile.img}
            history={this.props.history}
          />
        ))}
      </GridList>
    </div>
  }

}


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onSortByChange  = (event, index, value) => {
      this.props.onSortByChange(value);
    };

    this.state = {
      query: this.props.query
    }
  }

  render() {
    return  <Toolbar>
      <ToolbarGroup>
        <DropDownMenu
          value={this.props.sortBy}
          onChange={this.onSortByChange}>
          <MenuItem value={1} label="By Price Low To High" primaryText="Price Low To High" />
          <MenuItem value={2} label="By Price High To Low" primaryText="Price High To Low" />
          <MenuItem value={3} label="By Newest Arrival" primaryText="Newest Arrival" />
          <MenuItem value={4} label="By Customer Review" primaryText="Customer Review" />
        </DropDownMenu>
        <ToolbarSeparator/>
        <ToolbarTitle text="Filters" />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle>
          Search
        </ToolbarTitle>
        <TextField
          defaultValue={this.state.query}
          onBlur={(event) => {
            this.setState(update(this.state, {query: {$set: event.currentTarget.value}}));}}
        />
        <RaisedButton
          label="Search"
          primary={true}
          onClick={(event) => { this.props.onSearchClick(this.state.query); }}
        />
      </ToolbarGroup>
    </Toolbar>
  }
}

class ItemList extends Component {
  constructor(props) {
    super(props);

    const sortBy = parseInt(props.params.sortBy, 10);
    const filterBy = parseInt(props.params.filterBy, 10);

    this.state = {
      query: props.params.query === undefined ? "" : props.params.query,
      sortBy: isNaN(sortBy) ? 1 : sortBy,
      filterBy: isNaN(filterBy) ? 1 : filterBy,
      hasData: false
    };

    this.onSortByChange  = (value) => {
      this.setState(update(this.state, {sortBy: {$set: value}}));
    };

    this.onSearchClick = (value) => {
      this.setState(update(this.state, {query: {$set: value}}));
    };

    this.requestData = () => {
      this.itemsInfo = null;
      const callback = (data, error) => {
        if(data !== null) {
          this.itemsInfo = data.itemsInfo;
          this.setState(update(this.state, {hasData: {$set: true}}));
        }
      };
      call('itemlist',
            {query: this.state.query,
              sortBy: this.state.sortBy,
              filter: this.state.filterBy},
            callback
          )
    }
  }

  componentWillMount() {
    this.requestData();
  }


  render() {
    let result = null;

    if (this.state.hasData) {
      result = (
          <SearchResult
            itemsInfo={this.itemsInfo}
            history={this.props.history}
          />
      )
    } else {
      result = (
          <div>
            <CircularProgress />
            正在加载
          </div>
      )
    }

    return <Paper>
      <SearchBar
        query={this.state.query}
        sortBy={this.state.sortBy}
        onSortByChange={this.onSortByChange}/>
      {result}
    </Paper>
  }
}

export default ItemList;
