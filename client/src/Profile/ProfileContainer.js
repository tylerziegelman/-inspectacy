import React from "react";
import axios from "axios";
import "../App.css";
import "./Profile.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInspectors } from "../inspectors/actions";
import { getUser } from "../user/actions";
import MessageComponent from "../Message/Message";
import InspectionRequestModal from "./InspectionRequestModal";
import { Tabs, Button } from "antd";

let buttonStyle = {
  float: "left"
};
class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      mode: "top"
    };

    this.skills = this.skills.bind(this);
  }

  componentDidMount() {
    const { getInspectors } = this.props;
    getInspectors();
    getUser();
  }

  skills() {
    const { skills } = this.props;
    return skills.map(skill => {
      return <h4 key={skill.id}>-{skill}</h4>;
    });
  }

  render() {
    const { inspectors } = this.props;
    const { userUsername } = this.props;
    const { user_id } = this.props;

    let url_inspector_id = window.location.href.split("/").pop();
    let inspector_id = url_inspector_id;

    let the_url = "";
    let inspector_username = null;
    let inspector_fullname = null;
    let user_username = userUsername;
    let position = 0;
    if (inspectors.inspectors.length) {
      for (var i = 0; i < inspectors.inspectors.length; i++) {
        if (inspectors.inspectors[i].id == url_inspector_id) {
          position = i;
        }
      }

      the_url = inspectors.inspectors[position].user.image_url;
      inspector_username = inspectors.inspectors[position].user.username;
      inspector_fullname =
        inspectors.inspectors[position].user.first_name +
        " " +
        inspectors.inspectors[position].user.last_name;
    }

    const TabPane = Tabs.TabPane;

    const operations = (
      <InspectionRequestModal userInfo={{ inspector_id, user_id }} />
    );

    return (
      <div>
        <Tabs tabBarExtraContent={operations}>
          <TabPane tab="Overview" key="1">
            <div className="profile-picture test"
              style={{
                backgroundImage: `url(${the_url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "center"
              }}
            >
            </div>
            <h1 className="inspector-fullname">{inspector_fullname}</h1>
            <div className="inspector-description test">
              I am the dude. I like bowling, white russians and hate the fucking
              eagles man. Don't like my inspections? well that's just like you
              opinion man .{" "}
            </div>
          </TabPane>
          <TabPane tab="Specialties" key="2">
            {" "}
            <div className="profile-skills-list test">
              <h1>Skills</h1>
              {this.skills()}
            </div>
          </TabPane>
        </Tabs>

        <div className="profile-wrapper wrap">
          <div className="flex-wrap" />
        </div>

        <MessageComponent
          isOpenOnLoad={false}
          reset = {()=>{}}//empty function being used elsewhere but not for this one
          sender={user_username.username}
          receiver={inspector_username}
        />
      </div>
    );
  }
}

// const mapStateToProps = (state)=>({
//   user: state.inspectors.skills
// })

const mapStateToProps = (state, props) => {
  // console.log("mapstatetoProps " + state.inspectors);
  return {
    ...props,
    skills: state.inspectors.skills,
    inspectors: state.inspectors,
    userUsername: state.user.user,
    user_id: state.user.user.id
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getInspectors,
      getUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
