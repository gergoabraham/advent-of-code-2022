module.exports = (input) => {
  const steps = input.split("\n");

  const pointTable = {
    "A X": 3 + 0,
    "B X": 1 + 0,
    "C X": 2 + 0,
    "A Y": 1 + 3,
    "B Y": 2 + 3,
    "C Y": 3 + 3,
    "A Z": 2 + 6,
    "B Z": 3 + 6,
    "C Z": 1 + 6,
  };
  const points = steps.reduce((points, step) => points + pointTable[step], 0);

  return points;
};
