const questions = [
    {
        question: "What is the first word revealed in the Quran?",
        answers: ["Iqra", "Bismillah", "Alhamdulillah", "Subhanallah"],
        correct: 0
    },
    {
        question: "How many chapters are there in the Quran?",
        answers: ["114", "120", "100", "150"],
        correct: 0
    },
    {
        question: "Who is the last prophet in Islam?",
        answers: ["Moses", "Jesus", "Muhammad", "Abraham"],
        correct: 2
    },
    {
        question: "In which month was the Quran revealed?",
        answers: ["Ramadan", "Shawwal", "Safar", "Dhu al-Hijjah"],
        correct: 0
    },
    {
        question: "Which surah is known as the 'Heart of the Quran'?",
        answers: ["Al-Fatiha", "Al-Baqarah", "Yasin", "An-Nisa"],
        correct: 2
    },
    {
        question: "What is the longest surah in the Quran?",
        answers: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah"],
        correct: 0
    },
    {
        question: "Which companion compiled the Quran after the death of the Prophet Muhammad?",
        answers: ["Ali", "Abu Bakr", "Umar", "Uthman"],
        correct: 1
    },
    {
        question: "What does 'Quran' mean?",
        answers: ["The Book", "Recitation", "Guidance", "Light"],
        correct: 1
    },
    {
        question: "How many times is the phrase 'Bismillah' mentioned in the Quran?",
        answers: ["114", "99", "1", "7"],
        correct: 0
    },
    {
        question: "What is the significance of the Quran in Islam?",
        answers: ["It is a historical document", "It is a guide for life", "It is a collection of poems", "It is a storybook"],
        correct: 1
    },
    {
        question: "Which surah is recited in every unit of the Muslim prayer?",
        answers: ["Al-Fatiha", "Al-Baqarah", "Al-Ikhlas", "Al-Nas"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 15; // 15 seconds for each question

const instructions = document.getElementById("instructions");
const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");
const timerElement = document.getElementById("timer");

document.getElementById("start-btn").addEventListener("click", startQuiz);

answerButtons.forEach((button, index) => {
    button.addEventListener("click", () => selectAnswer(index));
});

submitButton.addEventListener("click", () => {
    clearInterval(timer);
    nextQuestion();
});

function startQuiz() {
    instructions.style.display = "none";
    quizContainer.style.display = "block";
    score = 0;
    currentQuestionIndex = 0;
    nextQuestion();
}

function nextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        currentQuestion.answers.forEach((answer, index) => {
            answerButtons[index].textContent = answer;
            answerButtons[index].disabled = false;
            answerButtons[index].classList.remove("correct", "incorrect");
        });
        submitButton.disabled = true;

        startTimer();
    } else {
        endQuiz();
    }
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;
    const selectedButton = answerButtons[selectedIndex];

    if (selectedIndex === correctIndex) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
        answerButtons[correctIndex].classList.add("correct"); // Show correct answer
    }

    // Disable all buttons after selection
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    submitButton.disabled = false; // Enable submit button
    clearInterval(timer); // Clear timer when answer is selected
}

function startTimer() {
    let timeLeft = timeLimit;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    const correctIndex = questions[currentQuestionIndex].correct;
    answerButtons.forEach((button, index) => {
        button.disabled = true; // Disable all buttons
        if (index === correctIndex) {
            button.classList.add("correct"); // Show correct answer
        } else {
            button.classList.add("incorrect"); // Mark incorrect
        }
    });
    submitButton.disabled = false; // Enable submit button to move to next question
    nextQuestion(); // Move to the next question automatically
}

function resetState() {
    resultElement.textContent = ""; // Clear previous results
    timerElement.textContent = ""; // Clear timer display
}

function endQuiz() {
    quizContainer.style.display = "none";
    instructions.style.display = "block";
    displayResults();
}

function displayResults() {
    resultElement.innerHTML = `You scored ${score} out of ${questions.length}.<br>`;
    
    // Display correct and incorrect answers
    questions.forEach((question, index) => {
        const status = index < score ? "correct" : "incorrect";
        const color = status === "correct" ? "green" : "red";
        resultElement.innerHTML += `<p style="color: ${color};">${question.question} - Correct answer: ${question.answers[question.correct]}</p>`;
    });

    if (score > 5) {
        resultElement.innerHTML += "<p>Congratulations! You did great!</p>";
    } else {
        resultElement.innerHTML += "<p>Keep trying! You can do better!</p>";
    }

    // Add Try Again button
    const tryAgainButton = document.createElement("button");
    tryAgainButton.textContent = "Try Again";
    tryAgainButton.addEventListener("click", startQuiz);
    resultElement.appendChild(tryAgainButton);
    }
