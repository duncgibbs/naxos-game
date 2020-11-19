import React from 'react';
import { getWallCoords, hexToPixel, HEX_SIZE } from '../helpers/hex';

export default function PuzzlePiece(props) {
  const generateWall = ([hexX, hexY], wallNumber) => {
    const [[x1, y1], [x2, y2]] = getWallCoords([hexX, hexY], wallNumber);
    return <line
      key={wallNumber}
      x1={x1} y1={y1}
      x2={x2} y2={y2}
      stroke='black'
    />;
  };

  const generateTileCircle = ([hexX, hexY]) => {
    switch (props.tile.type) {
      case 'end':
        return <circle cx={hexX} cy={hexY} r={10} fill='red' />;
      case 'pickup':
        return <circle cx={hexX} cy={hexY} r={10} fill='white' stroke='black' />;
      default:
        return <circle cx={hexX} cy={hexY} r={2} fill='black' />;
    }
  };

  const generateHexPolygon = ([hexX, hexY]) => {
    const points = [...Array(6).keys()].map(wall => {
      const x = hexX + (HEX_SIZE * Math.sin(1.0472 * (wall + 1)));
      const y = hexY + (HEX_SIZE * Math.cos(1.0472 * (wall + 1)));
      return `${x},${y}`
    });

    return <polygon
      points={points.join(' ')}
      className={props.tile.neighbor ? 'neighbor' : ''}
      onClick={() => props.onClick ? props.onClick(props.tile) : console.log(props.tile.coordinates)}
    />
  };

  const generateDoors = ([hexX, hexY], doors) => {
    return doors.map(door => {
      console.log(door);
      const [[x1, y1], [x2, y2]] = getWallCoords([hexX, hexY], door, (HEX_SIZE - 2));
      return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke='black' strokeWidth='4' />;
    });
  };

  const hex = {
    x: props.tile.coordinates[0],
    y: props.tile.coordinates[1],
    z: props.tile.coordinates[2],
  };
  const [hexX, hexY] = hexToPixel(hex);

  return (
    <g>
      {generateHexPolygon([hexX, hexY])}
      {generateTileCircle([hexX, hexY])}
      {
        props.tile.player
        ? <circle cx={hexX} cy={hexY} r={5} fill='green' />
        : null
      }
      {
        props.tile.doors && props.tile.doors.length
        ? generateDoors([hexX, hexY], props.tile.doors)
        : null
      }
      {props.tile.walls.map(wall => generateWall([hexX, hexY], wall))}
    </g>
  );
}
