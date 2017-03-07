import React, {} from 'react';
import '../../styles/css/Tile.css';

let Tile = (props) => {
    let class_name="c-tile--"+(props.type==='WALL' ? "wall" : "space");

    return (
      <td className={class_name}>
      </td>
    );
}


export default Tile;
