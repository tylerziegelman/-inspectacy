import React from 'react';
export default function LoginPresentational(props) {
    var [ email, password ] = [
      props.email,
      props.password
    ]
  
    return <div>{ email } : { password }</div>;
  };