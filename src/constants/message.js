// src/constants/message.js
export const MESSAGE = Object.freeze({
  INPUT_CAR_NAMES: '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
  INPUT_TRIALS: '시도할 횟수는 몇 회인가요?\n',
  EXECUTION_RESULT: '실행 결과\n',
  ROUND_OUTPUT: (name, position) => `${name} : ${'-'.repeat(position)}`,
  WINNER_SINGLE: (name) => `최종 우승자 : ${name}`,
  WINNER_MULTIPLE: (names) => `최종 우승자 : ${names.join(', ')}`,
  RANKING_TITLE: '\n전체 순위표:'
});
