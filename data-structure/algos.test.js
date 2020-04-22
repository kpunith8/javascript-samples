import * as algos from "./algos";

describe("Algos", () => {
  describe("chunkArrayInGroups", () => {
    it("should have the proper array chunks", () => {
      expect(algos.chunkArrayInGroups(["a", "b", "c", "d"], 3)).toEqual([
        ["a", "b", "c"],
        ["d"],
      ]);

      expect(algos.chunkArrayInGroups(["a", "b", "c", "d"], 2)).toEqual([
        ["a", "b"],
        ["c", "d"],
      ]);
    });
  });

  describe("diffArray", () => {
    test("should have the array diff", () => {
      expect(
        algos.diffArray(
          ["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"],
          ["diorite", "andesite", "grass", "dirt", "dead shrub"]
        )
      ).toEqual(["pink wool"]);
    });

    test("should not have the array diff", () => {
      expect(
        algos.diffArray(
          ["diorite", "andesite", "grass", "dirt", "dead shrub"],
          ["diorite", "andesite", "grass", "dirt", "dead shrub"]
        )
      ).toEqual([]);
    });
  });

  describe("sumAll", () => {
    test("should have the correct sum", () => {
      expect(algos.sumAll([1, 4])).toEqual(10);
    });

    describe("when the input array is empty", () => {
      test("should have the sum as 0", () => {
        expect(algos.sumAll([])).toEqual(0);
      });
    });
  });

  describe("reverseStringArr", () => {
    test("should have the reversed string", () => {
      expect(algos.reverseStringArr("abcdabb")).toEqual("bbadcba");
    });
  });

  describe("nonRepeatedChar", () => {
    test("should have the non repeated char ", () => {
      expect(algos.nonRepeatedChar("abccdefabde")).toEqual(["f"]);
    });

    test("should not have the non repeated char", () => {
      expect(algos.nonRepeatedChar("abcd")).toEqual(["a", "b", "c", "d"]);
    });
  });
});
