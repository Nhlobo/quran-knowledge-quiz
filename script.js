const quizData = [
    { question: "How many Surahs are there in the Quran?", a: "114", b: "120", c: "108", d: "116", correct: "a" },
    { question: "Which Surah is known as the heart of the Quran?", a: "Surah Al-Baqarah", b: "Surah Yasin", c: "Surah Al-Fatiha", d: "Surah Al-Ikhlas", correct: "b" },
    { question: "In which city was the Quran revealed?", a: "Medina", b: "Jerusalem", c: "Mecca", d: "Cairo", correct: "c" },
    { question: "How many Ayahs are there in the longest Surah?", a: "286", b: "200", c: "255", d: "300", correct: "a" },
    { question: "Which Surah is also called 'The Opening'?", a: "Surah Al-Baqarah", b: "Surah Yasin", c: "Surah Al-Fatiha", d: "Surah Al-Ikhlas", correct: "c" },
    { question: "What is the meaning of the word 'Quran'?", a: "The Reading", b: "The Guidance", c: "The Light", d: "The Truth", correct: "a" },
    { question: "Which Surah was revealed completely at once?", a: "Surah Yasin", b: "Surah Al-Fatiha", c: "Surah Al-Baqarah", d: "Surah Al-Anfal", correct: "b" },
    { question: "What is the first word of the Quran?", a: "Bismillah", b: "Iqra", c: "Alhamdulillah", d: "Subhanallah", correct: "b" },
    { question: "How many Ayahs are there in Surah Al-Fatiha?", a: "7", b: "6", c: "8", d: "5", correct: "a" },
    { question: "Which angel revealed the Quran to Prophet Muhammad (PBUH)?", a: "Angel Israfil", b: "Angel Jibreel", c: "Angel Mika'il", d: "Angel Azrael", correct: "b" }
];

let currentQuiz = 0;
let score = 0;
let timer;
let timeLeft = 15;
let userAnswers = [];

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const instructionsEl = document.getElementById("instructions");
const quizEl = document.getElementById("quiz");
const timerEl = document.createElement("div");

timerEl.id = "timer";
quizEl.prepend(timerEl);

// Create "Try Again" button
const tryAgainBtn = document.createElement("button");
tryAgainBtn.innerText = "Try Again";
tryAgainBtn.id = "try-again-btn";
tryAgainBtn.style.position = "fixed";
tryAgainBtn.style.bottom = "10px";
tryAgainBtn.style.left = "10px";
tryAgainBtn.style.display = "none";
document.body.appendChild(tryAgainBtn);

startBtn.addEventListener("click", () => {
    instructionsEl.style.display = "none"; // Hides the instructions
    quizEl.style.display = "block"; // Shows the quiz
    loadQuiz(); // Loads the first question
});

tryAgainBtn.addEventListener("click", () => {
    resetQuiz();
    tryAgainBtn.style.display = "none";
});

function loadQuiz() {
    resetState();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    answerEls[0].innerText = currentQuizData.a;
    answerEls[1].innerText = currentQuizData.b;
    answerEls[2].innerText = currentQuizData.c;
    answerEls[3].innerText = currentQuizData.d;
    startTimer();
}

function startTimer() {
    timeLeft = 15;
    timerEl.innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    userAnswers[currentQuiz] = null; // Record no answer for this question
    disableAnswers(); // Disable answer buttons
    submitBtn.disabled = true; // Disable submit button
    timerEl.innerText = "Time's up!";
    
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        setTimeout(() => {
            loadQuiz();
        }, 2000); // Delay before loading next question
    } else {
        setTimeout(() => {
            showResults();
        }, 2000); // Delay before showing results
    }
}

function resetState() {
    answerEls.forEach(el => el.classList.remove("selected"));
    enableAnswers();
    submitBtn.disabled = true; // Disable until an answer is selected
    resultEl.innerHTML = '';
    timerEl.innerText = "";
}

answerEls.forEach((answerEl) => {
    answerEl.addEventListener("click", () => {
        answerEls.forEach(el => el.classList.remove("selected"));
        answerEl.classList.add("selected");
        submitBtn.disabled = false; // Enable button once an answer is selected
    });
});

submitBtn.addEventListener("click", () => {
    const selectedAnswer = getSelected();
    if (!selectedAnswer) return; // Ensure an answer is selected

    userAnswers[currentQuiz] = selectedAnswer;
    if (selectedAnswer === quizData[currentQuiz].correct) {
        score++;
    }
    clearInterval(timer); // Clear timer when submitting

    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
});

function getSelected() {
    let selectedAnswer = null;
    answerEls.forEach((answerEl, index) => {
        if (answerEl.classList.contains("selected")) {
            selectedAnswer = ["a", "b", "c", "d"][index];
        }
    });
    return selectedAnswer;
}

function showResults() {
    quizEl.innerHTML = `<h2>Your score is ${score}/${quizData.length}</h2>`;
    
    if (score < 5) {
        tryAgainBtn.style.backgroundColor = "red";
    } else if (score >= 5 && score < 8) {
        tryAgainBtn.style.backgroundColor = "orange";
    } else {
        tryAgainBtn.style.backgroundColor = "green";
    }

    if (score === quizData.length) {
        const message = document.createElement("p");
        message.innerText = "Congratulations! You got a perfect score!";
        quizEl.appendChild(message);
    }

    tryAgainBtn.style.display = "block"; // Show the try again button
}

function enableAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.disabled = false; // Enable all answer buttons
    });
}

function disableAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.disabled = true; // Disable all answer buttons
    });
}

function resetQuiz() {
    currentQuiz = 0; // Reset the current quiz index
    score = 0; // Reset the score
    userAnswers = []; // Clear user answers
    instructionsEl.style.display = "block"; // Show instructions again
    quizEl.style.display = "none"; // Hide quiz
    resultEl.innerHTML = ''; // Clear previous results
    timerEl.innerText = ""; // Clear timer
    tryAgainBtn.style.display = "none"; // Hide the try again button
}
