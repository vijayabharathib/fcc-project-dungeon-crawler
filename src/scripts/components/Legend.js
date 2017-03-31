import React, {} from 'react';
import '../../styles/css/Legend.css';

let Legend = (props) => {
  return (
    <ul className="c-legend">
      <li className="c-legend_player"><i></i>Player</li>
      <li className="c-legend_guard"><i></i>Guard</li>
      <li className="c-legend_weapon"><i></i>Weapon</li>
      <li className="c-legend_food"><i></i>Food</li>
      <li className="c-legend_door"><i></i>Door</li>
    </ul>
  );
}

export default Legend;
