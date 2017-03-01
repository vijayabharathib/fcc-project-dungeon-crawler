import test from 'tape';
import {
  createBoard,
  clearBoard,
  randomizeBoard,
  nextGeneration
  } from '../../src/scripts/actions/ActionCreators';
test ("UT - action creators - createBoard",(t)=>{
    t.plan(1);
    let actual=createBoard(20,20);
    let expected={
      row: 20,
      col: 20,
      type: 'CREATE_BOARD'
    };
    let message="Create Board should have type, row & col";
    t.deepEqual(actual,expected,message);

});

test ("UT - action creators - clearBoard",(t)=>{
  t.plan(1);
  let actual=clearBoard();
  let expected={
    type: 'CLEAR_BOARD'
  };
  let message="Clear Board should have type";
  t.deepEqual(actual,expected,message);

});

test ("UT - action creators - randomizeBoard",(t)=>{
  t.plan(1);
  let actual=randomizeBoard();
  let expected={
    type: 'RANDOMIZE_BOARD'
  };
  let message="Randomize Board should have type";
  t.deepEqual(actual,expected,message);

});

test ("UT - action creators - nextGeneration",(t)=>{
  t.plan(1);
  let actual=nextGeneration();
  let expected={
    type: 'NEXT_GENERATION'
  };
  let message="Next Generation Board should have type";
  t.deepEqual(actual,expected,message);

});
