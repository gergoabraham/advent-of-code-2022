module.exports = (input) => {
  // 1D array representation of the graph to easier node access
  const { graphWithSE, graph, columns } = getArrayRepresentationOfGraph(input);

  // start from 'S'
  const start = graphWithSE.indexOf("S");

  // stop when found 'E'
  const hasReachedEnd = (node) => graphWithSE[node] === "E";

  // going up
  const isReachable = (current, neighbour) =>
    graph[neighbour].charCodeAt(0) - graph[current].charCodeAt(0) <= 1;

  return findShortestPathDijkstra({
    graph,
    columns,
    start,
    hasReachedEnd,
    isReachable,
  });
};

const findShortestPathDijkstra = ({
  graph,
  columns,
  start,
  hasReachedEnd = () => false,
  isReachable = () => true,
}) => {
  const unvisitedSet = new Set();
  for (let node = 0; node < graph.length; node++) unvisitedSet.add(node);

  const distances = new Array(graph.length).fill(Infinity);
  distances[start] = 0;

  while (unvisitedSet.size) {
    const current = getUnvisitedNodeWithMinDistance(unvisitedSet, distances);

    if (hasReachedEnd(current)) {
      return distances[current];
    }

    unvisitedSet.delete(current);

    const neighbours = getNeighbours(current, columns, graph, isReachable);

    for (const neighbour of neighbours) {
      const distCandidate = distances[current] + 1;

      if (distCandidate < distances[neighbour]) {
        distances[neighbour] = distCandidate;
      }
    }
  }
};

const getArrayRepresentationOfGraph = (input) => {
  const graphWithSE = input.replace(/\n/g, "");
  const columns = input.indexOf("\n");

  const graph = graphWithSE.replace("S", "a").replace("E", "z");

  return { graphWithSE, graph, columns };
};

const getUnvisitedNodeWithMinDistance = (unvisitedSet, distances) => {
  let current = null;

  for (const node of unvisitedSet) {
    const currentDist = distances[current] ?? Infinity;
    if (distances[node] < currentDist) {
      current = node;
    }
  }

  return current;
};

const getNeighbours = (current, columns, graph, isReachable) => {
  const possibleNeighbourIndexes = [current + columns, current - columns];

  const isOnLeftBorder = current % columns === 0;
  const isOnRightBorder = (current + 1) % columns === 0;

  if (!isOnLeftBorder) possibleNeighbourIndexes.push(current - 1);
  if (!isOnRightBorder) possibleNeighbourIndexes.push(current + 1);

  return possibleNeighbourIndexes.filter(
    (neighbour) => graph[neighbour] && isReachable(current, neighbour)
  );
};

module.exports.findShortestPathDijkstra = findShortestPathDijkstra;
module.exports.getArrayRepresentationOfGraph = getArrayRepresentationOfGraph;
