import React, {} from 'react';
import '../../styles/css/Player.css';

let PlayerStatus = (props) => {
  let player=props.player;
  let light=props.light;
  return (
    <ul className={"player_status " + props.result }>
      <li className="status_health" title="Player Health">
        <div className="status"><svg className='status icon'><use xlinkHref="#icon_health_kit"/></svg></div>
        <span>{`${player.health}`}</span>
      </li>
      <li className="status_weapon" title="Player Weapon">
        <div className="status"><svg className='status icon'><use xlinkHref="#icon_weapon"/></svg></div>
        <span>{`${player.weapon.name}`}</span></li>
      <li className="status_xp" title="XP to next level">
        <div className="status"><svg className='status icon'><use xlinkHref="#icon_next"/></svg></div>
        <span>{`${player.xp}xp`}</span></li>
      <li className="status_level" title="Current Level">
        <div className="status"><svg className='status icon'><use xlinkHref="#icon_level"/></svg></div>
        <span>{`${player.level}`}</span>
      </li>
      <li className={`toggle_light ${light}`} title={light==="light" ? "Shed some light" : "I can win blindfolded"} onClick={props.toggleLight}>
        <div className="status"><svg className='status icon'><use xlinkHref="#icon_light"/></svg></div>
      </li>
    </ul>
  );
}

export default PlayerStatus;
