import styled from "styled-components";

export const ChatListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin: 3% 0 0 0;
  padding: 4% 0 4% 8%;
  background-color: ${props => props.backgroundColor};
  height: 6vh;
  width: 12vw;
  
  &:hover {
    background-color: #ededed;
  }
`;

export const MainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  div:nth-child(1) {
    color: ${props => props.fontColor};
  }
  
  div:nth-child(2) {
    color: ${props => props.color};
    margin-right: 8%;
  }
`;

export const ChatContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  margin: 2% 0 0 0;
  
  div:nth-child(1) {
    color: ${props => props.fontColor};
    font-size: 0.9em;
  }
  
  div:nth-child(2) {
    background-color: ${props => props.unread_msg ? props.background : ""};
    border-radius: 50%;
    
    width: 20px;
    height: 20px;
    
    margin: 0 12% 0 auto;
    font-size: 0.9em;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    color: ${props => props.color};
  }
  
  
`;