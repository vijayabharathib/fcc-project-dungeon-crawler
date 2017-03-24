import {game} from './DungeonData';

export const weapons={
  'HAMMER': {name: 'Hammer',force: 10},
  'SPEAR': {name: 'Spear',force: 20},
  'SWORD': {name: 'Sword',force: 30}
}
//
// export const game={
//   environment: [
//     [
//       [0,15,27,15],
//       [16,0,16,15],
//       [0,33,27,33],
//       [10,15,10,33],
//       [17,33,17,49],
//       [27,0,27,49],
//       [40,0,40,35],
//       [40,35,40,49],
//       [40,24,49,24],
//       [27,12,40,12],
//       [27,37,40,37]
//     ],
//     [
//       [0,5,17,15],
//       [16,0,16,5],
//       [0,33,17,33],
//       [10,15,10,33],
//       [17,33,17,49],
//       [27,0,27,49],
//       [40,0,40,35],
//       [40,35,40,49],
//       [40,24,49,24],
//       [27,12,40,12],
//       [27,37,40,37]
//     ],
//     []
//   ],
//   food:
//   [
//     [
//       [7,9],
//       [3,23],
//       [13,43],
//       [22,6],
//       [18,26],
//       [23,40],
//       [29,44],
//       [29,30],
//       [33,4],
//       [46,7],
//       [48,43]
//     ],
//     [
//       [7,3],
//       [3,23],
//       [13,43],
//       [22,6],
//       [18,26],
//       [23,40],
//       [29,44],
//       [29,30],
//       [33,4],
//       [46,7],
//       [48,43]
//     ]
//   ]
//
// };

export const createNewMaze=(state)=>{
  let maze=[];
  let dungeon=1;
  maze=setupEnvironment(dungeon);
  let player=_setupPlayer();
  maze[12][5]={type: 'PLAYER'};
  return {
    maze,
    player
  };
}

const _setupPlayer = () => {
  return ({
    position: {x: 12, y: 5},
    health: 60,
    weapon: weapons.HAMMER,
    level: 1,
    xp: 60
  });
}

export const setupEnvironment = (dungeon) => {
  let newMaze=_createBoundary();
  newMaze=_createRooms(newMaze,dungeon);
  newMaze=_distributeFood(newMaze,dungeon);
  newMaze=_positionGuards(newMaze,dungeon);
  newMaze=_openDoor(newMaze);
  newMaze=_placeWeapon(newMaze);
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

const _openDoor = (maze) => {
  maze[2][47]={type: 'DOOR'};
  return maze;
}

const _placeWeapon = (maze) => {
  maze[29][40]={type: 'WEAPON',weapon: weapons.SPEAR };
  return maze;
}
