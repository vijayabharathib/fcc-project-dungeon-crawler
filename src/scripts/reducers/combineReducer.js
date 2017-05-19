import {createNewMaze,lightupMaze} from './mazeReducers';
import {movePlayer} from './playerReducers';

const reducer=(state={},action)=>{
  let newState=_cloneState(state);
  switch (action.type) {
    case 'CREATE_MAZE':
      return createNewMaze(newState);
    case 'MOVE_PLAYER':
      return movePlayer(newState,action.key);
    case 'TOGGLE_LIGHT':
      return lightupMaze(newState);
    default:
      return newState;
  }
}

const _cloneState=(state) =>{
  return Object.assign({},{
    maze: state.maze,
    player: state.player,
    dungeon: state.dungeon,
    result: state.result,
    light: state.light
  });
}

export default reducer;
