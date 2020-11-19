import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import Puzzle from './Puzzle';
import PuzzleSelector from './PuzzleSelector';

import './App.less';

function App() {
  const [puzzle, setPuzzle] = useState(1);

  return (
    <div className='app'>
      <PuzzleSelector onSelect={setPuzzle} />
      <Puzzle puzzleNumber={puzzle} />
    </div>
  );
}

export default hot(module)(App);
