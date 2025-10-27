import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();
  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe("입력 예외 테스트", () => {
  test("빈 이름", async () => {
    const inputs = [",woni", "1"];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("중복 이름", async () => {
    const inputs = ["pobi,pobi", "1"];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("특수문자 포함", async () => {
    const inputs = ["pobi,won!i", "1"];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("시도 횟수 0", async () => {
    const inputs = ["pobi,woni", "0"];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });
});
