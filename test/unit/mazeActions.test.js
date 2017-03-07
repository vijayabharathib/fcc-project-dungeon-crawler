import test from 'tape';
import {
  createMaze
} from '../../src/scripts/actions/mazeActions';
test("UT - mazeActions - createMaze",(t)=>{
  t.plan(1);
  const actual=createMaze();
  const expected={type: 'CREATE_MAZE'};
  t.deepEqual(actual,expected,"createMaze action should return type CREATE_MAZE");
});
