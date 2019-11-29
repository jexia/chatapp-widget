import React from "react";
import { filter, pluck } from "rxjs/operators";
import ChatList from "./ChatList/ChatList";
import { NoMessages } from "../../consts/images";
import { connect } from "react-redux";
import { rmt, dataModule } from "../../store/jexiaConnector";
import * as styled from "./style";
import * as color from "../../consts/colors";
import {
  addMessageToList,
  receiveDataFromDataset,
  saveSessionId,
  removeChatToArchive,
  removeChatFromActive,
  resetUnreadMessages,
  changeFlagOfMessage,
  checkMessages,
  chooseActiveSession,
} from "../../store/actionsCreators/actions";

const channel = rmt.channel("chat");
const users_channel = rmt.channel("users");

class ChatSessions extends React.PureComponent {

  state = {
    users: [],
    message: [],
    active: null,
    activeSID: null,
  };

  componentDidMount() {
    this.props.saveSessionId(null);
    this.receiveNotification();
    this.wow();
  }

  wow = async () => {
    const posts = await dataModule.dataset('users')
      .select()
      .fields("user", "session_id", "date", "last_msg", "unread")
      .execute();
    this.props.receiveDataFromDataset(posts);
  };

  subscribeOnChannel = (session_id) => {
    channel
      .pipe(
        pluck("data"), // pull out only data field
        filter((data) => data.session_id === session_id),
      ).subscribe(data => {
      channel
        .getLog(data => data("data.session_id").isEqualTo(session_id))
        .subscribe(
          (data) => {
            this.props.addMessageToList(data);
          },
          error => console.log(error)
        )
    });
  };

  receiveNotification = () => {
    users_channel
      .pipe(
        pluck("data")
      ).subscribe((data) => {
        this.wow();
    })
  };

  onClick = (index, activeSID) => {
    this.setState({
      active: index,
      activeSID,
    });
  };

  openChatSession = (sId, i) => {
    const { saveSessionId } = this.props;
    saveSessionId(null);
    this.onClick(i, sId);
    setTimeout(() => saveSessionId(sId), 100);
  };

  dynamicSort = (property) => {
    let sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a,b) => {
      let result = (a[property] > b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  };

  render() {
    const {
      usersArray,
      saveSessionId,
      messagesList,
      removeChatToArchive,
      removeChatFromActive,
      resetUnreadMessages,
      changeFlagOfArchive,
      receiveDataFromDataset,
      addMessageToList,
      isMessagesUnread,
      activeChatSession,
      chooseActiveSession,
    } = this.props;
    usersArray !== null ? console.log(usersArray.sort(this.dynamicSort("date"))) : null;
    return (
      <styled.ChatSessionsWrapper>
       <styled.Title
        color={ color.archiveColor }
       >
         Chat sessions
       </styled.Title>
        <styled.ChatListHolder>
          {
            usersArray.length === 0 ?
              <styled.NoMessages>
                <img
                  width="300"
                  height="300"
                  src={NoMessages}
                  alt={"no messages"}
                />
                <styled.Text>No Messages Yet</styled.Text>
              </styled.NoMessages>
            :
            usersArray !== null || undefined ? usersArray.sort(this.dynamicSort("date")).map((el, i) => {
              return (
                <ChatList
                  date={el.date}
                  user_id={el.id}
                  last_msg={el.last_msg}
                  archived={el.archived}
                  key={el.session_id}
                  user={el.user}
                  activeSID={this.state.activeSID}
                  element={el}
                  session_id={el.session_id}
                  saveSessionId={saveSessionId}
                  changeFlagOfMessage={this.props.changeFlagOfMessage}
                  chooseActiveSession={chooseActiveSession}
                  subscribeOnChannel={this.subscribeOnChannel}
                  onHeaderClick={() => this.openChatSession(el.session_id, i)}
                  colorSelect={i === this.state.active ? color.lightGray : null}
                  messagesList={messagesList}
                  removeChatToArchive={removeChatToArchive}
                  removeChatFromActive={removeChatFromActive}
                  addMessageToList={addMessageToList}
                  changeFlagOfArchive={changeFlagOfArchive}
                  isMessagesUnread={isMessagesUnread}
                  wow={this.wow}
                  activeChatSession={activeChatSession}
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
  session_id: state.adminData.session_id,
  isMessagesUnread: state.adminData.isMessagesUnread,
  activeChatSession: state.adminData.activeChatSession,
});

const mapDispatchToProps = (dispatch) => ({
  receiveDataFromDataset: (usersArray) => dispatch(receiveDataFromDataset(usersArray)),
  saveSessionId: (session_id) => dispatch(saveSessionId(session_id)),
  changeFlagOfMessage: (payload) => dispatch(changeFlagOfMessage(payload)),
  addMessageToList: (message) => dispatch(addMessageToList(message)),
  removeChatToArchive: (payload) => dispatch(removeChatToArchive(payload)),
  removeChatFromActive: (payload) => dispatch(removeChatFromActive(payload)),
  chooseActiveSession: (payload) => dispatch(chooseActiveSession(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps) (ChatSessions);
