import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './scripts/reducers/combineReducer';
import App from './scripts/components/App';
import {createMaze,toggleLight,movePlayer} from './scripts/actions/mazeActions';
import './styles/css/index.css';

let store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(createMaze());
store.dispatch(toggleLight());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

function keyHandlers(){
  document.onkeydown=function(event){
    store.dispatch(movePlayer(event.key));
    event.preventDefault();
  };
}

document.addEventListener("DOMContentLoaded",function(e){
  keyHandlers();
});
