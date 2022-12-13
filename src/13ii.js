const { comparePackets } = require("./13i");

module.exports = (input) => {
  const packets = input
    .split("\n")
    .filter((x) => x)
    .map((x) => JSON.parse(x));

  const divider1 = [[2]];
  const divider2 = [[6]];
  packets.push(divider1, divider2);

  packets.sort((a, b) => (comparePackets(a, b) ? -1 : 1));

  const d1index = packets.findIndex((item) => item === divider1) + 1;
  const d2index = packets.findIndex((item) => item === divider2) + 1;

  return d1index * d2index;
};
