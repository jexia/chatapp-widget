import React from "react";
import * as color from "../../../consts/colors";
import * as styled from "./style";

class ChatList extends React.Component {

  state = {
    chosenSession_id: null,
    active: "",
  };

  handleClick = () => {
    this.props.onHeaderClick(this.props.value);
  };

  openChatSession = (sId) => {
    const { saveSessionId, handleChooseSession } = this.props;
    this.handleClick();
    saveSessionId(null);
    setTimeout(() => {
      saveSessionId(sId);
    }, 100);
  };

  render() {
    const {
      user,
      time,
      unread,
      session_id,
      date,
      last_msg,
      colorSelect,
    } = this.props;
    return (
      <styled.ChatListWrapper
        backgroundColor={colorSelect}
        // chosenSession_id={this.state.active === session_id}
        onClick={() => this.openChatSession(session_id)}
      >
        <styled.MainInfo
          color={color.textColor}
          fontColor={color.black}
        >
          <div>{user}</div>
          <div>{date}</div>
        </styled.MainInfo>
        <styled.ChatContent
          color={color.white}
          background={color.red}
          fontColor={color.textColor}
          unread_msg={unread}
        >
          <div>{last_msg.length <= 10 ? last_msg : last_msg.slice(0, 10).concat("...")}</div>
          <div>{}</div>
        </styled.ChatContent>
      </styled.ChatListWrapper>
    )
  }
}

export default ChatList;