import test from 'tape';
import {
  createMaze
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
  let expected=76; //In a 20x20 map, 76 will be outer wall 20+20+18+18
  t.equals(actual,expected,"mazeReducer should create 20x20 map on createMaze");
});
