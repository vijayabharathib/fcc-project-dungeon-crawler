import React, {} from 'react';
import '../../styles/css/Result.css';

let GameResult = (props) => {
  let class_name="c-result--";

  if(props.result==="Lost")
    class_name+="lost";
  else if(props.result==="Won")
    class_name+="won";
  else
    class_name+="ongoing";


  return (
    <div className={class_name}>
      <h2>{"You " + props.result + "!"}</h2>
      <button onClick={props.onClick} >Ride it once again!</button>
    </div>
  );
}


export default GameResult;
