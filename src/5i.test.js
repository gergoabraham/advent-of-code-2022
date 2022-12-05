const solver = require("./5i");

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

it("5i", () => {
  solver(input).should.equal("CMZ");
});
