module.exports = (input) => {
  const intervals = input
    .split("\n")
    .map((line) => line.split(/[,-]/).map((x) => Number(x)));

  return intervals.reduce((numberOfIncludingIntervals, [x, y, a, b]) => {
    const isOverlapping = (x >= a && y <= b) || (x <= a && y >= b);

    return numberOfIncludingIntervals + (isOverlapping ? 1 : 0);
  }, 0);
};
