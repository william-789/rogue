import Score from "./score.js";
class ScoreManager {
  registerList = []
  constructor() {
  }

  addRegister(description, points) {
    if(points !== 0) {
      const score = new Score(description,points);
      this.registerList.push(score);
    }
  }

  getFinalScore() {
    let finalScore = 0;
    for(const register of this.registerList) {
      finalScore += register.points;
    }
    if(finalScore < 0) finalScore = 0;
    return finalScore;
  }

  toString() {
    let s = "";
    for (const register of this.registerList) {
      s += `${register.description} - ${register.points}\n`;
    }
    s += `Final Score: ${this.getFinalScore()}`;
    return s;
  }
}

export default ScoreManager;