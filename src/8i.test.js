const solver = require("./8i");

const input = `30373
25512
65332
33549
35390`;

it("8i", () => {
  solver(input).should.equal(21);
});
