import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router';
import './Login.css'
import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';
  
  class NormalLoginForm extends React.Component {
    constructor(){
      super()
      this.forgotEmail=this.forgotEmail.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            axios.post('/loginUser', {
              email: values.email,
              password: values.password,
            }).then((response) => {
              localStorage.setItem("inspectacyjwt", `Bearer ${response.data.access_token.token}`)
              this.props.history.push("/")
            })
          }
        });
    }
    
    forgotEmail(e){
      e.preventDefault();
      console.log('This will send forgot email but its not set up')
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className ="login-wrapper">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item className="login-form-input">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </Form.Item>
          <Form.Item className="reg-form-input">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,255,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <button className="login-form-forgot" onClick={this.forgotEmail}>Forgot Password</button>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or 
            <button className="login-form-register" onClick={()=>{this.props.history.push("/register")}}>Register Now!</button>
          </Form.Item>
        </Form>
        </div>
      );
    }
  }
  
  const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
  export default withRouter(WrappedNormalLoginForm)