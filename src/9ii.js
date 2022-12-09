const { simulateTailPositions } = require("./9i");

module.exports = (input) => {
  const tailPositions = simulateTailPositions(input, 10);

  return tailPositions.size;
};
