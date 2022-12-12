const solver = require("./12i");

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

it("12i", () => {
  solver(input).should.equal(31);
});
