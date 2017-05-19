import React from 'react';
import Tile from './Tile';
import GameResult from './GameResult';
import PlayerStatus from './Player';
import Legend from './Legend';
import {connect} from 'react-redux';
import {createMaze,toggleLight} from '../actions/mazeActions';
import '../../styles/css/GameBoard.css';

let Maze =({state,control,dispatch})=> {

    let maze=state.maze.map((rows,r)=>{
      let lineOfTiles=rows.map((tile,c)=> {
        return (
          <Tile key={r+""+c} type={tile.type} light={tile.light} />
        );
      });

      return (<tr className="row" key={r}>
        {lineOfTiles}
      </tr>);
    });
    let restart=()=>{
      dispatch(createMaze());
    }
    let shedLight=()=>{
      dispatch(toggleLight());
    }
    return(
      <div className="c-app__container">
        <GameResult result={state.result} onClick={restart} />
        <PlayerStatus player={state.player} result={state.result} toggleLight={shedLight}/>
        {control}
        <table className={"frame " + state.result}>
          <tbody className={"c-game__board " + state.light} >
              {maze}
          </tbody>
        </table>
        <Legend />
      </div>
    )

}

const mapStateToProps= (state,ownProps) => {
  return {
    state,
    control: ownProps.children
  }
}

Maze=connect(mapStateToProps)(Maze);

export default Maze;
