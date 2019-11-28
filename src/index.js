import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { store } from "./store/index";
import { Provider } from "react-redux";

import App from './App';
import history from './history';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
