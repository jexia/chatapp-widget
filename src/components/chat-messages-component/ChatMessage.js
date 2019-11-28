import React from "react";
import { connect } from "react-redux";
import Message from "./Message/Message";
import * as styled from "./style";
import { SendMessage } from "../../consts/images";
import { filter, pluck } from "rxjs/operators";
import {
  addMessageToList,
  checkMessages,
  requestLogin,
  saveLastMsgTime,
  saveSessionId
} from "../../store/actionsCreators/actions";
import { rmt, dataModule } from "../../store/jexiaConnector";

const channel = rmt.channel("chat");
const user_channel = rmt.channel("users");

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      message_text: "",
      messages: [],
      highlightInput: false,
    }
  }

  componentDidMount() {
    this.props.requestLogin();
    this.showMessages();
    this.receiveNotification();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.showRef();
  }

  showMessages = () => {
    channel
      .getLog(data => data("data.session_id").isEqualTo(this.props._session_id))
      .subscribe(
        (data) => this.props.addMessageToList(data),
        error => console.log(error)
      )
  };


  sock = () => {
    const { message_text } = this.state;

    channel
      .pipe(
        pluck("data"), // pull out only data field
        filter((data) => data.session_id === this.props._session_id),
      ).subscribe(data => {
      channel
        .getLog(data => data("data.session_id").isEqualTo(this.props._session_id))
        .subscribe(
          (data) => {
            this.props.addMessageToList(data);
          },
          error => console.log(error)
        )
    });

    let date = new Date();
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    let resDate = date.getHours() + ":" + minutes;

    if(!message_text) {
      this.setState({
        highlightInput: true,
      });
    } else {
      channel.publish({
        session_id: this.props._session_id,
        message: message_text,
        user: "admin",
        messageDate: resDate,
      });
      this.setState({
        highlightInput: false,
      });
    }
  };

  onKeyDown = (event) => {
    const { message_text } = this.state;
    if (event.key === 'Enter') {
      if(message_text) {
        event.preventDefault();
        event.stopPropagation();
        this.handleSubmitMessage();
        this.setState({
          highlightInput: false,
        });
      } else {
        this.setState({
          highlightInput: true,
        })
      }
    }
  };

  receiveNotification = () => {
    user_channel
      .pipe(
        pluck("data"), // pull out only data field
        filter((data) => data.session_id === this.props._session_id),
      ).subscribe(data => {
      user_channel
        .getLog(data => data("data.session_id").isEqualTo(this.props._session_id))
        .subscribe(
          (data) => {
            console.log(data);
            this.props.checkMessages(data);
          },
          error => console.log(error)
        )
    });
  };

  showRef = () => {
    this.myRef.current.scrollTo(0, this.myRef.current.scrollHeight);
  };

  onInput = ( { target: { value, name } } ) => {
    this.setState({
      [ name ]: value,
    })
  };

  clearInput = () => {
    this.setState({
      message_text: "",
    })
  };

  handleSubmitMessage = () => {
    this.sock();
    this.clearInput();
  };


  render() {
    const { message_text, highlightInput } = this.state;
    const { messagesList } = this.props;
    return (
      <styled.MessagesWrapper>
        <styled.Title>Messages</styled.Title>
        <div>
          <styled.MessagesList ref={this.myRef}>
            { messagesList !== undefined ? messagesList.map((el) => {
              return <Message
                key={el.id}
                element={el}
                msgInfo={el.data}
                data={el.data.message}
              />
            })
              : null
            }

          </styled.MessagesList>
          <styled.InputWrapper
            highlightInput={highlightInput}
          >
            <styled.CostumeInput
              type="text"
              autoFocus
              name="message_text"
              placeholder={highlightInput ? "Please enter message" :"Type your message"}
              value={message_text}
              highlightInput={highlightInput}
              onChange={this.onInput}
              onKeyDown={this.onKeyDown}
            />
            <styled.Img
              src={SendMessage}
              alt="send message"
              onClick={this.handleSubmitMessage}
            />
          </styled.InputWrapper>
        </div>
      </styled.MessagesWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  message: state.userData.message,
  user_name: state.userData.user_name,
  messagesList: state.adminData.messagesList,
  adminData: state.adminData.user,
  _session_id: state.adminData.session_id,
  msg_time: state.adminData.msg_time,
  isMovedToArchive: state.adminData.isMovedToArchive
});

const mapDispatchToProps = (dispatch) => ({
  addMessageToList: (message) => dispatch(addMessageToList(message)),
  saveSessionId: (session_id) => dispatch(saveSessionId(session_id)),
  requestLogin: () => dispatch(requestLogin()),
  saveLastMsgTime: (msg_time) => dispatch(saveLastMsgTime(msg_time)),
  checkMessages: (payload) => dispatch(checkMessages(payload)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ChatMessage);
