
const _createNewMap=(state)=>{
  let map=[];
  for(let i=0;i<20;i++){
    let rows=[];
    for(let j=0;j<20;j++){
      if(i==0 || j==0 || i==19 || j==19)
        rows.push({type: 'WALL'})
      else
        rows.push({type: 'SPACE'});
    }
    map.push(rows);
    rows=undefined;
  }

  return {
    map
  };
}

const mapReducer=(state={},action)=>{
  let newState=Object.assign({},{
    map: state.map
  });
  switch (action.type) {
    case 'CREATE_MAP':
      return _createNewMap(newState);
    default:
      return newState;
  }
}

export default mapReducer;
