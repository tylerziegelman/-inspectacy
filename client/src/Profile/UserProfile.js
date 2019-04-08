import React from "react";
import "../App.css";
import "./Profile.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../user/actions";
import EditableLabel from "react-inline-editing";
import axios from "axios";
import { withRouter } from "react-router-dom"
import { Tabs, Button, Modal } from 'antd';
import MessageDock from '../Message/MessageDock'
const TabPane = Tabs.TabPane;

//const operations = <button></button>;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      pendingInspections: [],
      approvedInspections: [],
      visible: false,
      inspectionToBeDisplayed: {}
    };
    this.profileItems = this.profileItems.bind(this);
    this.eachItem = this.eachItem.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
    this.handleDeny = this.handleDeny.bind(this)
    this.handleApprove = this.handleApprove.bind(this)
    this.createInspection = this.createInspection.bind(this)
    this.becomeAnInspector = this.becomeAnInspector.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
  }

  handleDeny() {
    let id = this.state.inspectionToBeDisplayed.id
    let inspector_id = this.state.inspectionToBeDisplayed.inspector_id
    axios.post("/denyInspectionRequest",
      {
        id: id,
        inspector_id: inspector_id
      }).then((response) => {
        this.setState({
          pendingInspections: response.data.pendingInspections,
          approvedInspections: response.data.approvedInspections,
          visible:false
        })
      }).catch((e) => {
        console.log(e)
      })
  }

  handleApprove() {
    let id = this.state.inspectionToBeDisplayed.id
    let inspector_id = this.state.inspectionToBeDisplayed.inspector_id
    axios.post("/approveInspectionRequest",
      {
        id: id,
        inspector_id: inspector_id
      }).then((response) => {
        this.setState({
          pendingInspections: response.data.pendingInspections,
          approvedInspections: response.data.approvedInspections,
          visible:false
        })
      }).catch((e) => {
        console.log(e)
      })
  }

  handleCancel(){
    this.setState({
      visible:false
    })
  }

  componentDidMount() {
    const { getUser } = this.props;
    getUser();
  }

  _handleFocus(key, text) {
    console.log("Focused on " + key + " which contains " + text);
  }

  _handleFocusOut(key, text) {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [key]: text
      }
    }), ()=>this.updateProfile(this.state.user))
  }

  updateProfile(user) {
    let auth = localStorage.getItem("inspectacyjwt")
    axios.put(`/updateUser`, 
     {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email:user.email,
        password:user.password,
        zipcode:user.zipcode,
        image_url:user.image_url,
    },{
      headers: {
        'Authorization': `${auth}`
      }
    }
    )
        .then((response) => {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  createInspection(request_id, inspector_id, user_id) {
    axios.post("/createInspection", {
      request_id: request_id,
      inspector_id: inspector_id,
      user_id: user_id
    }).then((response) => {
      this.props.history.push(`/inspection/${request_id}`)
    }).catch((err) => {
      console.log(err)
    })
  }

  getPendingInspections(user) {
    if (this.state.havePendingInspections === true) {
      return ("hey")
    } else {
      if (user.inspector_id === null) {
        return
      } else {
        axios.post("/getInspectionRequests", {
          inspector_id: user.inspector_id
        }).then((response) => {
          this.setState({
            pendingInspections: response.data.pendingInspections,
            approvedInspections: response.data.approvedInspections,
            havePendingInspections: true
          })
        }).catch((e) => {
          console.log(e)
        })
      }
    }
  }

  openModal(inspection) {
    this.setState({
      visible: true,
      inspectionToBeDisplayed: inspection
    })
  }

  footer(){
    return(<div>
      <Button onClick={this.handleDeny}>Deny</Button>
      <Button onClick={this.handleApprove}>Approve</Button>
      </div>
    )
  }

  becomeAnInspector() {
    let auth = localStorage.getItem("inspectacyjwt")
    // console.log(auth)
    axios.put("/becomeAnInspector", {}, {
      headers: {
        'Authorization': `${auth}`
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch((e) => console.log(e))
  }

  profileItems(user) {
    return (
      <div>
        {this.eachItem("First Name", "first_name", user.first_name)}
        {this.eachItem("Last Name", "last_name", user.last_name)}
        {this.eachItem("Username","username",user.username)}
        {this.eachItem("Email", "email", user.email)}
        {this.eachItem("Zipcode", "zipcode", user.zipcode)}
      </div>
    );
  }

  eachItem(input_name, input_key, input_text) {
    return (
      <div className="fields-with-label" key={input_key}>
        <label className="labelField">{input_name}: </label>
        <div className="inputField">
          <EditableLabel
            key={input_text}
            text={input_text}
            labelClassName="myLabelClass"
            inputClassName="myInputClass"
            inputMaxLength={50}
            onFocus={this._handleFocus.bind(this, input_key)}
            onFocusOut={this._handleFocusOut.bind(this, input_key)}
          />
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    this.getPendingInspections(user)
    return (
      <>
      <MessageDock sender={user.username}/>
        <Tabs>
          {/* <Tabs tabBarExtraContent={operations}> */}
          <TabPane tab="Inspections" key="1">
            <div className="user-profile-pane1">
              <div
                alt="Users Profile"
                className="user-profile-picture"
                style={{
                  backgroundImage: `url(${this.props.user.image_url})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPositionX: 'center'
                }}>
              </div>

              <div className="user-profile-inspections">
                <div className="inspections-lists">
                  <div className="active-inspections">
                    <h1>Active Inspections</h1>
                    {this.state.approvedInspections.map((inspections) => {
                      return (
                        <h3 className="active-inspection"><a onClick={() => this.createInspection(inspections.id, inspections.inspector_id, inspections.user_id)}>-{inspections.item} inspection</a></h3>
                      )
                    })}
                  </div>

                  <div className="pending-inspections">
                    <h1>Pending Inspections</h1>
                    <Modal
                      title={this.state.inspectionToBeDisplayed.item}
                      visible={this.state.visible}
                      // onOk={this.handleOk}
                      footer={this.footer()}
                      onCancel={this.handleCancel}
                    >
                      {/* <p>{item.image_description}</p> */}
                    </Modal>
                    {this.state.pendingInspections.map((inspection) => {
                      return (
                        <h3 className="active-inspection"><a onClick={() => this.openModal(inspection)}>-{inspection.item} inspection</a></h3>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Edit Profile" key="2">
            <div>
              <div className="profile-wrapper wrap">
                <div className="flex-wrap user-profile-top-container">
                  <div className="user-profile-details">
                    <h1>Profile</h1>
                    {this.profileItems(user)}
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUser
    },
    dispatch
  );

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile));