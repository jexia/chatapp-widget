import styled from "styled-components";

export const LoginWrapper = styled.div`  
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  height: 100vh;
`;

export const LoginAdmin = styled.div`
  background-color: ${props => props.color};
  border-color: #194cff;
  border-radius: 10px 10px 0 0;
  
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  img {
    width: 36px;
    height: 36px;
    margin-left: 2%;
  }
  
  span {
    color: #fff;
    margin-left: 5%;
    font-size: 1rem;
  }
  
  height: 5%;
  width: 15vw;
`;

export const InputWrapper = styled.div`
  margin-top: 0.5%;
  
  height: 9vh;
  width: 15vw;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
`;

export const CostumeInput = styled.input`
  border: 1px solid grey;
  padding: 4%;
  margin-top: 2%;
  
  width: 13.8vw;
  
  outline: none;
  
  font-size: 1rem;
  
  &::placeholder {
    font-size: 1rem;
  }
`;

export const AuthButton = styled.button`
  outline: none;
  cursor: pointer;
  
  color: #ffff;
  font-weight: bolder;
  font-size: 1rem;
  
  background-color: ${props => props.color};
  border: none;
  border-radius: 5px;
  
  height: 4vh;
  width: 4vw;
  
  margin-top: 0.8%;
  margin-left: 11%;
`;