const { doMonkeyBusiness, parseMonkeys } = require("./11i");

module.exports = (input) => {
  const monkeys = parseMonkeys(input);

  const smallestCommonMultiplier = monkeys
    .map((monkey) => monkey.test.divisibleBy)
    .reduce((mult, num) => mult * num);

  const manageWorryLevel = (item) => item % smallestCommonMultiplier;

  return doMonkeyBusiness(monkeys, 10000, manageWorryLevel);
};
