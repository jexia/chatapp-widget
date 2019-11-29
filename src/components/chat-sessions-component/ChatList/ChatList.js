import React from "react";
import * as color from "../../../consts/colors";
import * as styled from "./style";
import { Archive_Two } from "../../../consts/images"
import { rmt, dataModule } from "../../../store/jexiaConnector";
import { filter, pluck } from "rxjs/operators";

const user_channel = rmt.channel("users");

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenSession_id: null,
      active: "",
      chosen: false,
    };
  }

  handleClick = () => {
    this.props.onHeaderClick(this.props.value);
  };

  openChatSession = (sId, user_id) => {
    const { saveSessionId, subscribeOnChannel } = this.props;
    this.handleClick();
    this.readMessage(user_id);
    this.setState({
      chosen: true,
      chosenSession_id: sId,
    });
    saveSessionId(null);

    setTimeout(() => {
      saveSessionId(sId);
      subscribeOnChannel(sId);
    }, 100);
  };

  readMessage = (id) => {
    user_channel.publish({
      msg: "readed",
    });
    this.props.changeFlagOfMessage(id);
  };

  moveChatToArchive = ( payload, userID ) => {
    const {
      removeChatToArchive,
      removeChatFromActive,
      archived,
      wow,
    } = this.props;
    console.log(archived);
    user_channel.publish({ message: "moved" });
    removeChatToArchive(payload);
    removeChatFromActive(userID);
    wow();
    setTimeout(() => location.reload(), 150);
  };

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
    } = this.props;
    return (
      <styled.ChatListWrapper
        backgroundColor={colorSelect}
        onClick={() => this.openChatSession(session_id, {user, session_id, user_id, last_msg})}
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
            onClick={() => this.moveChatToArchive({ user, session_id, last_msg, date, messagesList }, user_id)}
          />
        </styled.ChatContent>
      </styled.ChatListWrapper>
    )
  }
}

export default ChatList;
