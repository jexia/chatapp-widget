import React from "react";
import { connect } from "react-redux";
import Message from "./Message/Message";
import * as styled from "./style";
import { SendMessage } from "../../consts/images";
import { filter, pluck } from "rxjs/operators";
import { addMessageToList, requestLogin, saveLastMsgTime } from "../../store/actionsCreators/actions";
import { rmt, dataModule } from "../../store/jexiaConnector";

const channel = rmt.channel("chat");

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      message_text: "",
      messages: [],
    }
  }

  componentDidMount() {
    this.props.requestLogin();
    this.showMessages();
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
    let resDate = date.getHours() + ":" + date.getMinutes() < 11 ? `${date.getHours()}:0${date.getMinutes()}` : `${date.getHours()}:${date.getMinutes()}`;

    channel.publish({
      session_id: this.props._session_id,
      message: message_text,
      user: "admin",
      messageDate: resDate,
    });

  };

  showRef = () => {
    this.myRef.current.scrollTo(0, this.myRef.current.scrollHeight);
  };

  onInput = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
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
    const { message_text } = this.state;
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
});

const mapDispatchToProps = (dispatch) => ({
  addMessageToList: (message) => dispatch(addMessageToList(message)),
  requestLogin: () => dispatch(requestLogin()),
  saveLastMsgTime: (msg_time) => dispatch(saveLastMsgTime(msg_time)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ChatMessage);
