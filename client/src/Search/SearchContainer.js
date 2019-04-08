import React from 'react';
import SearchPresentational from './SearchPresentational'; // <-- that's the presentational component
import '../App.css'
import './Search.css'

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return <SearchPresentational {...this._extract()} />;
  }
  _extract() {
    return {
      text: 'Search is working',
      number: 1
    };
  }
};