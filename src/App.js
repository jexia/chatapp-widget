import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from "styled-components";
import LoginPage from "./components/login-component/Login";
import Chat from "./containers/Chat/Chat";
import Archive from "./containers/Archive/Archive";

class App extends React.Component {

  render() {
    return (
      <AppWrapper>
        <Switch>
          <Route
            path="/"
            exact
            component={LoginPage}
          />
          <Route
            path="/chat"
            exact
            component={Chat}
          />
          <Route
            path="/archive"
            component={Archive}
          />
        </Switch>
      </AppWrapper>
    );

  }
}



export default App;


const AppWrapper = styled.div`
  background-color: #fff;
`;