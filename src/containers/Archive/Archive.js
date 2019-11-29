import React from "react";
import { connect } from "react-redux";
import ChatBar from "../../components/archive-bar-component/ChatBar";
import ChatSessions from "../../components/archive-chat-session/ChatSessions";
import ChatMessage from "../../components/archive-messages/ChatMessage";
import Visible from "../../components/Visible/Visible";
import * as styled from "./styled";
import { dataModule, rmt } from "../../store/jexiaConnector";
import {receiveDataFromDataset} from "../../store/actionsCreators/actions";


class Chat extends React.Component {
  componentDidMount() {
    this.wow();
  }

  wow = async () => {
    const posts = await dataModule.dataset('archive_chats')
      .select()
      .fields("user", "session_id", "date", "last_msg", "messagesList", "unread")
      .execute();
    this.props.receiveDataFromDataset(posts);
  };
  render() {
    const { session_id } = this.props;
    return (
      <styled.ChatWrapper>
        <ChatBar />
        <ChatSessions />
        <Visible when={session_id !== null}>
          <ChatMessage />
        </Visible>
      </styled.ChatWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  session_id: state.adminData.session_id,
});

const mapDispatchToProps = (dispatch) => ({
  receiveDataFromDataset: (payload) => dispatch(receiveDataFromDataset(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
