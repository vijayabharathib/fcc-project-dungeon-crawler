import React from 'react';

let Dot =()=> {

    let rows=[];
    for(let j=0;j<50;j++){
      let tiles=[];
      let top=j*10;
      for(let i=0;i<50;i++){
        let left=i*10;
          tiles.push(<rect x={left} y={top} width="10" height="10" />);
      }
      rows.push(tiles);
    }
    return(
      <svg viewBox="0 0 500 500" height="500px" width="500px">
        {rows}
      </svg>
    )

}

export default Dot;
