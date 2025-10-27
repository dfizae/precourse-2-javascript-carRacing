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

describe("최종 우승자 테스트", () => {
  test("단일 우승자", async () => {
    const inputs = ["pobi,woni", "1"];
    mockQuestions(inputs);
    mockRandoms([4, 3]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("최종 우승자 : pobi"));
  });

  test("공동 우승자", async () => {
    const inputs = ["pobi,woni", "1"];
    mockQuestions(inputs);
    mockRandoms([4, 4]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("최종 우승자 : pobi, woni"));
  });
});
