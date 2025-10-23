import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    const participations = await MissionUtils.Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분\n');
    const trial = Number(await MissionUtils.Console.readLineAsync('시도할 횟수는 몇 회인가요?\n'));
    await MissionUtils.Console.print(`실행 결과\n`);
    this.race(participations, trial);    
  }

  race(participations, trial){
    
    // position: 차수별 드라이브 별 등수가 아닌 위치 의미
    const racers = participations.split(',').map(name => {
      if(name.length > 5) throw new Error("[ERROR] : 레이서 명이 5자 이하만 가능합니다..");
      return { name, position: 0 };
    });
    
    for(let i = 0; i < trial; i++){
      this.forward(racers);
      this.printRound(racers);
    }    
    this.printWinners(racers);
  }

  forward(racers) {
  racers.forEach(racer => {
    const randomValue = MissionUtils.Random.pickNumberInRange(0, 9);
    if (randomValue >= 4) racer.position++;
  });
  }


  printRound(racers){
    racers.forEach(racer => {
    MissionUtils.Console.print(`${racer.name} : ${'-'.repeat(racer.position)}`);
    });
    MissionUtils.Console.print('');
  }
  
  printWinners(racer){
    const maxPosition = Math.max(...racer.map((r) => r.position));
    const winners = racer.filter((r) => r.position === maxPosition).map((r) => r.name);
  
    if(winners.length === 1){
      MissionUtils.Console.print(`최종 우승자 : ${winners[0]}`);
    } else{
      MissionUtils.Console.print(`최종 우승자 : ${winners.join(', ')}`);
    }
  }
}

export default App;
