import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
import { BrowserRouter } from 'react-router-dom';
import './reset.css';
import './index.css';
import App from './App.jsx';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as questionActions from './store/question';
import * as userActions from './store/user';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.questionActions = questionActions;
  window.userActions = userActions;
}

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter5Adapter} >
          <App />
        </QueryParamProvider>
      </BrowserRouter>
    </Provider>
  );
};

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

if (
  sessionStorage.getItem("X-CSRF-Token") === null ||
  sessionStorage.getItem("currentUser") === null
  ) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}