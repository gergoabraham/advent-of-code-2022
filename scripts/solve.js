const problem = process.argv[2];
const solver = require(`../src/${problem}.js`);
const day = problem.match(/\d+/);
const input = require(`../inputs/${day}.js`);

console.log(solver(input));
