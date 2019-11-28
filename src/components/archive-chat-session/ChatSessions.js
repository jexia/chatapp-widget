import React from "react";
import ChatList from "./ChatList/ChatList";
import { connect } from "react-redux";
import * as styled from "./style";
import * as color from "../../consts/colors";
import { addMessageToList, receiveDataFromDataset, saveSessionId } from "../../store/actionsCreators/actions";
import { filter, pluck } from "rxjs/operators";
import { dataModule, rmt } from "../../store/jexiaConnector";

class ChatSessions extends React.PureComponent {

  state = {
    users: [],
    message: [],
    active: null,
  };

  componentDidMount() {
    this.props.saveSessionId(null);
    this.wow();
  }

  wow = async () => {
    const posts = await dataModule.dataset('archive_chats')
      .select()
      .fields("user", "session_id", "date", "last_msg", "messagesList", "unread")
      .execute();
    this.props.receiveDataFromDataset(posts);
  };

  onClick = (index) => {
    this.setState({
      active: index,
    });
  };

  openChatSession = (sId, i) => {
    const { saveSessionId } = this.props;
    saveSessionId(null);
    this.onClick(i);
    setTimeout(() => saveSessionId(sId), 100);
  };

  render() {
    const { usersArray, saveSessionId } = this.props;
    return (
      <styled.ChatSessionsWrapper>
       <styled.Title
        color={ color.archiveColor }
       >
         Archive
       </styled.Title>
        <styled.ChatListHolder>
          {
            usersArray !== null || undefined ? usersArray.map((el, i) => {
              return (
                <ChatList
                  date={el.date}
                  last_msg={el.last_msg}
                  key={el.session_id}
                  user={el.user}
                  unread_msg={el.unread}
                  session_id={el.session_id}
                  saveSessionId={saveSessionId}
                  subscribeOnChannel={this.subscribeOnChannel}
                  onHeaderClick={() => this.openChatSession(el.session_id, i)}
                  colorSelect={i === this.state.active ? color.lightGray : null}
                />
              )
            }) : null
          }
        </styled.ChatListHolder>
      </styled.ChatSessionsWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  usersArray: state.adminData.usersArray,
  messagesList: state.adminData.messagesList,
  _sID: state.adminData.session_id,
});

const mapDispatchToProps = (dispatch) => ({
  receiveDataFromDataset: (usersArray) => dispatch(receiveDataFromDataset(usersArray)),
  saveSessionId: (session_id) => dispatch(saveSessionId(session_id)),
  addMessageToList: (message) => dispatch(addMessageToList(message)),
});

export default connect(mapStateToProps, mapDispatchToProps) (ChatSessions);