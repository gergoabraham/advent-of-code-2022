const solver = require("./6ii");

const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

describe("6ii", () => {
  it("1", () => {
    solver(input).should.equal(19);
  });

  it("2", () => {
    solver("bvwbjplbgvbhsrlpgdmjqwftvncz").should.equal(23);
  });

  it("3", () => {
    solver("nppdvjthqldpwncqszvftbrmjlhg").should.equal(23);
  });

  it("4", () => {
    solver("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg").should.equal(29);
  });

  it("5", () => {
    solver("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw").should.equal(26);
  });
});
