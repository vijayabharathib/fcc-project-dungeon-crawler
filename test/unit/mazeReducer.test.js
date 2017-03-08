import test from 'tape';
import {
  createMaze,
  movePlayer
} from '../../src/scripts/actions/mazeActions';
import mazeReducer from '../../src/scripts/reducers/mazeReducers';

test("UT - mazeReducer - createMaze should return walls and space", (t)=>{
  t.plan(1);
  const state=mazeReducer({},createMaze());
  let actual=state.maze.reduce((totalWall,row)=>{
    return totalWall+row.reduce((total,block)=>{
      return total+(block.type==='WALL' ? 1 : 0);
    },0);
  },0);
  let expected=196; //In a 50x50 map, 196 will be outer wall 50+50+48+48
  t.equals(actual,expected,"mazeReducer should create 20x20 map on createMaze");
});

test("UT - mazeReducer - move Player right", (t)=>{
  t.plan(1);
  let state=mazeReducer({},createMaze());
  //to move player left and right -column need to be adjusted
  let expectedPosition={x: state.playerPosition.x, y: state.playerPosition.y+1};
  let newState=mazeReducer(state,movePlayer("ArrowRight"));
  let actualPosition=newState.playerPosition;
  t.deepEquals(actualPosition,expectedPosition,"ArrowRight should move player right by 1 tile");
});

test("UT - mazeReducer - move Player left", (t)=>{
  t.plan(1);
  let state=mazeReducer({},createMaze());
  //to move player left and right -column need to be adjusted
  let expectedPosition={x: state.playerPosition.x, y: state.playerPosition.y-1};
  let newState=mazeReducer(state,movePlayer("ArrowLeft"));
  let actualPosition=newState.playerPosition;
  t.deepEquals(actualPosition,expectedPosition,"ArrowLeft should move player left by 1 tile");
});

test("UT - mazeReducer - move Player down", (t)=>{
  t.plan(1);
  let state=mazeReducer({},createMaze());
  let expectedPosition={x: state.playerPosition.x+1, y: state.playerPosition.y};
  let newState=mazeReducer(state,movePlayer("ArrowDown"));
  let actualPosition=newState.playerPosition;
  t.deepEquals(actualPosition,expectedPosition,"ArrowDown should move player down by 1 tile");
});

test("UT - mazeReducer - move Player up", (t)=>{
  t.plan(1);
  let state=mazeReducer({},createMaze());
  let expectedPosition={x: state.playerPosition.x-1, y: state.playerPosition.y};
  let newState=mazeReducer(state,movePlayer("ArrowUp"));
  let actualPosition=newState.playerPosition;
  t.deepEquals(actualPosition,expectedPosition,"ArrowUp should move player up by 1 tile");
});
