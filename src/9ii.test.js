const solver = require("./9ii");

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const input2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

describe("9ii", () => {
  it("1", () => {
    solver(input).should.equal(1);
  });

  it("2", () => {
    solver(input2).should.equal(36);
  });
});
