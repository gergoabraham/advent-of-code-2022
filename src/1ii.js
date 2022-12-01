module.exports = (input) =>
  input
    .split("\n\n")
    .map((pack) =>
      pack
        .split("\n")
        .map((x) => +x)
        .reduce((sum, curr) => sum + curr)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, curr) => sum + curr);
