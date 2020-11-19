import React, {useEffect, useState} from 'react';
import { hexToPixel, isNeighbor } from '../helpers/hex';

import './Puzzle.less';
import PuzzlePiece from './PuzzlePiece';

export default function Puzzle(props) {
  const puzzleNumber = props.puzzleNumber;
  const [puzzle, setPuzzle] = useState([]);
  const [playerPosition, setPlayerPosition] = useState([0,0,0]);
  const [playerHistory, setPlayerHistory] = useState([]);
  const [playerMovement, setPlayerMovement] = useState(5);

  const playerTile = puzzle.find(tile => tile.coordinates.join(',') === playerPosition.join(','));

  useEffect(() => {
    import(`../puzzles/${puzzleNumber}.json`).then(jsonFile => {
      setPuzzle(jsonFile.default);
      setPlayerHistory([]);
      setPlayerPosition([0,0,0]);
    });
  }, [puzzleNumber]);

  useEffect(() => {
    if (playerHistory.length === 0) {
      setPlayerHistory([...playerHistory, playerPosition]);
    } else if (playerHistory[playerHistory.length - 1].join(',') !== playerPosition.join(',')) {
      setPlayerHistory([...playerHistory, playerPosition]);
    }
  }, [playerPosition]);

  const handlePuzzleClick = (tile) => {
    setPlayerPosition(tile.coordinates);
    setPlayerMovement(playerMovement + tile.movement);
  };

  const generatePieces = () => {
    return puzzle.map((tile, idx) => {
      if (tile.coordinates.join(',') === playerPosition.join(',')) {
        tile.player = true;
      } else {
        tile.player = false;
      }

      tile.neighbor = isNeighbor(
        {
          x: playerPosition[0],
          y: playerPosition[1],
          z: playerPosition[2]
        },
        {
          x: tile.coordinates[0],
          y: tile.coordinates[1],
          z: tile.coordinates[2]
        },
        playerTile.walls
      );

      if (tile.neighbor) {
        return <PuzzlePiece key={idx} tile={tile} onClick={handlePuzzleClick} />
      } else {
        return <PuzzlePiece key={idx} tile={tile} />
      }
    });
  };

  const renderPath = () => {
    if (playerHistory.length > 1) {
      const lines = [];
      for (let i = 0; i < playerHistory.length-1; i++) {
        const startPoint = hexToPixel({
          x: playerHistory[i][0],
          y: playerHistory[i][1],
          z: playerHistory[i][2],
        });
        const endPoint = hexToPixel({
          x: playerHistory[i+1][0],
          y: playerHistory[i+1][1],
          z: playerHistory[i+1][2],
        });
        lines.push([startPoint, endPoint]);
      }
      return lines.map(([[x1, y1], [x2, y2]]) => {
        return <line
          key={`${x1}${y1}${x2}${y2}`}
          x1={x1} y1={y1}
          x2={x2} y2={y2}
          stroke={lines.length > playerMovement ? 'red' : 'black'}
        />;
      });
    } else {
      return null;
    }
  };

  return (
    <div className='puzzle-container'>
      <svg className='puzzle' width='1200' height='1000'>
        {generatePieces()}
        <g className='rope'>
          {renderPath()}
        </g>
      </svg>
    </div>
  );
}
