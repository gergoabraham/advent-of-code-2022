const { getPriority } = require("./3i");

module.exports = (input) => {
  const rucksacks = input.split("\n");

  let prioritySum = 0;

  for (let i = 0; i < rucksacks.length; i += 3) {
    const sack1 = rucksacks[i + 0];
    const sack2 = rucksacks[i + 1];
    const sack3 = rucksacks[i + 2];

    const sack1Items = new Set();
    for (const item of sack1) {
      sack1Items.add(item);
    }

    const sack1And2SharedItems = new Set();
    for (const item of sack2) {
      if (sack1Items.has(item)) {
        sack1And2SharedItems.add(item);
      }
    }

    for (const item of sack3) {
      if (sack1And2SharedItems.has(item)) {
        prioritySum += getPriority(item);
        break;
      }
    }
  }

  return prioritySum;
};
