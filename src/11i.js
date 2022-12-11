module.exports = (input) => {
  const monkeys = parseMonkeys(input);

  return doMonkeyBusiness(monkeys, 20, (item) => Math.floor(item / 3));
};

const doMonkeyBusiness = (
  monkeys,
  rounds,
  manageWorryLevel = (item) => item
) => {
  for (let round = 0; round < rounds; round++) {
    for (const monkey of monkeys) {
      while (monkey.items.length > 0) {
        monkey.monkeyBusiness++;

        let item = monkey.items.shift();

        // monkey inspects
        const operand =
          monkey.operation.operand === "old" ? item : +monkey.operation.operand;

        if (monkey.operation.operator === "+") {
          item += operand;
        } else {
          item *= operand;
        }

        // monkey gets bored
        item = manageWorryLevel(item);

        // monkey throws
        const targetMonkeyIndex =
          item % monkey.test.divisibleBy === 0
            ? monkey.test.onTrue
            : monkey.test.onFalse;

        monkeys[targetMonkeyIndex].items.push(item);
      }
    }
  }

  return monkeys
    .sort((a, b) => b.monkeyBusiness - a.monkeyBusiness)
    .map(({ monkeyBusiness }) => monkeyBusiness)
    .slice(0, 2)
    .reduce((acc, cur) => acc * cur);
};

const parseMonkeys = (input) =>
  input.split("\n\n").map((rawData) => {
    const monkeyData = rawData.split("\n");

    const monkey = {
      items: monkeyData[1].match(/\d+/g).map((x) => +x),

      operation: {
        operator: monkeyData[2].match(/[+*]/)[0],
        operand: monkeyData[2].match(/(\d+|old)$/)[0],
      },

      test: {
        divisibleBy: +monkeyData[3].match(/\d+/)[0],
        onTrue: +monkeyData[4].match(/\d+/)[0],
        onFalse: +monkeyData[5].match(/\d+/)[0],
      },

      monkeyBusiness: 0,
    };

    return monkey;
  });

module.exports.doMonkeyBusiness = doMonkeyBusiness;
module.exports.parseMonkeys = parseMonkeys;
