
const questions = [
  { q: "What is the main benefit of ZK proofs?", a: "privacy" },
  { q: "Succinct is focused on scaling which blockchain?", a: "ethereum" },
  { q: "What does L2 stand for?", a: "layer 2" },
  { q: "Name one ZK-rollup project", a: "scroll" },
  { q: "What does L1 stand for?", a: "layer 1" }
];

let current = 0, score = 0, lives = 3, timeLeft = 10, timer, username = "";

function startGame() {
  username = document.getElementById("username").value;
  if (!username) return alert("Please enter your X username!");
  document.querySelector(".username-input").style.display = "none";
  document.querySelector(".game").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  if (lives <= 0 || current >= questions.length) return endGame();

  document.getElementById("question").innerText = questions[current].q;
  document.getElementById("answerInput").value = "";
  timeLeft = 10;
  document.getElementById("timer").innerText = "Time: 10";
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleAnswer(false);
    }
  }, 1000);
}

function handleKey(e) {
  if (e.key === "Enter") {
    checkAnswer();
  }
}

function checkAnswer() {
  clearInterval(timer);
  const input = document.getElementById("answerInput").value.trim().toLowerCase();
  const correct = questions[current].a;
  const isCorrect = input === correct;
  handleAnswer(isCorrect);
}

function handleAnswer(correct) {
  const feedback = document.getElementById("feedback");
  if (correct) {
    score += 10;
    playSound("correct");
    feedback.innerText = "Correct!";
  } else {
    lives -= 1;
    playSound("wrong");
    feedback.innerText = "Wrong! Correct answer: " + questions[current].a;
  }
  document.getElementById("score").innerText = "Score: " + score;
  document.getElementById("lives").innerText = "Lives: " + lives;
  current++;
  setTimeout(loadQuestion, 1500);
}

function endGame() {
  document.querySelector(".game").style.display = "none";
  playSound("congrats");
  const board = document.getElementById("leaderboard");
  board.style.display = "block";
  board.innerHTML = "<h2>Game Over</h2><p>Username: " + username + "<br>Score: " + score + "</p>";
}

function playSound(type) {
  const audio = new Audio("assets/" + type + ".mp3");
  audio.play();
}
