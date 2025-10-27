// src/App.js
import { Console, Random } from "@woowacourse/mission-utils";
import { ERROR } from '../constants/error.js';
import { MESSAGE } from '../constants/message.js';

class App {
  async run() {
    const participations = await Console.readLineAsync(MESSAGE.INPUT_CAR_NAMES);
    const trial = Number(await Console.readLineAsync(MESSAGE.INPUT_TRIALS));

    if (Number.isNaN(trial) || trial <= 0) {
      throw new Error(ERROR.INVALID_TRIAL_NUMBER);
    }

    await Console.print(MESSAGE.EXECUTION_RESULT);
    this.race(participations, trial);    
  }

  race(participations, trial) { 
    const names = participations.split(',').map(name => name.trim());
    const nameSet = new Set(names);

    if (names.length !== nameSet.size) {
      throw new Error(ERROR.NAME_DUPLICATION);
    }

    const racers = names.map(name => {
      if (!name) throw new Error(ERROR.EMPTY_NAME);
      if (name.length > 5) throw new Error(ERROR.NAME_TOO_LONG);
      if (/[^a-zA-Z가-힣]/.test(name)) throw new Error(ERROR.TEXT_ONLY);
      
      return { name, position: 0 };
    });
    
    for (let i = 0; i < trial; i++) {
      this.forward(racers);
      this.printRound(racers);
    }    

    this.printWinners(racers);
/*  this.printRanking(racers); */
  }

  forward(racers) {
    racers.forEach(racer => {
      const randomValue = Random.pickNumberInRange(0, 9);
      if (randomValue >= 4) racer.position++;
    });
  }

  printRound(racers) {
    racers.forEach(racer => {
      Console.print(MESSAGE.ROUND_OUTPUT(racer.name, racer.position));
    });
    Console.print('');
  }
  
  printWinners(racers) {
    const maxPosition = Math.max(...racers.map(r => r.position));
    const winners = racers.filter(r => r.position === maxPosition).map(r => r.name);
  
    if (winners.length === 1) {
      Console.print(MESSAGE.WINNER_SINGLE(winners[0]));
    } else {
      Console.print(MESSAGE.WINNER_MULTIPLE(winners));
    }
  }

  /* printRanking(racers) {
    Console.print(MESSAGE.RANKING_TITLE);

    let prevPosition = null;
    let rank = 0;
    let sameRankCount = 0;

    const sorted = [...racers].sort((a, b) => b.position - a.position);
    sorted.forEach(r => {
      if (r.position !== prevPosition) {
        rank += 1 + sameRankCount;
        sameRankCount = 0;
      } else {
        sameRankCount++;
      }
      prevPosition = r.position;
      Console.print(`${rank}위: ${r.name}`);
    });
  } */
}

export default App;
