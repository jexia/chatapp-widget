import React from "react";
import { ChatLogo, Archive } from "../../consts/images";
import history from "../../history";
import * as styled from "./styled";
import * as color from "../../consts/colors";

class ChatBar extends React.Component {

  state = {
    messages: ""
  };

  render() {
    return (
      <styled.LeftBarWrapper>
        <styled.Menu>
          <styled.ButtonChats color={color.mainColor}>
            <styled.ChatButton>
              <img
                src={ChatLogo}
                alt="Chat image"
              />
            </styled.ChatButton>
            <span>Chat</span>
          </styled.ButtonChats>
          <styled.ButtonChats
            color={color.archiveColor}
          >
            <styled.ArchiveButton onClick={() => history.push('/archive')}>
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