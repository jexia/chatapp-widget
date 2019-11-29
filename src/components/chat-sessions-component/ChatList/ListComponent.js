import React from "react";
import * as styled from "./style";
import * as color from "../../../consts/colors";
import {Archive_Two} from "../../../consts/images";

class ListComponent extends React.Component {
  sliceLastMessage = () => {
    const { last_msg } = this.props;
    return last_msg.length <= 10 ? last_msg : last_msg.slice(0, 10).concat("...");
  };

  render() {
    const {
      user,
      unread,
      session_id,
      date,
      last_msg,
      colorSelect,
      messagesList,
      user_id,
      element,
      openChatSession,
      moveChatToArchive
    } = this.props;
    return (
      <styled.ChatListWrapper
        backgroundColor={colorSelect}
        onClick={() => openChatSession(session_id, {user, session_id, user_id, last_msg})}
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
          <div>{this.sliceLastMessage()}</div>
          <div style={{color: "black"}}>
            {element.unread && <styled.UnreadMessage />}
          </div>
          <img
            style={{ marginRight: "7%"}}
            width="24"
            height="24"
            src={Archive_Two}
            alt={"Move To Archive"}
            onClick={() => moveChatToArchive({ user, session_id, last_msg, date, messagesList }, user_id)}
          />
        </styled.ChatContent>
      </styled.ChatListWrapper>
    )
  }
}

export default ListComponent;
