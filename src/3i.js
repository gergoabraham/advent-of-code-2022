module.exports = (input) => {
  const rucksacks = input.split("\n").map((sack) => {
    const l = sack.length;

    return [sack.substring(0, l / 2), sack.substring(l / 2, l)];
  });

  let prioritySum = 0;

  rucksacks.forEach(([firstCompartment, secondCompartment]) => {
    const firstCompartmentSet = new Set();

    for (const item of firstCompartment) {
      firstCompartmentSet.add(item);
    }

    for (const item of secondCompartment) {
      if (firstCompartmentSet.has(item)) {
        prioritySum += getPriority(item);
        return;
      }
    }
  });

  return prioritySum;
};

const getPriority = (c) => {
  const numberOfLetter = c.toLowerCase().charCodeAt(0) - "a".charCodeAt(0) + 1;
  const offsetIfUppercase = c.toUpperCase() === c ? 26 : 0;

  return numberOfLetter + offsetIfUppercase;
};

module.exports.getPriority = getPriority;
