import {
  Form, Input, Select, Button, AutoComplete,
} from 'antd';
import './Inspector_Registration.css'
import React from 'react'
import axios from 'axios';
import { withRouter } from "react-router"
import FormItem from 'antd/lib/form/FormItem';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const inputStyles = {
  width: "80%",
  height: "35px",
  borderRadius: "5px",
  border: "1px solid black",
  fontSize: "20px"
}

class InspectorRegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      skills: ["skill 1"]
    };
    this.addAnotherSkill = this.addAnotherSkill.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let skills = (Object.values(values))
        
        console.log(localStorage.getItem("inspectacyjwt"))
        axios.post('/createSkills', 
        {Headers: {'Authorization':`${localStorage.getItem('inspectacyjwt')}`}},
        {
          skills:skills
        }).then((response) => {
          console.log(response)
          this.props.history.push("/home")
        }).catch((e)=>{
          console.log(e)
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

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
  addAnotherSkill() {
    let array = this.state.skills
    let skills = "skill " + this.state.skills.length
    array.push(skills)
    this.setState({
      skills: array
    })
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

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (


      <Form className="form-reg" onSubmit={this.handleSubmit}>
        {this.state.skills.map((e, index) => {
          if (index === this.state.skills.length - 1) {
            return (<Form.Item {...formItemLayout} label={`Skill ${index + 1}`}>
              {getFieldDecorator(`skill ${index + 1}`, {
                rules: [{ required: true, message: 'Skill Required!' }],
              })(<Input style={inputStyles} />)}
              <Form.Item>
                <Button type="primary" onClick={this.addAnotherSkill}>Add Another Skill</Button>
              </Form.Item>
            </Form.Item>)
          } else {
            return (<Form.Item {...formItemLayout} label={`Skill ${index + 1}`}>
              {getFieldDecorator(`skill ${index + 1}`, {
                rules: [{ required: true, message: 'Skill Required!' }],
              })(<Input style={inputStyles} />)}
            </Form.Item>)
          }
        })}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Submit Skills</Button>
        </Form.Item>

      </Form>
    );
  }
}

const WrappedInspectorRegistrationForm = Form.create({ name: 'register' })(InspectorRegisterForm);
export default withRouter(WrappedInspectorRegistrationForm) 