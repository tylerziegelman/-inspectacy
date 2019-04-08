import {
  Form, 
  Input, 
  // Tooltip, 
  // Icon, 
  // Cascader, 
  Select, 
  // Row, 
  // Col, 
  // Checkbox, 
  Button, 
  AutoComplete,
} from 'antd';
import './Reg-Form.css'
import React from 'react'
import axios from 'axios';
import {withRouter} from "react-router"
import UploadImage from './UploadImage'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux' 
import {saveUrl} from '../Image/actions'
import './Reg-Form.css'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const inputStyles = {
  width: "80%",
  height: "35px",
  borderRadius: "5px",
  border: "1px solid black",
  fontSize: "20px" 
}

class RegisterForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // const {state}=this.props
   
   console.log(this.props)
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Props.url', this.props.url);
        axios.post('/createUser', {
          first_name: values.first_name,
          last_name: values.last_name,
          username: values.username,
          email: values.email,
          password: values.password,
          zipcode: values.zipcode,
          image_url: this.props.url
        }).then((response) => {
          localStorage.setItem("inspectacyjwt", `Bearer ${response.data.data.token}`)
          this.props.history.push("/")
        })
      }
    });
    // axios.post('/createUser',{
    //   first_name:values.first_name,
    //   last_name:this.state.last_name,
    //   username:this.state.username,
    //   email:this.state.email,
    //   password:this.state.password,
    //   zipcode:this.state.zipcode,
    //   image_url:this.state.image_url
    // }).then((response)=>{
    //   localStorage.setItem("inspectacyjwt",`Bearer ${response.data.data.token}`)
    // })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 0,
        },
        sm: {
          span: 12,
          offset: 8,
        },
      },
    };
    //   const prefixSelector = getFieldDecorator('prefix', {
    //     initialValue: '86',
    //   })(
    //     <Select style={{ width: 70 }}>
    //       <Option value="86">+86</Option>
    //       <Option value="87">+87</Option>
    //     </Select>
    //   );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (

      <div className="reg-form-wrapper">
      <Form className="form-reg" onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="First Name">
          {getFieldDecorator('first_name', {
            rules: [{ required: true, message: 'first name is required!' }],
          })(<Input style={inputStyles}/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Last Lame">
          {getFieldDecorator('last_name', {
            rules: [{ required: true, message: 'last name Required!' }],
          })(<Input style={inputStyles} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'username Required!' }],
          })(<Input style={inputStyles} />)}
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input style={inputStyles} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input style={inputStyles} type="password" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input style={inputStyles} type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item  {...formItemLayout} label="Zipcode">
          {getFieldDecorator('zipcode', {
            rules: [{

            }, {
              required: true, message: 'Please input your zipcode',
            }]
          })(<Input style={inputStyles} type="zipcode" />)}
        </Form.Item>
        <UploadImage className="reg-upload"/>
        <Form.Item {...tailFormItemLayout}>
          <Button className="reg-form-btn" type="primary" htmlType="submit">Register</Button>
        </Form.Item>
        
      </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegisterForm);

const mapStateToProps = (state, props) => {
  // console.log('image'+state.image.url)
  return {
    ...props,
    url: state.image.url
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
saveUrl,
},dispatch)

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedRegistrationForm))