import React, { Component } from 'react'
import { Input, Icon } from 'antd';

const Search = Input.Search;


export default class SearchBar extends Component {
  render(props) {
    return (
      <div>
        <Search
      placeholder="Where is your item?"
      enterButton={<Icon type='search' />}
      
      onSearch={value => this.props.updateSearch(value)}
    />
      </div>
    )
  }
}
