import React from 'react';

import './PuzzleSelector.less';

export default function PuzzleSelector(props) {
  const puzzles = [
    {name: 'One', value: 1},
    {name: 'Two', value: 2},
    {name: 'Three', value: 3},
  ];

  return (
    <div className='puzzle-selector'>
      <h2>Puzzles</h2>
      <ul>
        {puzzles.map(p => {
          return (
            <li
              key={p.value}
              onClick={() => props.onSelect(p.value)}
            >
              {p.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
