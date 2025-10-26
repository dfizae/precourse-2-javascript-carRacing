import { Console, Random } from "@woowacourse/mission-utils";

class App {
  async run() {
    const participations = await Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분\n');
    const trial = Number(await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n'));
   
    if (Number.isNaN(trial) || trial <= 0) {
      throw new Error('[ERROR] : 시도 횟수는 1 이상의 숫자여야 합니다.');
    }

    await Console.print(`실행 결과\n`);
    this.race(participations, trial);    
  }

  race(participations, trial){ 
    const racers = participations.split(',').map(name => {
      const trimmedName = name.trim();

      if (!trimmedName) 
        throw new Error('[ERROR] : 레이서 명이 0자여서는 안됩니다.');

      if (trimmedName.length > 5) 
        throw new Error('[ERROR] : 레이서 명이 5자 이하만 가능합니다.');
      
      if (/[^a-zA-Z가-힣]/.test(trimmedName)) 
        throw new Error('[ERROR] : 레이서 명은 문자만 가능하며 숫자/특수문자 불가');
      
      return { name: trimmedName, position: 0 };
    });
    
    for(let i = 0; i < trial; i++){
      this.forward(racers);
      this.printRound(racers);
    }    
    this.printWinners(racers);
  }

  forward(racers) {
  racers.forEach(racer => {
    const randomValue = Random.pickNumberInRange(0, 9);
    if (randomValue >= 4) racer.position++;
  });
  }


  printRound(racers){
    racers.forEach(racer => {
    Console.print(`${racer.name} : ${'-'.repeat(racer.position)}`);
    });
    Console.print('');
  }
  
  printWinners(racer){
    const maxPosition = Math.max(...racer.map((r) => r.position));
    const winners = racer.filter((r) => r.position === maxPosition).map((r) => r.name);
  
    if(winners.length === 1){
      Console.print(`최종 우승자 : ${winners[0]}`);
    } else{
      Console.print(`최종 우승자 : ${winners.join(', ')}`);
    }
  }
}

export default App;
