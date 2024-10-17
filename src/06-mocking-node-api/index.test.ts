import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    const numberToCalls = 3;

    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval * numberToCalls);
    expect(callback).toHaveBeenCalledTimes(numberToCalls);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'pathToFile';

    const joinMock = jest.requireMock('path').join as jest.Mock;
    joinMock.mockReturnValue(pathToFile);

    const existsSyncMock = jest.requireMock('fs').existsSync as jest.Mock;
    existsSyncMock.mockReturnValue(false);

    await readFileAsynchronously(pathToFile);
    expect(joinMock).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'pathToFile';

    const joinMock = jest.requireMock('path').join as jest.Mock;
    joinMock.mockReturnValue(pathToFile);

    const existsSyncMock = jest.requireMock('fs').existsSync as jest.Mock;
    existsSyncMock.mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'File content';
    const pathToFile = 'pathToFile';
    const mockFileContent = Buffer.from(fileContent);

    const joinMock = jest.requireMock('path').join as jest.Mock;
    joinMock.mockReturnValue(pathToFile);

    const existsSyncMock = jest.requireMock('fs').existsSync as jest.Mock;
    existsSyncMock.mockReturnValue(true);

    const readFileMock = jest.requireMock('fs/promises').readFile as jest.Mock;
    readFileMock.mockResolvedValue(mockFileContent);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
  });
});
