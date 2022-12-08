module.exports = (input) => {
  const treeGrid = input.split("\n");
  const n = treeGrid.length;

  let bestScenicScore = 0;

  const selectors = [
    (grid, row, col, i) => grid[row + i]?.[col],
    (grid, row, col, i) => grid[row - i]?.[col],
    (grid, row, col, i) => grid[row]?.[col + i],
    (grid, row, col, i) => grid[row]?.[col - i],
  ];

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const tree = +treeGrid[row][col];
      const visibilityDistances = [];

      for (const selector of selectors) {
        let visibilityDistance = 0;

        for (let i = 1; i < n; i++) {
          const neighbour = +selector(treeGrid, row, col, i);

          if (isNaN(neighbour)) {
            break;
          }
          visibilityDistance++;
          if (neighbour >= tree) {
            break;
          }
        }

        visibilityDistances.push(visibilityDistance);
      }

      const scenicScore = visibilityDistances.reduce(
        (prev, curr) => prev * curr
      );
      bestScenicScore = Math.max(bestScenicScore, scenicScore);
    }
  }

  return bestScenicScore;
};
