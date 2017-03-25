import {game,weapons} from './DungeonData';

export const createNewMaze=(state)=>{
  let maze=[];
  let dungeon=1;
  maze=setupEnvironment(dungeon);
  let player=_setupPlayer();
  maze[12][45]={type: 'PLAYER'};
  return {
    maze,
    player,
    dungeon
  };
}

const _setupPlayer = () => {
  return ({
    position: {x: 12, y: 45},
    health: 60,
    weapon: weapons.NONE,
    level: 1,
    xp: 40
  });
}

export const setupEnvironment = (dungeon) => {
  let newMaze=_createBoundary();
  newMaze=_createRooms(newMaze,dungeon);
  newMaze=_distributeFood(newMaze,dungeon);
  newMaze=_positionGuards(newMaze,dungeon);
  newMaze=_openDoor(newMaze,dungeon);
  newMaze=_placeWeapon(newMaze,dungeon);
  return newMaze;
}

const _createBoundary = () => {
  let maze=[];
  for(let row=0;row<50;row++){
    maze.push(createRows(row));
  }
  return maze;
}

const createRows=(row)=>{
  let rows=[];
  for(let col=0;col<50;col++){
    if(isBoundary(row,col))
      rows.push({type: 'WALL'})
    else
      rows.push({type: 'SPACE'});
  }
  return rows;
}

const isBoundary=(row,col)=>{
  return (row===0 || col===0 || row===49 || col===49);
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

const _distributeFood = (maze,dungeon) => {
  let food=game.food[dungeon-1];
  food.forEach((pie)=>{
    maze[pie[0]][pie[1]]={type: 'FOOD'};
  });
  return maze;
}

const _positionGuards = (maze,dungeon) => {
  let guards = game.guards[dungeon-1];
  guards.forEach((guard)=>{
    maze[guard[0]][guard[1]]={type: 'GUARD',health: 30,weapon: weapons.HAMMER};
  });
  return maze;
}

const _openDoor = (maze,dungeon) => {
  if(game.door[dungeon-1].length!==0){
    let x=game.door[dungeon-1][0];
    let y=game.door[dungeon-1][1];
    maze[x][y]={type: 'DOOR'};
  }
  return maze;
}

const _placeWeapon = (maze,dungeon) => {
  maze[29][40]={type: 'WEAPON',weapon: game.weapon[dungeon-1] };
  return maze;
}
