module.exports = (input) => {
  const getMoverAlgorithm = () => (stacks, quantity, source, destination) => {
    for (let j = 0; j < quantity; j++) {
      stacks[destination - 1].push(stacks[source - 1].pop());
    }
  };

  return crateMover(input, getMoverAlgorithm());
};

const crateMover = (input, move) => {
  const lines = input.split("\n");
  const N = (lines[0].length + 1) / 4;

  // fill stacks
  const stacks = new Array(N).fill(null).map(() => []);
  const legendIndex = lines.findIndex((line) => line.includes(" 1 "));

  for (let i = legendIndex - 1; i >= 0; i--) {
    const line = lines[i];

    for (let j = 0; j < stacks.length; j++) {
      const crate = line[j * 4 + 1];

      if (crate !== " ") {
        stacks[j].push(crate);
      }
    }
  }

  // move crates
  const firstStepIndex = legendIndex + 2;

  for (let i = firstStepIndex; i < lines.length; i++) {
    const [quantity, source, destination] = lines[i].match(/\d+/g);

    move(stacks, quantity, source, destination);
  }

  // top crates
  const topCrates = stacks.reduce((tops, stack) => tops + stack.pop(), "");

  return topCrates;
};

module.exports.crateMover = crateMover;
