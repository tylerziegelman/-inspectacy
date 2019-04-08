// Containers know about data, it’s shape and where it comes from. 
// They know details about how the things work or the so called business logic. 
// They receive information and format it so it is easy to use by the presentational component. 
//Very often we use higher-order components to create containers. 
//Their render method contains only the presentational component. 
//In the context of the flux architecture that’s the bit which is bound to the stores’ changes and calls action creators.

import React from 'react';
import ExamplePresentational from './ExamplePresentational'; // <-- that's the presentational component

export default class ExampleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return <ExamplePresentational {...this._extract()} />;
  }
  _extract() {
    return {
      text: 'Sample Text',
      number: 42
    };
  }
};