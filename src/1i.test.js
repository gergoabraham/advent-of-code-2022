const solver = require("./1i");

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

it("1i", () => {
  solver(input).should.equal(24000);
});
