const { parseRockFormations, getNumberOfSand } = require("./14i");

module.exports = (input) => {
  const { rocks, maxY } = parseRockFormations(input);

  const minX = 0;
  const maxX = 1000;

  const floor = [
    [minX, maxY + 2],
    [maxX, maxY + 2],
  ];
  rocks.push(floor);

  const { numberOfRestedSand } = getNumberOfSand(maxX, minX, maxY + 2, rocks);

  return numberOfRestedSand;
};
