const solver = require("./12ii");

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

it("12ii", () => {
  solver(input).should.equal(29);
});
