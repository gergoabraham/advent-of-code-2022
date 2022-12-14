const solver = require("./14ii");

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

it("14ii", () => {
  solver(input).should.equal(93);
});
