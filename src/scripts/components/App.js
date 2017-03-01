import React from 'react';
import GameBoard from './GameBoard';
import GameControl from './GameControls';

const App = () => {
  return(
        <GameBoard>
          <GameControl />
        </GameBoard>
  );
}

export default App;
