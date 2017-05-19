import React, {} from 'react';
import '../../styles/css/Player.css';

let PlayerStatus = (props) => {
  let player=props.player;

  return (
    <ul className={"player_status " + props.result }>
      <li className="status_health">{`Health: ${player.health}`}</li>
      <li className="status_weapon">{`Weapon: ${player.weapon.name}`}</li>
      <li className="status_xp">{`Next level: ${player.xp}xp`}</li>
      <li className="status_level">{`Level: ${player.level}`}</li>
      <li className="toggle_light">
        <button onClick={props.toggleLight} >Toggle Light</button>        
      </li>
    </ul>
  );
}

export default PlayerStatus;
