module.exports = (input) => {
  const tailPositions = simulateTailPositions(input, 2);

  return tailPositions.size;
};

const simulateTailPositions = (input, length) => {
  const commands = input.split("\n").map((line) => line.split(" "));

  const tailPositions = new Set();
  const snake = new Array(length).fill(null).map(() => ({ x: 0, y: 0 }));

  for (const [direction, numberOfSteps] of commands) {
    for (let step = 0; step < numberOfSteps; step++) {
      snake[0] = calculateNewHeadPosition(snake[0], direction);

      for (let i = 1; i < snake.length; i++) {
        snake[i] = calculateNewFollowerSegmentPosition(snake[i], snake[i - 1]);
      }

      const tail = snake[snake.length - 1];
      tailPositions.add(`${tail.x},${tail.y}`);
    }
  }

  return tailPositions;
};

const calculateNewHeadPosition = (head, direction) =>
  moverOperations[direction](head);

const moverOperations = {
  L: ({ x, y }) => ({ x: x - 1, y: y }),
  R: ({ x, y }) => ({ x: x + 1, y: y }),
  U: ({ x, y }) => ({ x: x, y: y + 1 }),
  D: ({ x, y }) => ({ x: x, y: y - 1 }),
};

const calculateNewFollowerSegmentPosition = (follower, leader) => {
  const distanceSquare =
    (leader.x - follower.x) ** 2 + (leader.y - follower.y) ** 2;

  const shouldFollow = distanceSquare > 2;

  if (shouldFollow) {
    return {
      x: calculateFollowerCoordinate(leader.x, follower.x),
      y: calculateFollowerCoordinate(leader.y, follower.y),
    };
  } else {
    return follower;
  }
};

const calculateFollowerCoordinate = (a, b) => b + limitToOne(a - b);
const limitToOne = (x) => Math.max(Math.min(x, 1), -1);

module.exports.simulateTailPositions = simulateTailPositions;
