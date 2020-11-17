const { once, onceAndAfter } = require('./mastering-fp');

describe('mastering fp', () => {
  describe('once', () => {
    const display = (msg) => msg;
    const displayMock = jest.fn(display);

    const displayOnce = once(displayMock);

    it('should call a function only once', () => {
      displayOnce('world');
      displayOnce('hello');

      expect(displayMock).toHaveBeenCalled();
    });
  });

  describe('onceAndAfter', () => {
    const once = (msg) => msg;
    const onceMock = jest.fn(once);

    const after = (msg) => msg;
    const afterMock = jest.fn(after);

    const testOnceAndAfter = onceAndAfter(onceMock, afterMock);

    it('should call once() only once and after() twice', () => {
      testOnceAndAfter('world');
      expect(onceMock).toHaveBeenCalled();
      expect(afterMock).toHaveBeenCalledTimes(0);

      testOnceAndAfter('hello');
      expect(onceMock).toHaveBeenCalled();
      expect(afterMock).toHaveBeenCalledTimes(1);

      testOnceAndAfter('hi');
      expect(onceMock).toHaveBeenCalled();
      expect(afterMock).toHaveBeenCalledTimes(2);
    });
  });
});
