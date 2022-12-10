module.exports = (input) => {
  let sumOfSignalStrengths = 0;

  const onTickCallback = (cycle, register) => {
    const isInterestingCycle = (cycle - 20) % 40 === 0;

    if (isInterestingCycle) {
      sumOfSignalStrengths += cycle * register;
    }
  };

  executeInstructions(input, onTickCallback);

  return sumOfSignalStrengths;
};

const executeInstructions = (input, onTickCallback = () => {}) => {
  const commands = input.split("\n").map((line) => line.split(" "));

  let cycle = 1;

  let register = 1;
  let programCounter = 0;
  let numberToAddInNextCycle = null;

  while (programCounter < commands.length) {
    onTickCallback(cycle, register);

    if (numberToAddInNextCycle !== null) {
      register += numberToAddInNextCycle;
      numberToAddInNextCycle = null;
    } else {
      const [command, arg] = commands[programCounter];

      if (command === "addx") {
        numberToAddInNextCycle = +arg;
      }

      programCounter++;
    }

    cycle++;
  }
};

module.exports.executeInstructions = executeInstructions;
