let weapons={
'SPEAR': {name: 'Spear',force: 20},
'SWORD': {name: 'Sword',force: 30},
'HAMMER': {name: 'Hammer',force: 10}
}

const _createNewMaze=(state)=>{
  let maze=[];
  for(let i=0;i<50;i++){
    let rows=[];
    for(let j=0;j<50;j++){
      if(i===0 || j===0 || i===49 || j===49)
        rows.push({type: 'WALL'})
      else
        rows.push({type: 'SPACE'});
    }
    maze.push(rows);
    rows=undefined;
  }
  maze=_createRooms(maze);
  maze[12][5]={type: 'PLAYER'};
  let player={
    position: {x: 12, y: 5},
    health: 60,
    weapon: weapons.HAMMER,
    level: 1,
    xp: 60
  }
  let playerPosition={x: 12, y: 5};
  let playerWeapon
  return {
    maze,
    playerPosition,
    player
  };
}

const _createRooms = (maze) => {
  let path=[
    [0,15,27,15],
    [16,0,16,15],
    [0,33,27,33],
    [10,15,10,33],
    [17,33,17,49],
    [27,0,27,49],
    [40,0,40,35],
    [40,35,40,49],
    [40,24,49,24],
    [27,12,40,12],
    [27,37,40,37]
  ];
  path.forEach((line)=>{
    let door
    for(let a=line[0];a<=line[2];a++){
      for(let b=line[1];b<=line[3];b++){
        maze[a][b]={type:'WALL'};
      }
    }
    if(line[0]===line[2]){
      door=(Math.floor((line[3]-line[1])/2)+line[1]);
      maze[line[0]][door]={type: 'SPACE'}
    } else {
      door=(Math.floor((line[2]-line[0])/2)+line[0]);
      maze[door][line[1]]={type: 'SPACE'}
    }
  });
  maze[29][40]={type: 'WEAPON',weapon: weapons.SPEAR }
  let food=[
    [7,9],
    [3,23],
    [13,43],
    [22,6],
    [18,26],
    [23,40],
    [29,44],
    [29,30],
    [33,4],
    [46,7],
    [48,43]
  ];
  food.forEach((pie)=>{
    maze[pie[0]][pie[1]]={type: 'FOOD'};
  });
  let guards = [
    [5,13],
    [43,13],
    [26,18],
    [44,29],
    [30,29]
  ];
  guards.forEach((guard)=>{
    maze[guard[0]][guard[1]]={type: 'GUARD',health: 60};
  });
  maze[2][47]={type: 'DOOR'};
  return maze;
}

const _movePlayer = (state,key) => {
  let x=state.playerPosition.x;
  let y=state.playerPosition.y;
  let newPosition={x:-1,y:-1}
  switch (key) {
    case "ArrowLeft":
      newPosition.x=x;
      newPosition.y=y-1;
      break;
    case "ArrowRight":
      newPosition.x=x;
      newPosition.y=y+1;
      break;
    case "ArrowDown":
      newPosition.x=x+1;
      newPosition.y=y;
      break;
    case "ArrowUp":
      newPosition.x=x-1;
      newPosition.y=y;
      break;
    default:
      break;
  }
  if(newPosition.x>0 && newPosition.y>0 && newPosition.x<50 && newPosition.y<50){
    let next=state.maze[newPosition.x][newPosition.y];
    let nextType=next.type;
    if(nextType==='SPACE' ||
      nextType==='FOOD' ||
      nextType==='WEAPON' ||
      (nextType==='GUARD' && next.health<=0)
      ){
      state.maze[newPosition.x][newPosition.y].type='PLAYER';
      state.maze[x][y].type='SPACE';
      state.playerPosition.x=newPosition.x;
      state.playerPosition.y=newPosition.y;
    }

    switch(nextType){
      case 'FOOD':
        state.player.health+=20;
        break;
      case 'WEAPON':
        state.player.weapon=next.weapon;
        break;
      case 'GUARD':
        if(next.health>0){          
          state.player.health-=20;
          next.health-=20;
        }
        break;
      default:
        break;
    }

  }
  return state;
}

const mazeReducer=(state={},action)=>{
  let newState=Object.assign({},{
    maze: state.maze,
    playerPosition: state.playerPosition,
    player: state.player
  });
  switch (action.type) {
    case 'CREATE_MAZE':
      return _createNewMaze(newState);
    case 'MOVE_PLAYER':
      return _movePlayer(newState,action.key);
    default:
      return newState;
  }
}

export default mazeReducer;
