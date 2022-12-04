module.exports = (input) => {
  const intervals = input
    .split("\n")
    .map((line) => line.split(/[,-]/).map((x) => Number(x)));

  return intervals.reduce((numberOfOverlappingIntervals, [x, y, a, b]) => {
    const isOverlapping =
      isInRange(x, a, b) ||
      isInRange(y, a, b) ||
      isInRange(a, x, y) ||
      isInRange(b, x, y);

    return numberOfOverlappingIntervals + (isOverlapping ? 1 : 0);
  }, 0);
};

const isInRange = (x, a, b) => x >= a && x <= b;
