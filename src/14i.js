module.exports = (input) => {
  const { rocks, minX, maxX, maxY } = parseRockFormations(input);

  var { numberOfRestedSand } = getNumberOfSand(maxX, minX, maxY, rocks);

  //console.log(grid.map((line) => line.join("")).join("\n"));

  return numberOfRestedSand;
};

const getNumberOfSand = (maxX, minX, maxY, rocks) => {
  const width = maxX - minX;
  const height = maxY;

  const grid = generateGrid(height, width, rocks, minX);

  let isFinished = false;
  let numberOfRestedSand = 0;

  while (!isFinished) {
    if (grid[0][500 - minX] === "o") {
      break;
    }

    let isRested = false;
    const sand = { y: 0, x: 500 };

    while (!isRested && !isFinished) {
      if (sand.y + 1 > maxY) {
        isFinished = true;
      } else if (grid[sand.y + 1][sand.x - minX] === ".") {
        sand.y++;
      } else if (sand.x - 1 < minX) {
        isFinished = true;
      } else if (grid[sand.y + 1][sand.x - 1 - minX] === ".") {
        sand.y++;
        sand.x--;
      } else if (sand.x + 1 > maxX) {
        isFinished = true;
      } else if (grid[sand.y + 1][sand.x + 1 - minX] === ".") {
        sand.y++;
        sand.x++;
      } else {
        isRested = true;
        grid[sand.y][sand.x - minX] = "o";
        numberOfRestedSand++;
      }
    }
  }

  return { grid, numberOfRestedSand };
};

const parseRockFormations = (input) => {
  const rocks = input
    .split("\n")
    .map((line) =>
      line.split(" -> ").map((coords) => coords.split(",").map((x) => +x))
    );

  const { minX, maxX, minY, maxY } = getBoundaries(rocks);

  return { rocks, minX, maxX, minY, maxY };
};

const generateGrid = (height, width, rocks, minX) => {
  const grid = new Array(height + 1)
    .fill(null)
    .map(() => new Array(width + 1).fill("."));

  for (const rockLines of rocks) {
    for (let i = 0; i < rockLines.length - 1; i++) {
      const start = rockLines[i];
      const end = rockLines[i + 1];

      if (start[0] === end[0]) {
        const min = Math.min(start[1], end[1]);
        const max = Math.max(start[1], end[1]);
        for (let j = min; j <= max; j++) {
          grid[j][start[0] - minX] = "#";
        }
      } else {
        const min = Math.min(start[0], end[0]);
        const max = Math.max(start[0], end[0]);
        for (let j = min; j <= max; j++) {
          grid[start[1]][j - minX] = "#";
        }
      }
    }
  }
  return grid;
};

const getBoundaries = (rocks) => {
  return rocks.reduce(
    ({ minX, maxX, minY, maxY }, line) => {
      const perLine = line.reduce(
        ({ minX, maxX, minY, maxY }, coords) => ({
          minX: Math.min(minX, coords[0]),
          maxX: Math.max(maxX, coords[0]),
          minY: Math.min(minY, coords[1]),
          maxY: Math.max(maxY, coords[1]),
        }),
        { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
      );

      return {
        minX: Math.min(minX, perLine.minX),
        maxX: Math.max(maxX, perLine.maxX),
        minY: Math.min(minY, perLine.minY),
        maxY: Math.max(maxY, perLine.maxY),
      };
    },
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  );
};

module.exports.parseRockFormations = parseRockFormations;
module.exports.getNumberOfSand = getNumberOfSand;
