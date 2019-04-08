import React from 'react';
export default function SearchPresentational(props) {
    var [ text, number ] = [
      props.text,
      props.number
    ]
  
    return <div>{ text } : { number }</div>;
  };