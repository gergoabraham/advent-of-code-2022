const solver = require("./4i");

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

it("4i", () => {
  solver(input).should.equal(2);
});