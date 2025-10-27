import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();
  MissionUtils.Console.readLineAsync.mockImplementation(() => Promise.resolve(inputs.shift()));
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => acc.mockReturnValueOnce(number), MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("게임 진행 테스트", () => {
  test("단일 차수 전진", async () => {
    const inputs = ["pobi,woni", "1"];
    mockQuestions(inputs);
    mockRandoms([4, 3]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("pobi : -"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("woni : "));
  });

  test("다수 차수 진행", async () => {
    const inputs = ["pobi,woni", "2"];
    mockQuestions(inputs);
    mockRandoms([4, 3, 5, 4]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("pobi : --"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("woni : -"));
  });
});
