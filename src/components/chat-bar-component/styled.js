import styled from "styled-components";

export const LeftBarWrapper = styled.div`
  //border: 1px solid white;
  background-color: #ced6e0;
  color: black;
  
  height: 100vh;
  width: 10vw;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Menu = styled.div`
  height: 20%;
  margin: 4% 0 0 0;
  padding: 15% 0 0 0;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  img {
    width: 26px;
    height: 26px;
  }
`;

export const ButtonChats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
   span {
    margin-top: 10px;
    color: #686868;
   }
`;

export const ChatButton = styled.div`
  border: none;
  background-color: #29b6f6;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
`;

export const ArchiveButton = styled(ChatButton)`
  background-color: #a2a2a2;
`;