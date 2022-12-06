const solver = require("./6i");

const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

describe("6i", () => {
  it("1", () => {
    solver(input).should.equal(7);
  });

  it("2", () => {
    solver("bvwbjplbgvbhsrlpgdmjqwftvncz").should.equal(5);
  });

  it("3", () => {
    solver("nppdvjthqldpwncqszvftbrmjlhg").should.equal(6);
  });

  it("4", () => {
    solver("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg").should.equal(10);
  });

  it("5", () => {
    solver("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw").should.equal(11);
  });
});
