import {setupEnvironment} from './mazeReducers';

export const movePlayer = (state,direction) => {
  let nextTile=_fetchNextTile(state,direction);
  state=_advanceToNextPosition(state,nextTile);
  state=_processNextPosition(state,nextTile);
  return state;
}
  const _fetchNextTile=(state,direction)=>{
    let position=_findNextPosition(state.player.position,direction);
    let next=Object.assign({},state.maze[position.x][position.y]);
    next.position=position;
    return next;
  }
    const _findNextPosition=(position,direction) =>{
      let x,y;
      switch (direction) {
        case "ArrowLeft":
        x=position.x;
        y=position.y-1;
        break;
        case "ArrowRight":
        x=position.x;
        y=position.y+1;
        break;
        case "ArrowDown":
        x=position.x+1;
        y=position.y;
        break;
        case "ArrowUp":
        x=position.x-1;
        y=position.y;
        break;
        default:
        break;
      }
      return {x,y};
    }
  const _advanceToNextPosition=(state,next)=>{
    let x=state.player.position.x;
    let y=state.player.position.y;
    if(_isNextMoveAvailable(next)){
      state.maze[next.position.x][next.position.y].type='PLAYER';
      state.maze[x][y].type='SPACE';
      state.player.position.x=next.position.x;
      state.player.position.y=next.position.y;
    }
    return state;
  }
    const _isNextMoveAvailable=(next)=>{
      return (next.type==='SPACE' ||
      next.type==='FOOD' ||
      next.type==='WEAPON' ||
      (next.type==='GUARD' && next.health<=0));
    }
  const _processNextPosition=(state,next)=>{
    switch(next.type){
      case 'FOOD':
        state.player.health+=20;
        break;
      case 'WEAPON':
        state.player.weapon=next.weapon;
        break;
      case 'GUARD':
        state=_fight(state,next);
        break;
      case 'DOOR':
        state.maze=setupEnvironment(3);
        break;
      default:
        break;
    }
    return state;
  }

    const _fight=(state,guard) => {
      if(isGuardAlive(guard)){
        state.player.health-=guard.weapon.force;
        guard.health-=state.player.weapon.force;
        state.maze[guard.position.x][guard.position.y]=guard;
      } else {
        state.player.xp-=10;
        if (state.player.xp<=0) state.player.level+=1;
      }
      return state;
    }

      const isGuardAlive=(guard)=>{
        return (guard.health>0);
      }
