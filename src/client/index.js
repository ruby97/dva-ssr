import dva from 'dva';
import {hydrate} from 'react-dom';
import Loadable from 'react-loadable';
import './index.css';
import React from "react";
import createHistory from 'history/createBrowserHistory';

const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;

const app = dva({
  history: createHistory(),
  initialState: preloadedState
});

app.router(require('../router').default);

Loadable.preloadReady().then(() => {
  const App = app.start();
  hydrate(
    <App/>,
    document.getElementById('app')
  );
});
