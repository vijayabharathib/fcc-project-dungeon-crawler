export const weapons={
  'HAMMER': {name: 'Hammer',force: 10},
  'SPEAR': {name: 'Spear',force: 20},
  'SWORD': {name: 'Sword',force: 30}
}
export const game={
  environment: [
    [
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
    ],
    [
      [0,5,17,15],
      [16,0,16,5],
      [0,33,17,33],
      [10,15,10,33],
      [17,33,17,49],
      [27,0,27,49],
      [40,0,40,35],
      [40,35,40,49],
      [40,24,49,24],
      [27,12,40,12],
      [27,37,40,37]
    ],
    []
  ]
};

const _setupPlayer = () => {
  return ({
    position: {x: 12, y: 5},
    health: 60,
    weapon: weapons.HAMMER,
    level: 1,
    xp: 60
  });
}

const _createNewMaze=(state)=>{
  let maze=[];
  let dungeon=1;
  maze=_setupEnvironment(dungeon);
  let player=_setupPlayer();
  maze[12][5]={type: 'PLAYER'};
  return {
    maze,
    player
  };
}

const _createBoundary = () => {
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
  return maze;
}

const _createRooms = (maze,dungeon) => {
  let path=game.environment[dungeon-1];
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
  return maze;
}

const _distributeFood = (maze) => {
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
  return maze;
}

const _positionGuards = (maze) => {
  let guards = [
    [5,13],
    [43,13],
    [26,18],
    [44,29],
    [30,29]
  ];
  guards.forEach((guard)=>{
    maze[guard[0]][guard[1]]={type: 'GUARD',health: 30,weapon: weapons.HAMMER};
  });
  return maze;
}

const _openDoor = (maze) => {
  maze[2][47]={type: 'DOOR'};
  return maze;
}

const _placeWeapon = (maze) => {
  maze[29][40]={type: 'WEAPON',weapon: weapons.SPEAR };
  return maze;
}

const _findNewPosition=(position,key) =>{
  let x,y;
  switch (key) {
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

const _movePlayer = (state,key) => {
  let x=state.player.position.x;
  let y=state.player.position.y;
  // let newPosition={x:-1,y:-1};
  let newPosition=_findNewPosition(state.player.position,key);
  if(newPosition.x>0 && newPosition.y>0 && newPosition.x<50 && newPosition.y<50){
    let next=state.maze[newPosition.x][newPosition.y];
    let player=state.player;
    let nextType=next.type;
    if(nextType==='SPACE' ||
      nextType==='FOOD' ||
      nextType==='WEAPON' ||
      (nextType==='GUARD' && next.health<=0)
      ){
      state.maze[newPosition.x][newPosition.y].type='PLAYER';
      state.maze[x][y].type='SPACE';
      player.position.x=newPosition.x;
      player.position.y=newPosition.y;
    }

    switch(nextType){
      case 'FOOD':
        player.health+=20;
        break;
      case 'WEAPON':
        player.weapon=next.weapon;
        break;
      case 'GUARD':
        if(next.health>0){
          player.health-=next.weapon.force;
          next.health-=player.weapon.force;
        } else {
          player.xp-=10;
          if (player.xp<=0) player.level+=1;
        }
        break;
      case 'DOOR':
        console.log("we're at the door");
        state.maze=_setupEnvironment(2);
        console.log(state);
        break;
      default:
        break;
    }

  }
  return state;
}

const _setupEnvironment = (dungeon) => {
  let newMaze=_createBoundary();
  newMaze=_createRooms(newMaze,dungeon);
  newMaze=_distributeFood(newMaze);
  newMaze=_positionGuards(newMaze);
  newMaze=_openDoor(newMaze);
  newMaze=_placeWeapon(newMaze);
  return newMaze;
}

const mazeReducer=(state={},action)=>{
  let newState=Object.assign({},{
    maze: state.maze,
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
