import styled from "styled-components";

export const MessagesWrapper = styled.div`  
  width: 77vw;
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 1.5em;
  color: #a2a2a2;
  margin: 2% 0 0 3%;
`;

export const CostumeInput = styled.input`
  outline: none;
  border: none;
  margin: 0 0 2% 0;
  width: 92%;
  
  height: 45px;
  padding: 0 0 0 0.6%;
  
  font-size: 1.2em;
  
  &:focus {
    &::placeholder {
      color: black;
    }
  }
`;

export const InputWrapper = styled.div`
  border: 1px solid gray;
  position: relative;
  margin: 0 2% 2% 4%;
  height: 45px;
`;

export const MessagesList = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 745px;
  
  width: 50%;
  margin: 0 0 2% 3%;

  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 8%;
  left: 94%;
`;