import Score from "./score.js";
import StateManager from "../util/stateManager.js";

class ScoreManager {
  registryList = []
  types = ["BadGuy","Hammer","Bat","Skeleton","Meat","Key","Movement","Thief","Diamond"];
  EOG = false; // End of Game
  leaderboard = [];

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
    // add leaderboard
    this.leaderboardRecover();

    // style based on game height
    const game = document.getElementById("game");
    scoreWrapper.style.minHeight = game.offsetHeight + "px";

    scoreWrapper.classList.add("show");
  }

  leaderboardRecover() {
    const savedLeaderboard = StateManager.loadState("leaderboard");
    if(savedLeaderboard) {
      for (const score of savedLeaderboard) {
        this.leaderboard.push(new Score(score.type,score.points));
      }
    }
    let name = "You"
    this.leaderboard.push(new Score(name,this.getFinalScore()));
    // top 9
    let sortedBoard = this.leaderboard.slice(0);
    sortedBoard.sort((a,b) => b.points - a.points);
    // get first 8 elements
    sortedBoard = sortedBoard.slice(0,9);

    let scoreElement = document.getElementById("score");
    let typeWrapper = document.createElement("div");
    let pointWrapper = document.createElement("div");
    // create header
    let typeElement = document.createElement("p");
    typeElement.innerHTML = "Top";
    typeElement.classList.add("header");
    let pointElement = document.createElement("p");
    pointElement.innerHTML = "8";
    pointElement.classList.add("header");
    typeWrapper.appendChild(typeElement);
    pointWrapper.appendChild(pointElement);

    // Add top 8 scores to list
    let playerIsOnTop = false;
    for (const score of sortedBoard) {
      let typeElement = document.createElement("p");
      typeElement.innerHTML = `${score.type}`;
      let pointElement = document.createElement("p");
      pointElement.innerHTML = `${score.points}`;
      if(score.type === name) { // identify player
        typeElement.classList.add("player");
        pointElement.classList.add("player");
        playerIsOnTop = true;
      }
      typeWrapper.appendChild(typeElement);
      pointWrapper.appendChild(pointElement);
    }
    // Show player score at the end if they're not on the top scores
    if(!playerIsOnTop) {
      let playerScoreEl = document.createElement("p");
      playerScoreEl.classList.add("player");
      playerScoreEl.innerHTML = name;
      let finalScore = document.createElement("p");
      finalScore.classList.add("player");
      finalScore.innerHTML = `${this.getFinalScore()}`;
      typeWrapper.appendChild(playerScoreEl);
      pointWrapper.appendChild(finalScore);
    }
    scoreElement.append(typeWrapper,pointWrapper);

    const leaderboardLength = this.leaderboard.length;
    // Assign correct name to add to leaderboard file
    name = `game${leaderboardLength}`
    this.leaderboard[leaderboardLength - 1].type = name;
    StateManager.saveState(this.leaderboard,"leaderboard");
  }
}

export default ScoreManager;