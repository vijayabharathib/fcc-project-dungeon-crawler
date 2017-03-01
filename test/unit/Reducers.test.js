import test from 'tape';
import {
  createBoard,
  clearBoard,
  randomizeBoard,
  nextGeneration
  } from '../../src/scripts/actions/ActionCreators';
import reducer from '../../src/scripts/reducers/Reducers';
test("UT - reducers - createBoard",(t)=>{
  t.plan(1);
  const board=reducer({},createBoard(3,3));
  const actual=board.cells.length;
  const expected=3;
  const message="Reducer should return a new board with cells on createBoard ";
  t.equal(actual,expected,message);
});

test("UT - reducers - randomizeBoard",(t)=>{
  t.plan(1);
  const board=reducer({},createBoard(3,3));
  const actual=reducer(board,randomizeBoard());
  const message="Reducer should randomize cells";
  t.notDeepEqual(actual,board,message);
});

test("UT - reducers - clearBoard",(t)=>{
  t.plan(1);
  const board=reducer({},createBoard(3,3));
  const actual=reducer(board,clearBoard());
  const message="Reducer should clear cells";
  const sum=actual.cells.reduce((a,b)=> a.concat(b),[]).reduce((a,b)=>(a+b),0);
  t.equal(sum,0,message);
});

test("UT - reducers - nextGen - game of life rules",(t)=>{
  t.plan(8);
  const board=reducer({},createBoard(3,3));
  board.cells=[
    [1,1,0],
    [0,0,0],
    [1,0,0]
  ];
  let nextBoard=reducer(board,nextGeneration());
  let dead=0;
  let alive=1;
  t.equal(nextBoard.cells[0][0],dead,"live cell with just one neighbour dies");
  t.equal(nextBoard.cells[2][0],dead,"live cell with no neighbour dies");
  t.equal(nextBoard.cells[1][1],alive,"dead cell with exactly three neighbours springs to life");
  board.cells=[
    [1,1,1],
    [1,1,0],
    [0,0,1]
  ];
  nextBoard=reducer(board,nextGeneration());
  t.equal(nextBoard.cells[0][0],alive,"live cell with just two neighbours lives on");
  t.equal(nextBoard.cells[0][2],alive,"live cell with just three neighbours lives on");
  t.equal(nextBoard.cells[0][1],dead,"live cell with more than three(4) neighbours dies");
  t.equal(nextBoard.cells[1][1],dead,"live cell with more than three(5) neighbours dies");
  //negative tests
  t.equal(nextBoard.cells[2][0],dead,"dead cell with two neighbours stays dead");
});

test("UT - reducers - randomizeBoard",(t)=>{
  t.plan(1);
  const board=reducer({},createBoard(3,3));
  const newBoard=reducer(board,randomizeBoard());
  t.notDeepEqual(newBoard,board,"randomizeBoard should shuffle live cells");

});
