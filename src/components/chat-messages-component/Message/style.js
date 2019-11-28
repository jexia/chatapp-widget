import styled from "styled-components";

export const Message = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  
  margin: 2% 0 2% 0;
`;

export const MsgInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  
  height: 80px;
  width: 14%;
  margin: 2% 0 0 0;
  
  // div:nth-child(1) {
  //   border: ${props => props.background};
  //   background-color: ${props => props.background};
  //   color: #ffff;
  //  
  //   border-radius: 35px;
  //  
  //   width: 60px;
  //   height: 60px;
  //  
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }
  
  div:nth-child(2) {
    color: ${props => props.color};
    font-size: 0.9em;
    
    margin-top: 5%;
  }
`;

export const Circle = styled.div`
  border: ${props => props.background};
  background-color: ${props => props.circleColor ? "grey" : props.background};
  color: #ffff;
  
  border-radius: 35px;
  
  width: 60px;
  height: 60px;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MsgContent = styled.div`
  width: 70%;
  min-height: 55px;
  padding: 1%;
  border: 1px solid ${props => props.border};
  color: ${props => props.color};
  border-radius: 10px;
  
  display: flex;
  align-items: center;
  
 div {
  width: 100%;
  word-wrap: break-word;
  text-align: justify;
 }
  
`;