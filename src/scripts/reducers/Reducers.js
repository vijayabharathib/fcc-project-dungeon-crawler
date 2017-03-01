
const _createNewBoard=(state,row,col)=>{
  const cells=[];
  for(let i=0;i<row;i++){
    let rows=[];
    for(let j=0;j<col;j++){
      rows.push(1); //1 means the cell is alive
    }
    cells.push(rows);
    rows=undefined;
  }

  return {
    row,
    col,
    cells,
    generation: 0,
    playing: false,
  };
}

const _randomizeBoard=(state)=>{
  state.cells= state.cells.map((rows)=>{
    return rows.map(()=>{
      return Math.floor(Math.random()*10)%2;
    });
});
  state.generation=0;
  return state;
}

const _clearBoard=(state)=>{
  state.cells= state.cells.map((rows)=>{return rows.map((v)=>{return 0})});
  state.generation=0;
  return state;

}

const _findLiveNeighbours=(state,r,c)=>{
  let liveNeibours=0;
  let rowLimit=r+1;
  let colLimit=c+1;
  for(let x=r-1;x<=rowLimit;x++){
    for(let j=c-1;j<=colLimit;j++){
      if(x>=0 && j>=0 && x<state.row && j<state.col && !(x===r && j===c)){
        //console.log(`${r}${c} - ${x}${j}`);
        liveNeibours+=state.cells[x][j];
      }
    }
  }
  return liveNeibours;
}
const _nextGeneration=(state)=>{
  let newCells=[];
  let cells=state.cells;
  let dead=0;
  let alive=1;
  for(let i=0;i<state.row;i++){
    let row=[];
    for(let j=0;j<state.col;j++){
      row.push(cells[i][j]);
      let eco=_findLiveNeighbours(state,i,j);
      if(cells[i][j]===alive){
        if(eco < 2){
          row[j]=dead;
        }else if(eco>3){
          row[j]=dead;
        }
        //else
          //stay alive
      }else if(cells[i][j]===dead){
        if(eco===3){
          row[j]=alive;
        }
        //else
          //stay dead
      }

    }
    newCells.push(row);
    row=[];
  }
  state.cells=newCells;
  state.generation+=1;
  return state;
}

const _startGame=(state,intervalID)=>{
  state.playing=true;
  state.intervalID=intervalID;
  return state;
}

const _stopGame=(state) => {
  state.playing=false;
  clearInterval(state.intervalID);
  return state;
}
const _toggleCell=(state,row,col)=>{
  let newStatus=(state.cells[row][col]===1 ? 0 : 1);
  state.cells[row][col]=newStatus;
  let newCells=state.cells.map((row)=>{
    return row.map((cell)=>{
      return (cell===1?1:0); //DONT TOGGLE. JUST RETURN THE SAME
    });
  });
  state.cells=newCells;
  return state;
}
const _gosperGlider = (state)=>{
  state.generation=0;
  let newCells=state.cells;
  newCells[1][25]=1;
  newCells[2][23]=1;
  newCells[2][25]=1;
  newCells[3][13]=1;
  newCells[3][14]=1;
  newCells[3][21]=1;
  newCells[3][22]=1;
  newCells[3][35]=1;
  newCells[3][36]=1;
  newCells[4][12]=1;
  newCells[4][16]=1;
  newCells[4][21]=1;
  newCells[4][22]=1;
  newCells[4][35]=1;
  newCells[4][36]=1;
  newCells[5][1]=1;
  newCells[5][2]=1;
  newCells[5][11]=1;
  newCells[5][17]=1;
  newCells[5][21]=1;
  newCells[5][22]=1;
  newCells[6][1]=1;
  newCells[6][2]=1;
  newCells[6][11]=1;
  newCells[6][15]=1;
  newCells[6][17]=1;
  newCells[6][18]=1;
  newCells[6][23]=1;
  newCells[6][25]=1;
  newCells[7][11]=1;
  newCells[7][17]=1;
  newCells[7][25]=1;
  newCells[8][12]=1;
  newCells[8][16]=1;
  newCells[9][13]=1;
  newCells[9][14]=1;
  return state;
}
const reducer=(state={},action)=>{
  let newState=Object.assign({},{
    cells: state.cells,
    row: state.row,
    col: state.col,
    generation: state.generation,
    playing: state.playing,
    intervalID: state.intervalID});
  switch (action.type) {
    case 'CREATE_BOARD':
      return _createNewBoard(newState,action.row,action.col);
    case 'CLEAR_BOARD':
      return _clearBoard(newState);
    case 'RANDOMIZE_BOARD':
      return _randomizeBoard(newState);
    case 'NEXT_GENERATION':
      return _nextGeneration(newState);
    case 'START_GAME':
        return _startGame(newState,action.intervalID);
    case 'STOP_GAME':
        return _stopGame(newState);
    case 'TOGGLE_CELL':
        return _toggleCell(newState,action.row,action.col);
    case 'GOSPER_GLIDER':
        return _gosperGlider(newState);
    default:
      return newState;
  }
}

export default reducer;
