const {
  findShortestPathDijkstra,
  getArrayRepresentationOfGraph,
} = require("./12i");

module.exports = (input) => {
  const { columns, graph, graphWithSE } = getArrayRepresentationOfGraph(input);

  // this time we start from the top!
  const start = graphWithSE.indexOf("E");

  // and stop at the first 'a'
  const hasReachedEnd = (node) => graph[node] === "a";

  // and going down
  const isReachable = (current, neighbour) =>
    graph[current].charCodeAt(0) - graph[neighbour].charCodeAt(0) <= 1;

  return findShortestPathDijkstra({
    graph,
    columns,
    start,
    hasReachedEnd,
    isReachable,
  });
};
