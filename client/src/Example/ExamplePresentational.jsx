// Presentational components are concert with how the things look. 
// They have the additional markup needed for making the page pretty. 
// Such components are not bound to anything and have no dependencies. 
// Very often implemented as a stateless functional components they don’t have internal state.

import React from 'react';
export default function ExamplePresentational(props) {
    var [ text, number ] = [
      props.text,
      props.number
    ]
  
    return <div>{ text } : { number }</div>;
  };