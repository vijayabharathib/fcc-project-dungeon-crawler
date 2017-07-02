import React, {} from 'react';
import '../../styles/css/Player.css';

let PlayerStatus = (props) => {
  let player=props.player;

  return (
    <ul className={"player_status " + props.result }>
      <li className="status_health">
        <svg className='status icon'><use xlinkHref="#icon_health_kit"/></svg>
        <span>{`${player.health}`}</span>
      </li>
      <li className="status_weapon">
        <svg className='status icon'><use xlinkHref="#icon_weapon"/></svg>
        <span>{`${player.weapon.name}`}</span></li>
      <li className="status_xp">
        <svg className='status icon'><use xlinkHref="#icon_next"/></svg>
        <span>{`${player.xp}xp`}</span></li>
      <li className="status_level">
        <svg className='status icon'><use xlinkHref="#icon_level"/></svg>
        <span>{`${player.level}`}</span>
      </li>
      <li className="toggle_light">
        <svg onClick={props.toggleLight} className='status icon'><use xlinkHref="#icon_light"/></svg>
      </li>
    </ul>
  );
}

export default PlayerStatus;
