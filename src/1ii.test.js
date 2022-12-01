const solver = require("./1ii");

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

it("1ii", () => {
  solver(input).should.equal(45000);
});
