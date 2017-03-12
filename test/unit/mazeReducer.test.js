import test from 'tape';
import {
  createMaze,
  movePlayer
} from '../../src/scripts/actions/mazeActions';
import mazeReducer from '../../src/scripts/reducers/mazeReducers';
import {weapons} from '../../src/scripts/reducers/mazeReducers';


test("UT - mazeReducer - move Player right", (t)=>{
  t.plan(1);
  let state=mazeReducer({},createMaze());
  //to move player left and right -column need to be adjusted
  let expectedPosition={x: state.player.position.x, y: state.player.position.y+1};
  let newState=mazeReducer(state,movePlayer("ArrowRight"));
  let actualPosition=newState.player.position;
  t.deepEquals(actualPosition,expectedPosition,"ArrowRight should move player right by 1 tile");
});

test("UT - mazeReducer - move Player left", (t)=>{
  t.plan(1);
  let state=mazeReducer({},createMaze());
  //to move player left and right -column need to be adjusted
  let expectedPosition={x: state.player.position.x, y: state.player.position.y-1};
  let newState=mazeReducer(state,movePlayer("ArrowLeft"));
  let actualPosition=newState.player.position;
  t.deepEquals(actualPosition,expectedPosition,"ArrowLeft should move player left by 1 tile");
});

test("UT - mazeReducer - move Player down", (t)=>{
  t.plan(1);
  let state=mazeReducer({},createMaze());
  let expectedPosition={x: state.player.position.x+1, y: state.player.position.y};
  let newState=mazeReducer(state,movePlayer("ArrowDown"));
  let actualPosition=newState.player.position;
  t.deepEquals(actualPosition,expectedPosition,"ArrowDown should move player down by 1 tile");
});

test("UT - mazeReducer - move Player up", (t)=>{
  t.plan(1);
  let state=mazeReducer({},createMaze());
  let expectedPosition={x: state.player.position.x-1, y: state.player.position.y};
  let newState=mazeReducer(state,movePlayer("ArrowUp"));
  let actualPosition=newState.player.position;
  t.deepEquals(actualPosition,expectedPosition,"ArrowUp should move player up by 1 tile");
});

test("UT - mazeReducer - food increses health", (t)=>{
  t.plan(1);
  let state=mazeReducer({},createMaze());
  let x=state.player.position.x;
  let y=state.player.position.y;
  state.maze[x+1][y]={type: 'FOOD'}; //set a food below player

  let expectedHealth=state.player.health+20;
  let newState=mazeReducer(state,movePlayer("ArrowDown")); //move player down to pick up food
  let actualHealth=newState.player.health;
  t.deepEquals(actualHealth,expectedHealth,"Food should increse player health");
});

test("UT - mazeReducer - player picks up weapons on the way", (t)=>{
  t.plan(1);
  let state=mazeReducer({},createMaze());
  let x=state.player.position.x;
  let y=state.player.position.y;
  state.player.weapon=weapons.HAMMER;
  state.maze[x+1][y]={type: 'WEAPON', weapon: weapons.SPEAR}; //set a weapon below player
  let newState=mazeReducer(state,movePlayer("ArrowDown")); //move player down to pick up weapon
  let expectedWeapon=weapons.SPEAR;
  let actualWeapon=newState.player.weapon;
  t.deepEquals(actualWeapon,expectedWeapon,"Player should pick up weapon on the way");
});

test("UT - mazeReducer - fight the guard until one is defeated", (t)=>{
  t.plan(3);
  let state=mazeReducer({},createMaze());
  let x=state.player.position.x;
  let y=state.player.position.y;
  state.player.weapon=weapons.HAMMER;
  state.maze[x+1][y]={type: 'GUARD', health: 60}; //set a guard below player
  let previousPlayerHealthLevel=state.player.health;
  let previousGuardHealthLevel=state.maze[x+1][y].health;

  let newState=mazeReducer(state,movePlayer("ArrowDown")); //move player down to pick up a fight
  let newPlayerHealthLevel=newState.player.health;
  let newGuardHealthLevel=state.maze[x+1][y].health;

  let expected=true;
  let actual=previousPlayerHealthLevel>newPlayerHealthLevel; //player health must have come down
  t.equal(actual,expected,"Player health must have come down after fight");
  expected=true;
  actual=previousGuardHealthLevel>newGuardHealthLevel;
  t.equal(actual,expected,"Guard health must have come down after a fight");

  newState.maze[x+1][y]={type: 'GUARD', health: 0};
  newState=mazeReducer(newState,movePlayer("ArrowDown")); //move player down to pick up a fight
  actual=newState.maze[x+1][y].type;
  expected='PLAYER';
  t.equal(actual,expected,"Player should take guard's place after his defeat");
});
