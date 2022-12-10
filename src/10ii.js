const { executeInstructions } = require("./10i");

module.exports = (input) => {
  const screen = new Array(6).fill(null).map(() => new Array(40));

  const onTickCallback = (cycle, register) => {
    const rowIndex = Math.floor((cycle - 1) / 40);
    const pixelIndex = (cycle - 1) % 40;

    const shouldDrawPixel = Math.abs(pixelIndex - register) <= 1;

    screen[rowIndex][pixelIndex] = shouldDrawPixel ? "#" : ".";
  };

  executeInstructions(input, onTickCallback);

  return screen.map((line) => line.join("")).join("\n");
};
