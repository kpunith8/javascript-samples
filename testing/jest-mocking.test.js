function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

describe("mocking with jest", () => {
  test("mock functions", () => {
    const mockCallback = jest.fn((x) => 42 + x);
    forEach([0, 1], mockCallback);

    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[0][0]).toBe(0);
    expect(mockCallback.mock.calls[1][0]).toBe(1);
    expect(mockCallback.mock.results[0].value).toBe(42);
  });

  test("mock return values", () => {
    const myMock = jest.fn();

    myMock
      .mockReturnValueOnce(10)
      .mockReturnValueOnce("x")
      .mockReturnValue(true);

    console.log(myMock(), myMock(), myMock(), myMock());

    const filterTestFn = jest.fn();

    // Make the mock return `true` for the first call,
    // and `false` for the second call
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

    const result = [11, 12].filter((num) => filterTestFn(num));

    console.log("mock filter function result:", result);
    console.log("total mock calls:", filterTestFn.mock.calls);
  });

  test("mocking date object", () => {
    Date.now = jest.fn(() => 1482363367071);

    console.log("Mocked date:", new Date(Date.now()));
  });
});
