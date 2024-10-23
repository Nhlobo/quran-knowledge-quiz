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

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const instructionsEl = document.getElementById("instructions");
const quizEl = document.getElementById("quiz");

startBtn.addEventListener("click", () => {
    instructionsEl.style.display = "none";
    quizEl.style.display = "block";
    loadQuiz();
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
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            disableAnswers();
            submitBtn.disabled = false;
        } else {
            timeLeft--;
        }
    }, 1000);
}

function resetState() {
    enableAnswers();
    submitBtn.disabled = true;
    resultEl.innerHTML = '';
}

function getSelected() {
    let selectedAnswer = null;
    answerEls.forEach((answerEl, index) => {
        if (answerEl.classList.contains("selected")) {
            if (index === 0) selectedAnswer = "a";
            else if (index === 1) selectedAnswer = "b";
            else if (index === 2) selectedAnswer = "c";
            else if (index === 3) selectedAnswer = "d";
        }
    });
    return selectedAnswer;
}

function enableAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.classList.remove("selected");
        answerEl.disabled = false;
    });
}

function disableAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.disabled = true;
    });
}

answerEls.forEach(answerEl => {
    answerEl.addEventListener("click", () => {
        answerEls.forEach(el => el.classList.remove("selected"));
        answerEl.classList.add("selected");
        submitBtn.disabled = false;
    });
});

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    clearInterval(timer);
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            resultEl.innerHTML = `You answered ${score}/${quizData.length} questions correctly.`;
            submitBtn.style.display = "none";
        }
    }
});
