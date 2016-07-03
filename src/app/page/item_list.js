import React from 'react'
import {Component} from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Popover from "material-ui/Popover"
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert'


const tilesData = [
  {
    img: 'http://placehold.it/300x300',
    title: 'Breakfast',
    price: "30$",
    author: 'jill111',
  },
  {
    img: 'http://placehold.it/300x300',
    title: 'Tasty burger',
    price: "30$",
    author: 'pashminu',
  },
  {
    img: 'http://placehold.it/300x300',
    title: 'Camera',
    price: "30$",

    author: 'Danson67',
  },
  {
    img: 'http://placehold.it/300x300',
    title: 'Morning',
    price: "30$",
    author: 'fancycrave1',
  },
  {
    img: 'http://placehold.it/300x300',
    title: 'Hats',
    price: "30$",
    author: 'Hans',
  },
  {
    img: 'http://placehold.it/300x300',
    title: 'Honey',
    price: "30$",
    author: 'fancycravel',
  },
  {
    img: 'http://placehold.it/300x300',
    title: 'Vegetables',
    price: "30$",
    author: 'jill111',
  },
  {
    img: 'http://placehold.it/300x300',
    title: 'Water plant',
    price: "30$",
    author: 'BkrmadtyaKarki',
  },
];



class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open:false,
    }

    this.handleTouchTap = (event) => {
      event.preventDefault();

      this.setState({
        open:true,
        anchorEl: event.currentTarget,
      })
    };

    this.handleRequestClose = (event) => {
      this.setState({
        open:false,
      });
    }

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



  render() {
    return <div style={this.styles.root}>
      <GridList
        style={this.styles.gridList}
        height={200}
        cols={5}
        padding={10}
      >
        {tilesData.map((tile) => (
          <GridTile
            key={tile.title}
            title={tile.title}
            subtitle={tile.price}
            actionIcon={<div>
                        <IconButton
                          onTouchTap={this.handleTouchTap}>
                          <NavigationMoreVert color="white"/>
                         </IconButton>
                         <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                          >
                            <Menu>
                              <MenuItem primaryText="Refresh" />
                              <MenuItem primaryText="Help &amp; feedback" />
                              <MenuItem primaryText="Settings" />
                              <MenuItem primaryText="Sign out" />
                            </Menu>
                         </Popover>

                      </div>}
            actionPosition="left"
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            cols={1}
            rows={1}
          >
            <img src={tile.img}/>
          </GridTile>
        ))}
      </GridList>
    </div>
  }

}

export default ItemList;