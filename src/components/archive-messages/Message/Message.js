import React from "react";
import * as styled from "./style";
import * as color from "../../../consts/colors";

class Message extends React.Component {

  render() {
    const { data, element, msgInfo: { user, messageDate } } = this.props;
    return (
      <styled.Message>
        <styled.MsgInfo
          background={color.mainColor}
          color={color.textColor}
        >
          <styled.Circle
            background={color.mainColor}
            color={color.textColor}
            circleColor={user === "admin"}
          >
            {user === "admin" ? "Me" : user.split(" ").map((letter) => letter[0]).join('')}
          </styled.Circle>
          <div>{messageDate}</div>
        </styled.MsgInfo>
        <styled.MsgContent
          border={color.archiveColor}
          color={color.archiveColor}
        >
          <div>{data}</div>
        </styled.MsgContent>
      </styled.Message>
    )
  }
}

export default Message;