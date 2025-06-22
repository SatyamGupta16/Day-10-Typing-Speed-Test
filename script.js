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
  `JavaScript is a powerful and versatile programming language that plays a vital role in the modern digital world. It allows developers to create highly interactive and responsive user interfaces, making websites feel more alive and intuitive. Without needing to reload the page, JavaScript can dynamically update content, validate forms, animate elements, and handle real-time data — features that are essential for today’s web apps. Beyond the browser, JavaScript has grown through powerful environments like Node.js, enabling back-end development using the same language used on the front end. This unification means developers can write both client-side and server-side code seamlessly, improving workflow and maintainability. Frameworks and libraries such as React, Vue.js, and Angular have revolutionized how JavaScript is used, allowing developers to build robust applications with reusable components and modular architecture. Its ubiquity and flexibility make it a must-learn language for aspiring developers. Whether you’re a beginner or seasoned pro, JavaScript continues to evolve, offering endless possibilities for building the future.`
,

  `Programming is much like solving intricate puzzles, where each small piece of logic contributes to a larger, functioning system. Just as a puzzle requires patience and attention to detail, coding demands problem-solving skills, logical reasoning, and a methodical mindset. When you write code, you’re essentially communicating with a machine to perform tasks, build tools, or solve problems. Mistakes and bugs are inevitable in this journey, but they are not failures — they are learning moments. Debugging sharpens your understanding, encourages deeper exploration, and helps you develop better coding habits. With every error fixed, your confidence and capability grow. Each new concept or challenge builds on your existing knowledge, turning confusion into clarity. Programming also encourages creativity, as there are often multiple ways to solve the same problem. As you continue coding, you develop your own style, intuition, and approach. The process itself becomes rewarding, not just the end result. With dedication, anyone can master it.`
,

  `The internet runs on code — an invisible language that powers nearly every digital experience we interact with daily. From browsing websites to ordering food online or playing games, all of it is made possible through programming. At its core, code is a set of instructions that tells computers what to do. These instructions are written using languages such as HTML, CSS, JavaScript, Python, and many more. Each language serves a specific purpose, whether it’s styling a webpage, fetching data from a server, or handling user input. Learning to code teaches more than just technical skills; it cultivates logical thinking, attention to detail, and problem-solving abilities. It trains your brain to break complex problems into manageable steps and build efficient solutions. As you practice coding consistently, your confidence and understanding grow. The journey can be challenging, but the rewards are immense. The ability to create something meaningful from scratch is both empowering and transformative in today’s digital world.`
,

  `There will be moments of frustration during your coding journey — times when nothing seems to work, when error messages pile up, or when hours of effort yield no visible progress. These moments are difficult, but they are also vital. Every bug you face and every obstacle you overcome teaches you resilience. Solving complex problems builds a stronger, more patient mindset. Success in programming is not about never failing; it’s about never giving up. Each setback forces you to analyze, adapt, and learn — skills that apply far beyond code. The joy of finally fixing an issue after hours of trial and error is incredibly rewarding and boosts your confidence for future challenges. You are not just writing code — you are growing your ability to think critically, handle uncertainty, and persist through difficulty. Remember that even the most advanced programmers once struggled with basic syntax. Keep pushing forward, and you’ll be amazed at how far you can go.`
,

  `Web development includes HTML, CSS, and JavaScript — the core technologies that form the foundation of every modern website. HTML provides the basic structure, allowing developers to define elements such as headings, paragraphs, images, and links. CSS enhances this structure by adding style — fonts, colors, layouts, and animations that bring visual appeal to the page. JavaScript adds life to the site by making it interactive — enabling dropdowns, sliders, form validations, real-time updates, and much more. Together, these tools create rich and engaging user experiences. Learning web development means understanding how these technologies work together in harmony. It also means thinking like a user: What makes a website intuitive? What layout works best on mobile? What features enhance accessibility? As a developer, your job is to blend functionality with design to meet users' needs. With consistent practice, creativity, and problem-solving, you can turn simple ideas into powerful web applications that impact people around the world.`

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
