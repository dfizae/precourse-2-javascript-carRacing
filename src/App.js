import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    const PARTICIPATIONS = await MissionUtils.Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분');
    const TRIAL = Number(await MissionUtils.Console.readLineAsync('시도할 횟수는 몇 회인가요?'));
    await MissionUtils.Console.print(`실행 결과\n`);
    this.race(PARTICIPATIONS, TRIAL);
  }

  race(participations, trial){
    
    let participationList = participations.split(',');
    let i = 1;
    
    for(let x of participationList){
      let name = x;
    }
    
    while(i <= trial){

    }

  }

}

export default App;
