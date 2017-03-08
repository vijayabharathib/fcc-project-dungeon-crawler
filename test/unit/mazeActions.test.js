import test from 'tape';
import {
  createMaze,
  movePlayer
} from '../../src/scripts/actions/mazeActions';
test("UT - mazeActions - createMaze",(t)=>{
  t.plan(1);
  const actual=createMaze();
  const expected={type: 'CREATE_MAZE'};
  t.deepEqual(actual,expected,"createMaze action should return type CREATE_MAZE");
});

test("UT - mazeActions - movePlayer",(t)=>{
  t.plan(1);
  const actual=movePlayer("ArrowDown");
  const expected={type: 'MOVE_PLAYER',key:'ArrowDown'};
  t.deepEqual(actual,expected,"movePlayer should return MOVE_PLAYER with key");
});
