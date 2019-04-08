import React, { Component } from "react";
import axios from "axios";
import Chatkit from "@pusher/chatkit-client";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInspectors } from "../inspectors/actions";
import "./Message.css";
import { Tooltip } from "antd";
import {
  ThemeProvider,
  Avatar,
  TitleBar,
  TextInput,
  MessageList,
  Message,
  MessageText,
  CloseIcon,
  ChatIcon,
  FixedWrapper,
  MessageGroup,
  TextComposer,
  Row,
  IconButton,
  SendButton
} from "@livechat/ui-kit";

const themes = {
  myTheme: {
    TitleBar: {
      css: {
        backgroundColor: "rgba(0,0,0,0)",
        color: "black"
      }
    },
    MessageList: {
      css: {
        border: "2px black solid",
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: "1em"
      }
    },
    TextComposer: {
      css: {
        marginTop: "3px",
        border: "1px black solid",
        borderRadius: "1em"
      }
    }
  }
};

class MessageComponent extends Component {
  constructor() {
    super();
    this.state = {
      messageInput: "",
      messages: [],
      chatOpen: true,
      sender: null,
      receiver: null,
      room: "",
      roomName: "",
      isPropsLoaded: false,
      hasRunOnce: false
    };

    this.listMessages = this.listMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.connect = this.connect.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.shortenWordLength = this.shortenWordLength.bind(this);
  }

  componentDidMount() {
    this.setState({ isPropsLoaded: false });
  }

  componentDidUpdate() {
    if (
      this.props.sender &&
      this.props.sender !== this.state.sender &&
      this.props.receiver !== this.state.receiver
    ) {
      this.setState({ sender: this.props.sender });
      this.setState({ receiver: this.props.receiver });
      this.setState({ isPropsLoaded: true });
    }
    if (this.state.isPropsLoaded && !this.state.hasRunOnce) {
      console.log(
        "Message room " + this.state.sender + " and " + this.state.receiver
      );
      this.createRoom(this.state.sender, this.state.receiver);
      this.setState({ hasRunOnce: true });
    }
  }

  createRoom(sender, receiver) {
    axios
      .post(`/chatCreateRoom`, {
        user_id: sender,
        inspector_id: receiver
      })
      .then(response => {
        this.setState({
          room: response.data.room_id.toString(),
          roomName: response.data.room_name.toString()
        });
        this.connect(sender, response.data.room_id.toString());
      });
  }

  connect(user, roomId) {
    const tokenProvider = new Chatkit.TokenProvider({
      url:
        "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/de3048e3-a9e4-419d-9f8f-0d0705708303/token"
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR,
      userId: user,
      tokenProvider: tokenProvider
    });

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            var joined = this.state.messages;
            let truncatedText = this.shortenWordLength(message.text, 40);
            joined.push({ user: message.senderId, text: truncatedText });
            this.setState({ messages: joined });
          }
        }
      });
    });
  }

  shortenWordLength(sentence, l) {
    let words = sentence.split(" ");

    for (let i = 0; i < words.length; i++) {
      if (words[i].length > l) {
        let word = words[i].split("");
        let newWord = [];
        while (word.length) {
          let temp = word.splice(0, l);
          let joinedTemp = temp.join("");
          newWord.push(joinedTemp);
          newWord.push(" ");
        }
        let composedWord = newWord.join("");
        words.splice(i, 1, composedWord);
      }
    }
    let finalWords = words.join(" ");
    return finalWords;
  }

  listMessages() {
    var i = 100;
    return this.state.messages.map(item => {
      i++;
      if (this.state.sender === item.user) {
        return (
          <Row reverse key={i.toString()}>
            <Avatar
              isOwn={true}
              letter={item.user[0]}
              style={{ backgroundColor: "#003F40", color: "white" }}
            />
            <MessageGroup onlyFirstWithMeta>
              <Message isOwn={true} style={{ color: "#003F40" }}>
                <MessageText> {item.text}</MessageText>
              </Message>
            </MessageGroup>
          </Row>
        );
      } else
        return (
          <Row key={i.toString()}>
            <Avatar
              isOwn={false}
              letter={item.user[0]}
              style={{ backgroundColor: "#007D7F", color: "white" }}
            />
            <MessageGroup onlyFirstWithMeta>
              <Message isOwn={false} style={{ color: "#007D7F" }}>
                <MessageText> {item.text}</MessageText>
              </Message>
            </MessageGroup>
          </Row>
        );
    });
  }

  sendMessage(sender, room, input) {
    if (input.length) {
      axios.post(`/chatSendMessage`, {
        sender_id: sender,
        room_id: room,
        message: input
      });
    } else {
      console.log("Field is Empty");
    }
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={themes["myTheme"]}>
          <FixedWrapper.Root maximizedOnInit={this.props.isOpenOnLoad}>
            <FixedWrapper.Maximized>
              <Maximized
                sender={this.state.sender}
                room={this.state.room}
                roomName={this.state.roomName}
                messageInput={this.state.messageInput}
                listMessages={this.listMessages}
                handleChange={this.handleChange}
                sendMessage={this.sendMessage}
                reset={this.props.reset}
              />
            </FixedWrapper.Maximized>
            <FixedWrapper.Minimized>
              <Minimized />
            </FixedWrapper.Minimized>
          </FixedWrapper.Root>
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    user: state.inspectors.skills
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getInspectors
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageComponent);

const Maximized = ({
  listMessages,
  sendMessage,
  minimize,
  sender,
  room,
  roomName,
  reset
}) => {
  return (
    <div className="fixed_front maximized_window">
      <TitleBar
        rightIcons={[
          <IconButton
            key="close"
            onClick={() => {
              minimize();
              reset();
            }}
          >
            <CloseIcon />
          </IconButton>
        ]}
        title={roomName}
      />
      <div
        style={{
          flexGrow: 1,
          minHeight: 0,
          height: "100%"
        }}
      >
        <MessageList active containScrollInSubtree>
          {listMessages()}
        </MessageList>
      </div>
      <TextComposer
        onSend={data => {
          sendMessage(sender, room, data);
        }}
      >
        <Row align="center">
          <TextInput />
          <SendButton />
        </Row>
      </TextComposer>
    </div>
  );
};

const Minimized = ({ maximize }) => (
  <div className="fixed_front minimized_window">
    <Tooltip placement="topRight" title="Chat with inspector">
      <IconButton onClick={maximize}>
        <ChatIcon />
      </IconButton>
    </Tooltip>
  </div>
);
