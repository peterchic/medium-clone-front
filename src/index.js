import ReactDOM from 'react-dom';
import App from './App'
import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const defaultState = {
  appName: 'conduit',
  articles: null
}

const reducer = function( state = defaultState, action) {
  return state
}

const store = createStore(reducer)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
