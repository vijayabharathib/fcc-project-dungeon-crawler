import React from 'react';
import Tile from './Tile';
import {connect} from 'react-redux';
import '../../styles/css/GameBoard.css';

let Maze =({state,control,dispatch})=> {

    let maze=state.maze.map((rows,r)=>{
      let lineOfTiles=rows.map((tile,c)=> {
        return (
          <Tile key={r+""+c} type={tile.type}/>
        );
      });

      return (<tr className="row" key={r}>
        {lineOfTiles}
      </tr>);
    });

    return(
      <div className="c-app__container">
          <table className="frame">
            <tbody className="c-game__board">
                {maze}
            </tbody>
          </table>
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

Maze=connect(mapStateToProps)(Maze);

export default Maze;
