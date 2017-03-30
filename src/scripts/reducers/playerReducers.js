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
      let x=position.x;
      let y=position.y;
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
        state.dungeon+=1;
        state.maze=setupEnvironment(state.dungeon);
        state=_positionPlayer(state);
        break;
      default:
        break;
    }
    return state;
  }

    const _positionPlayer = (state) => {
      let x=12;
      let y=45;
      state.maze[x][y]={type: 'PLAYER'};
      state.player.position.x=x;
      state.player.position.y=y;
      return state;
    }

    const _fight=(state,guard) => {
      let player=state.player;
      if(isAlive(guard)){
        player.health-=(guard.weapon.force * (1+(player.level/2)));
        guard.health-=(player.weapon.force * (1+(player.level/2)));
        state.maze[guard.position.x][guard.position.y]=guard;
      } else {
        player.xp-=(10*(1+(player.level/2)));
        if (player.xp<=0) {
          player.level+=1;
          player.xp=player.level*25;
        }
      }
      if(!isAlive(player)){
        state.result="Lost";
        player.health=0;
      }
      return state;
    }

      const isAlive=(samurai)=>{
        return (samurai.health>0);
      }
