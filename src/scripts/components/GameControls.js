import React from 'react';
import {connect} from 'react-redux';
import '../../styles/css/GameControl.css';
import {startGame,
  stopGame,
  nextGeneration,
  randomizeBoard,
  clearBoard,
  gosperGlider} from '../actions/ActionCreators';

let GameControl =({state,dispatch})=> {
    let status=(state.playing ? "Stop":"Play");
    let start=()=>{
      let intervalID=setInterval( () =>{
        dispatch(nextGeneration());
      }, 200);
      dispatch(startGame(intervalID));
    }
    let toggleGame = () => {
      if(state.playing){
        dispatch(stopGame());
      }else{
        start();
      }
    }
    let randomCells = () => {
      dispatch(stopGame());
      dispatch(randomizeBoard());
      start();
    };
    let clear = ()=>{
      dispatch(stopGame());
      dispatch(clearBoard());
    }
    let gosper=()=>{
      clear();
      dispatch(gosperGlider());
      start();
    }
    let gosperButton=()=>{
      let e=undefined;
      if(state.col>36){
        e=(<li className="game__toggle" onClick={gosper}>Gosper Glider</li>);
      }
      return e;
    }
    return(
      <div className="game__control">
        <ul className="control__list">
          <li className="game__toggle" onClick={toggleGame}>{status}</li>
          <li className="game__toggle" onClick={randomCells}>Random</li>
          <li className="game__toggle" onClick={clear}>Clear</li>
          {gosperButton()}
        </ul>
      </div>
    )

}

const mapStateToProps= (state) => {
  return {
    state
  }
}

GameControl=connect(mapStateToProps)(GameControl);

export default GameControl;
