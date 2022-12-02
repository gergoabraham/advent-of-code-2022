module.exports = (input) => {
  const steps = input.split("\n").map((line) => line.split(" "));

  const getPointsFromShape = (b) => ({ X: 1, Y: 2, Z: 3 }[b]);

  const getPointsFromOutcome = ([a, b]) => {
    const step = a + b;
    const winnerPositions = ["AY", "BZ", "CX"];
    const drawPositions = ["AX", "BY", "CZ"];

    return winnerPositions.includes(step)
      ? 6
      : drawPositions.includes(step)
      ? 3
      : 0;
  };

  const points = steps.reduce(
    (points, step) =>
      points + getPointsFromShape(step[1]) + getPointsFromOutcome(step),
    0
  );

  return points;
};
