module.exports = (input) => {
  const treeGrid = input.split("\n");
  const n = treeGrid.length;
  const isVisibleGrid = new Array(n)
    .fill(null)
    .map(() => new Array(n).fill(false));

  let numberOfVisibleTrees = 0;

  const selectorsFromEachSide = [
    // looking at rows from left
    (grid, outer, inner, value = null) =>
      (grid[outer][inner] = value ?? grid[outer][inner]),
    // looking at rows from right
    (grid, outer, inner, value = null) =>
      (grid[outer][n - 1 - inner] = value ?? grid[outer][n - 1 - inner]),
    // looking at columns from the top
    (grid, outer, inner, value = null) =>
      (grid[inner][outer] = value ?? grid[inner][outer]),
    // looking at columns from the bottom
    (grid, outer, inner, value = null) =>
      (grid[n - 1 - inner][outer] = value ?? grid[n - 1 - inner][outer]),
  ];

  for (const selector of selectorsFromEachSide) {
    for (let outerI = 0; outerI < n; outerI++) {
      let highestSoFar = -1;

      for (let innerI = 0; innerI < n; innerI++) {
        const tree = +selector(treeGrid, outerI, innerI);
        const isVisible = selector(isVisibleGrid, outerI, innerI);

        if (tree > highestSoFar) {
          highestSoFar = tree;

          if (!isVisible) {
            selector(isVisibleGrid, outerI, innerI, true);
            numberOfVisibleTrees++;
          }
        }
      }
    }
  }

  return numberOfVisibleTrees;
};
