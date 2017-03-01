import React, {} from 'react';
import '../../styles/css/Cell.css';

let Cell = (props) => {
    let class_name="c-cell--"+(props.alive ? "alive" : "dead");

    return (
      <li onClick={props.onClick} className={class_name}>
      </li>
    );
}


export default Cell;
