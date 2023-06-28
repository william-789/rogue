import Score from "./score.js";
class ScoreManager {
  registryList = []
  types = ["BadGuy","Hammer","Bat","Skeleton","Meat","Key","Movement"];
  constructor() {
  }

  addRecord(description, points, type) {
    if(points !== 0) {
      const score = new Score(description,points, type);
      this.registryList.push(score);
    }
  }

  getFinalScore() {
    let finalScore = 0;
    for(const record of this.registryList) {
      finalScore += record.points;
    }
    if(finalScore < 0) finalScore = 0;
    return finalScore;
  }

  sumByType(type) {
    const scoresOfType = this.registryList.filter((score) => score.type === type);
    return scoresOfType.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  toString() {
    let s = "";
    for (const type of this.types) {
      s += `${type} - ${this.sumByType(type)}\n`;
    }
    s += `Final Score: ${this.getFinalScore()}`;
    return s;
  }
}

export default ScoreManager;