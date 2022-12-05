const { crateMover } = require("./5i");

module.exports = (input) => {
  const getMoverAlgorithm = () => (stacks, quantity, source, destination) => {
    const sourceStack = stacks[source - 1];
    const destinationStack = stacks[destination - 1];
    const tempStack = [];

    for (let i = 0; i < quantity; i++) {
      tempStack.push(sourceStack.pop());
    }
    for (let i = 0; i < quantity; i++) {
      destinationStack.push(tempStack.pop());
    }
  };

  return crateMover(input, getMoverAlgorithm());
};
