import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import mazeReducer from './scripts/reducers/mazeReducers';
import App from './scripts/components/App';
import {createMaze,movePlayer} from './scripts/actions/mazeActions';
import './styles/css/index.css';

let store = createStore(mazeReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const calcRow=()=>{
//   let row;
//   if(window.innerWidth<window.innerHeight){ //portrait
//     //-200 ->give some slack for control panel
//     row=Math.floor((window.innerHeight-250)/12);
//   }else{//landscape
//     //-300 ->give some slack for control panel
//     row=Math.floor((window.innerHeight-300)/12);
//   }
//   return row;
// }
//
// const calcCol=()=>{
//   let col;
//   col=Math.floor((window.innerWidth-40)/12);
//   col=col > 70 ? 64 : col; //limit max col.
//   return col;
// }
store.dispatch(createMaze());
// store.dispatch(randomizeBoard());
// let intervalID=setInterval( () =>{
//   store.dispatch(nextGeneration());
// }, 200);
// store.dispatch(startGame(intervalID));

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
