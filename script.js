const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const progressBar = document.getElementById("progress");
const textDisplay = document.getElementById("text-to-type");
const resultBox = document.getElementById("result");
const finalWpmDisplay = document.getElementById("final-wpm");
const quoteDisplay = document.getElementById("quote");

let sentences = [];
let currentBatch = 0;
let timeLeft = 60;
let timer;
let timerStarted = false;

const paragraphs = [
  `JavaScript is a powerful and versatile programming language that plays a vital role in the modern digital world. It is widely used by developers to build dynamic and interactive web applications. Whether it’s creating animations, validating forms, or building complex web components, JavaScript makes it all possible.`,

  `Programming is much like solving intricate puzzles. Every line of code is part of a bigger picture. Mistakes help you learn more effectively. With every bug, you become a better developer. Keep coding and keep growing.`,

  `The internet runs on code. Websites, apps, and games all use programming languages. Learning to code is like learning to think logically. Practice daily to master your skills. Don’t give up when things get tough.`,

  `There will be moments of frustration, but don’t give up when things get tough. Every bug fixed and challenge overcome brings you one step closer to mastery. Keep going — the future is being written in code.`,

  `Web development includes HTML, CSS, and JavaScript. HTML gives structure, CSS adds style, and JavaScript adds interactivity. Together they form the core of every modern website. Becoming a web developer requires creativity and logic.`
];

const quotes = [
  "Speed is useful only if you're running in the right direction.",
  "Practice makes progress, not perfection!",
  "Every pro was once an amateur.",
  "Fast fingers, sharp mind!",
  "You're not just typing — you're growing.",
  "Keep pushing. You’re better than yesterday."
];

function getRandomParagraph() {
  const random = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[random];
}

function showNextBatch() {
  const batch = sentences.slice(currentBatch, currentBatch + 4).join(" ");
  textDisplay.textContent = batch;
  input.value = "";
  input.disabled = false;
  input.focus();
  currentBatch += 4;
}

input.addEventListener("input", () => {
  if (!timerStarted) {
    timerStarted = true;
    timer = setInterval(updateTimer, 1000);
  }

  const typedText = input.value;
  const targetText = textDisplay.textContent;
  const wordsTyped = typedText.trim().split(/\s+/).filter(Boolean).length;
  const timeUsed = 60 - timeLeft;
  const wpm = timeUsed > 0 ? Math.round((wordsTyped / timeUsed) * 60) : 0;

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) {
      correctChars++;
    }
  }

  const accuracy = typedText.length > 0
    ? Math.round((correctChars / typedText.length) * 100)
    : 0;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy;

  if (typedText.trim() === targetText.trim()) {
    if (currentBatch < sentences.length) {
      showNextBatch();
    } else {
      clearInterval(timer);
      input.disabled = true;
      alert("🎉 Great job! You’ve completed all sentences.");
    }
  }
});

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    progressBar.style.width = `${(timeLeft / 60) * 100}%`;
  } else {
    clearInterval(timer);
    input.disabled = true;
  }
}

function resetTest() {
  clearInterval(timer);
  timerStarted = false;
  timeLeft = 60;
  input.disabled = false;
  input.value = "";
  timeDisplay.textContent = 60;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;
  progressBar.style.width = "100%";
  resultBox.style.display = "none";

  sentences = getRandomParagraph().match(/[^.!?]+[.!?]+/g);
  currentBatch = 0;
  showNextBatch();
}

function submitTest() {
  clearInterval(timer);
  input.disabled = true;

  finalWpmDisplay.textContent = wpmDisplay.textContent;
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = `"${randomQuote}"`;

  resultBox.style.display = "block";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

// Initial load
sentences = getRandomParagraph().match(/[^.!?]+[.!?]+/g);
showNextBatch();
