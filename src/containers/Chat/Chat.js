import React from "react";
import { connect } from "react-redux";
import ChatBar from "../../components/chat-bar-component/ChatBar";
import ChatSessions from "../../components/chat-sessions-component/ChatSessions";
import ChatMessage from "../../components/chat-messages-component/ChatMessage";
import Visible from "../../components/Visible/Visible";
import * as styled from "./styled";

class Chat extends React.Component {
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
  isMovedToArchive: state.adminData.isMovedToArchive,
});

export default connect(mapStateToProps)(Chat);