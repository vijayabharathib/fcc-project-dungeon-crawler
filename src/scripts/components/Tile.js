import React, {} from 'react';
import '../../styles/css/Tile.css';

let Tile = (props) => {
  let class_name="c-tile--";
  switch (props.type) {
    case 'WALL':
      class_name+="wall";
      break;
    case 'SPACE':
      class_name+="space";
      break;
    case 'PLAYER':
      class_name+="player";
      break;
    case 'GUARD':
      class_name+="guard";
      break;
    case 'WEAPON':
      class_name+="weapon";
      break;
    case 'FOOD':
      class_name+="food";
      break;
    default:
      class_name+="nobody";
      break;
  }

  return (
    <td className={class_name}>
    </td>
  );
}


export default Tile;
