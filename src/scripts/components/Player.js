import React, {} from 'react';
import '../../styles/css/Player.css';

let PlayerStatus = (props) => {

  return (
    <ul className="player_status">
      <li className="status_health">{`Health: ${props.health}`}</li>
      <li className="status_weapon">{`Weapon: ${props.weapon}`}</li>
      <li className="status_xp">{`Next leven in: ${props.xp}`}</li>
      <li className="status_level">{`Level: ${props.level}`}</li>
    </ul>
  );
}

export default PlayerStatus;
