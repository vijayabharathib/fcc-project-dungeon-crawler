import React from 'react';
import Cell from './Cell';
import {connect} from 'react-redux';
import '../../styles/css/GameBoard.css';
import {toggleCell} from '../actions/ActionCreators';

let GameBoard =({state,control,dispatch})=> {

    let board=state.cells.map((rows,r)=>{
      let lineOfCells=rows.map((cell,c)=> {
        let activate=()=>{
          dispatch(toggleCell(r,c));
        };
        return (
          <Cell key={`${r}${c}`} onClick={activate} cellRow={r} cellCol={c} alive={(cell===0 ? false : true)} />
        );
      });

      return (<li key={r}><ul className="row" key={r}>
        {lineOfCells}
      </ul></li>);
    });

    return(
      <div className="c-app__container">
          <div className="frame">
            <ul className="c-game__board">
                {board}
                <li className="game__generation"> {`Generations: ${state.generation}`}</li>
            </ul>
          </div>
        {control}
      </div>
    )

}

const mapStateToProps= (state,ownProps) => {
  return {
    state,
    control: ownProps.children
  }
}

GameBoard=connect(mapStateToProps)(GameBoard);

export default GameBoard;
