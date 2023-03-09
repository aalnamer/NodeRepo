const { MarkovMachine } = require("./markov");

describe("markov machine", function () {
  test("make chains", () => {
    let mm = new MarkovMachine("aa bb cc aa BB aa BB");
    expect(mm.chains).toEqual(
      new Map([
        ["aa", ["bb", "BB", "BB"]],
        ["bb", ["cc"]],
        ["cc", ["aa"]],
        ["BB", ["aa", null]],
      ])
    );
  });
  test("choice pick from array"),
    function () {
      expect(MarkovMachine.choice([1, 1, 1])).toEqual(1);
      expect([1, 2, 3]).toContain(MarkovMachine.choice([1, 2, 3]));
    };
  test("create a predictable test"),
    function () {
      let mm = new MarkovMachine("a b c");
      let text = mm.makeText();
      expect(["a b c", "b c", "c"]).toContain(text);
    };
});
