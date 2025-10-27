import { Console, Random } from "@woowacourse/mission-utils";
import { ERROR } from '../constants/error.js';

class App {
  async run() {
    const participations = await Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n');
    const trial = Number(await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n'));
   
    if (Number.isNaN(trial) || trial <= 0) {
      throw new Error(ERROR.INVALID_TRIAL_NUMBER);
    }

    await Console.print(`실행 결과\n`);
    this.race(participations, trial);    
  }

  race(participations, trial) { 
    const names = participations.split(',').map(name => name.trim());

    const racers = names.map(name => {
      if (!name) 
        throw new Error(ERROR.EMPTY_NAME);

      if (name.length > 5) 
        throw new Error(ERROR.NAME_TOO_LONG);
      
      if (/[^a-zA-Z가-힣]/.test(name)) 
        throw new Error(ERROR.TEXT_ONLY);
      
      return { name, position: 0 };
    });

    const nameSet = new Set(names);
    if (names.length !== nameSet.size) {
      throw new Error(ERROR.NAME_DUPLICATION);
    }

    for (let i = 0; i < trial; i++) {
      this.forward(racers);
      this.printRound(racers);
    }    

    this.printWinners(racers);
    this.printRanking(racers);
  }

  forward(racers) {
    racers.forEach(racer => {
      const randomValue = Random.pickNumberInRange(0, 9);
      if (randomValue >= 4) racer.position++;
    });
  }

  printRound(racers) {
    racers.forEach(racer => {
      Console.print(`${racer.name} : ${'-'.repeat(racer.position)}`);
    });
    Console.print('');
  }
  
  printWinners(racer) {
    const maxPosition = Math.max(...racer.map(r => r.position));
    const winners = racer.filter(r => r.position === maxPosition).map(r => r.name);
  
    if (winners.length === 1) {
      Console.print(`최종 우승자 : ${winners[0]}`);
    } else {
      Console.print(`최종 우승자 : ${winners.join(', ')}`);
    }
  }

  // 전체 순위표 출력 함수
  printRanking(racers) {
    Console.print('\n--- 전체 순위표 ---');
    const sorted = [...racers].sort((a, b) => b.position - a.position);
    
    let currentRank = 1;
    // 이전 레이서 포지션
    let prevPosition = null;
    let sameRankCount = 0;
    
    sorted.forEach((r, idx) => {
      if (r.position === prevPosition) {
        sameRankCount++;
      } else {
        currentRank += sameRankCount;
        sameRankCount = 1;
      }
      Console.print(`${currentRank}위: ${r.name}`);
      prevPosition = r.position;
    });
  }
 }

export default App;