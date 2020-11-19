export const HEX_SIZE = 25;
export const HEX_X_OFFSET = 500;
export const HEX_Y_OFFSET = 200;

export const isNeighbor = (startHex, neighborHex, walls = []) => {
    let isNeighbor = false;

    const directions = [
        [1, 0, -1],
        [1, -1, 0],
        [0, -1, 1],
        [-1, 0, 1],
        [-1, 1, 0],
        [0, 1, -1],
    ];

    for (const [idx, dir] of directions.entries()) {
        if (
            (startHex.x + dir[0]) === neighborHex.x &&
            (startHex.y + dir[1]) === neighborHex.y &&
            (startHex.z + dir[2]) === neighborHex.z
        ) {
            if (!walls.includes(idx+1)) {
                isNeighbor = true;
            }
        }
    }

    return isNeighbor;
};

export const hexToPixel = (hex) => {
    const y = (3/2 * HEX_SIZE * hex.z) + HEX_Y_OFFSET;
    const x = ((Math.sqrt(3) * -1) * HEX_SIZE * ((hex.z / 2) + hex.y)) + HEX_X_OFFSET;
    return [x, y];
};

export const getWallCoords = ([hexX, hexY], wallNumber, hexSize = HEX_SIZE) => {
    const x1 = hexX + (hexSize * Math.sin(1.0472 * ((wallNumber + 2) * -1)));
    const y1 = hexY + (hexSize * Math.cos(1.0472 * ((wallNumber + 2) * -1)));
    const x2 = hexX + (hexSize * Math.sin(1.0472 * ((wallNumber + 3) * -1)));
    const y2 = hexY + (hexSize * Math.cos(1.0472 * ((wallNumber + 3) * -1)));
    return [[x1, y1], [x2, y2]];
};
