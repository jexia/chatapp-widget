import React from "react";
import { ChatLogo, Archive } from "../../consts/images";
import * as styled from "./styled";
import * as color from "../../consts/colors";
import history from "../../history";

class ChatBar extends React.Component {

  state = {
    messages: ""
  };

  render() {
    return (
      <styled.LeftBarWrapper>
        <styled.Menu>
          <styled.ButtonChats color={color.mainColor}>
            <styled.ChatButton onClick={() => history.push('/chat')}>
              <img
                src={ChatLogo}
                alt="Chat image"
              />
            </styled.ChatButton>
            <span>Chat</span>
          </styled.ButtonChats>
          <styled.ButtonChats>
            <styled.ArchiveButton>
              <img
                src={Archive}
                alt="Archive"
              />
            </styled.ArchiveButton>
            <span>Archive</span>
          </styled.ButtonChats>
        </styled.Menu>
      </styled.LeftBarWrapper>
    )
  }
}

export default ChatBar;