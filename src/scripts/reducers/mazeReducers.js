
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
  let playerPosition={x: 12, y: 5};
  maze[5][15]={type: 'GUARD'};
  return {
    maze,
    playerPosition
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
    [40,0,40,49],
    [40,24,49,24],
    [27,12,40,12],
    [27,37,40,37]
  ];
  let open=0;
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
    if(state.maze[newPosition.x][newPosition.y].type==='SPACE'){
      state.maze[newPosition.x][newPosition.y].type='PLAYER';
      state.maze[x][y].type='SPACE';
      state.playerPosition.x=newPosition.x;
      state.playerPosition.y=newPosition.y;
    }
  }
  return state;
}

const mazeReducer=(state={},action)=>{
  let newState=Object.assign({},{
    maze: state.maze,
    playerPosition: state.playerPosition
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
