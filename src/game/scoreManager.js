import Score from "./score.js";
class ScoreManager {
  registryList = []
  types = ["BadGuy","Hammer","Bat","Skeleton","Meat","Key","Movement","Thief","Diamond"];
  EOG = false; // End of Game

  static #instance;
  static getInstance() {
    if(ScoreManager.#instance === undefined) {
      ScoreManager.#instance = new ScoreManager();
    }
    return ScoreManager.#instance;
  }
  constructor() {
  }

  addRecord(type, points) {
    const isRecognised = this.types.indexOf(type);
    if(isRecognised > -1) {
      if(points !== 0) {
        const score = new Score( type, points);
        this.registryList.push(score);
      }
    } else throw new TypeError("Record type not recognised.");
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
    const scorePoints = scoresOfType.map((score) => score.points);
    return scorePoints.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  toString() {
    let s = "";
    for (const type of this.types) {
      s += `${type} - ${this.sumByType(type)}\n`;
    }
    s += `Final Score: ${this.getFinalScore()}`;
    return s;
  }

  toJSON() {
    return {
      registryList: this.registryList
    }
  }

  endOfGame() {
    this.EOG = true;
    let scoreWrapper = document.getElementById("score-wrapper");
    let scoreElement = document.getElementById("score");
    let typeWrapper = document.createElement("div");
    let pointWrapper = document.createElement("div");
    for (const type of this.types) {
      let typeElement = document.createElement("p");
      typeElement.innerHTML = `${type}`;
      let pointElement = document.createElement("p");
      pointElement.innerHTML = `${this.sumByType(type)}`;
      typeWrapper.appendChild(typeElement);
      pointWrapper.appendChild(pointElement);
    }
    let finalScoreEl = document.createElement("p");
    finalScoreEl.classList.add("finalScore");
    finalScoreEl.innerHTML = "Final Score";
    let finalScore = document.createElement("p");
    finalScore.classList.add("finalScore");
    finalScore.innerHTML = `${this.getFinalScore()}`;
    typeWrapper.appendChild(finalScoreEl);
    pointWrapper.appendChild(finalScore);
    scoreElement.append(typeWrapper,pointWrapper);
    // style based on game height
    const game = document.getElementById("game");
    scoreWrapper.style.minHeight = game.offsetHeight + "px";

    scoreWrapper.classList.add("show");
  }
}

export default ScoreManager;