import React, { Component } from "react";
import axios from "axios";
import MessageComponent from "./Message";
import "./Message.css";
import { Avatar, Button } from "antd";
import { Tooltip } from "antd";

//to use this
// import MessageDock from '../Message/MessageDock'
{
  /* <MessageDock sender={user.username}/> */
}

export default class MessageDock extends Component {
  constructor() {
    super();
    this.state = {
      room: [
        // {sender:"test", receiver:"test"},{sender:"test", receiver:"test"},{sender:"test", receiver:"test"}
      ],
      sender: null,
      displayed_id: null,
      isPropsLoaded: null,
      hasRunOnce: false,
      colorList: [
        "#00CED2",
        "#007D7F",
        "#00FAFF",
        "#003F40",
        "#00E1E5",
        "#267E7F"
      ], //this variable gets wrapped around so if more users exist it wont break
      width: 0,
      height: 0
    };
    this.grabAllRooms = this.grabAllRooms.bind(this);
    this.avatarIcons = this.avatarIcons.bind(this);
    this.reset = this.reset.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  reset() {
    this.setState({ displayed_id: null });
  }

  componentDidUpdate() {
    if (this.props.sender && this.props.sender !== this.state.sender) {
      this.setState({ sender: this.props.sender });
      this.setState({ isPropsLoaded: true });
    }
    if (this.state.isPropsLoaded && !this.state.hasRunOnce) {
      this.grabAllRooms(this.props.sender);
      this.setState({ hasRunOnce: true });
    }
  }

  grabAllRooms(myUser) {
    axios
      .post(`/chatGetUserRooms`, {
        username: myUser
      })
      .then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let roomUsers = response.data[i].member_user_ids;
          let tempUser = roomUsers.filter(each => {
            if (each !== myUser) {
              return each;
            }
          });
          let tempState = this.state.room;
          tempState.push({ sender: myUser, receiver: tempUser[0] });
          this.setState({ room: tempState });
        }
        this.setState({ isPropsLoaded: true });
      });
  }

  selectUser(k) {
    this.setState({ displayed_id: k });
  }

  avatarIcons() {
    let keys = Object.keys(this.state.room);
    return this.state.room.map((each, i) => {
      let toolTitle = "Chat with ";
      return (
        <Tooltip
          key={keys[i]}
          placement="topRight"
          title={toolTitle + each.receiver}
        >
          <Button
            onClick={() => {
              this.selectUser(keys[i]);
              console.log("clicked " + keys[i]);
            }}
          >
            <Avatar
              style={{
                backgroundColor: this.state.colorList[
                  i % this.state.colorList.length
                ], //wrap around the size of the array so each color repeats
                verticalAlign: "middle"
              }}
              size={50}
            >
              {each.receiver}
            </Avatar>
          </Button>
        </Tooltip>
      );
    });
  }

  render() {
    if (this.state.displayed_id != null) {
      return (
        <div className="chat_icons fixed_front">
          <MessageComponent
            isOpenOnLoad={true}
            reset={this.reset}
            sender={this.state.room[this.state.displayed_id].sender}
            receiver={this.state.room[this.state.displayed_id].receiver}
          />
        </div>
      );
    } else if (this.state.isPropsLoaded) {
      return <div className="chat_icons fixed_front">{this.avatarIcons()}</div>;
    } else {
      return <div />;
    }
  }
}
