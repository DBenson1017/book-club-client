import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'



const rootReducer=(currentState={}, action)=> {
  switch(action.type){
    case 'FETCH_USERS': return {
      ...currentState, users: action.payload
    }
  }
  return {
    users: []
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
