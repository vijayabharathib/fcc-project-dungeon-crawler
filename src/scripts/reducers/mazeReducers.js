
const _createNewMaze=(state)=>{
  let maze=[];
  for(let i=0;i<50;i++){
    let rows=[];
    for(let j=0;j<50;j++){
      if(i==0 || j==0 || i==49 || j==49)
        rows.push({type: 'WALL'})
      else
        rows.push({type: 'SPACE'});
    }
    maze.push(rows);
    rows=undefined;
  }

  return {
    maze
  };
}

const mazeReducer=(state={},action)=>{
  let newState=Object.assign({},{
    maze: state.maze
  });
  switch (action.type) {
    case 'CREATE_MAZE':
      return _createNewMaze(newState);
    default:
      return newState;
  }
}

export default mazeReducer;
