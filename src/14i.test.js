const solver = require("./14i");

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

it("14i", () => {
  solver(input).should.equal(24);
});
