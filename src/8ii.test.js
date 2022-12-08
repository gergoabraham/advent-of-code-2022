const solver = require("./8ii");

const input = `30373
25512
65332
33549
35390`;

it("8ii", () => {
  solver(input).should.equal(8);
});
