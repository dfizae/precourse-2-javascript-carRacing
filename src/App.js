import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    const PARTICIPATIONS = await MissionUtils.Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분');
    const TRIAL = Number(await MissionUtils.Console.readLineAsync('시도할 횟수는 몇 회인가요?'));
    await MissionUtils.Console.print(`실행 결과\n`);
    this.race(PARTICIPATIONS, TRIAL);    
  }

  race(participations, trial){
    
    const RACER = participations.split(',').map(name => ({name, position: 0}));
    
    for(let i = 0; i < trial; i++){
      this.forward(RACER);
      this.printRound(RACER);
    }

  }

  forward(racer){
    racer.forEach( racer => {
      const RANDOMVALUE = MissionUtils.Random.pickNumberInRange(0, 9);
      if(RANDOMVALUE >= 4) racer.position++;
    });
    
  }

  printRound(racer){
    racer.forEach(racer => {
      MissionUtils.Console.print(`${racer.name} : ${'-'.repeat(racer.position)}`);
    });
  }

}

export default App;
