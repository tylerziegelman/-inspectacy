import React from 'react';
import LoginPresentational from './LoginPresentational'; // <-- that's the presentational component
import axios from 'axios';
import '../App.css'
import './Login.css'

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'bob@bob.com3',
      password: 'password'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios.post('/loginUser', {
      email: this.state.email,
      password: this.state.password
    }).then((response)=> {
      localStorage.setItem('inspectacy_token', response.data.access_token.token);
      this.props.history.push('/profile')
    }).catch((error) => {
        console.log(error)
    })
  }
  
  componentDidMount(){
    this.handleSubmit()
  }

  render() {
    return <LoginPresentational {...this._extract()} />;
  }
  
  _extract() {
  
    return {
      email: 'bob@bob.com3',
      password: 'password'
    };
  }
};