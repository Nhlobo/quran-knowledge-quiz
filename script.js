const questions = [
    {
        question: "What is the first chapter of the Quran?",
        answers: ["Al-Fatiha", "Al-Baqarah", "An-Nas", "Al-Ikhlas"],
        correct: 0
    },
    {
        question: "How many chapters (Surahs) are in the Quran?",
        answers: ["114", "100", "30", "99"],
        correct: 0
    },
    {
        question: "Which Surah is known as the heart of the Quran?",
        answers: ["Al-Baqarah", "Yasin", "Al-Fatiha", "Al-Ikhlas"],
        correct: 1
    },
    {
        question: "What does 'Quran' mean?",
        answers: ["Recitation", "Book", "Guidance", "Prayer"],
        correct: 0
    },
    {
        question: "Which Surah was revealed in Medina?",
        answers: ["Al-Fatiha", "Al-Baqarah", "Al-Ma'idah", "An-Nas"],
        correct: 2
    },
    {
        question: "What is the main theme of the Quran?",
        answers: ["Unity of God", "Prophet's Life", "History of Israel", "Science"],
        correct: 0
    },
    {
        question: "How many times is the word 'Allah' mentioned in the Quran?",
        answers: ["500", "1000", "2699", "2000"],
        correct: 2
    },
    {
        question: "Which prophet is mentioned most in the Quran?",
        answers: ["Moses", "Jesus", "Muhammad", "Noah"],
        correct: 0
    },
    {
        question: "What is the language of the Quran?",
        answers: ["Arabic", "English", "Hebrew", "Persian"],
        correct: 0
    },
    {
        question: "Which Surah is the longest in the Quran?",
        answers: ["Al-Baqarah", "Al-Ikhlas", "An-Nas", "Al-Fatiha"],
        correct: 0
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const totalTime = 15;

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('submit').addEventListener('click', submitAnswer);

function startQuiz() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    score = 0;
    currentQuestionIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    resetTimer();
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const answerButtons = document.querySelectorAll('.answer');
    answerButtons.forEach((button, index) => {
        button.innerText = currentQuestion.answers[index];
        button.onclick = () => selectAnswer(index);
        button.classList.remove('correct', 'incorrect'); // Clear previous classes
    });
    document.getElementById('submit').disabled = true; // Disable submit button until an answer is selected
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer');

    // Highlight selected answer
    answerButtons[selectedIndex].classList.add('selected');

    // Allow submission only if an answer is selected
    document.getElementById('submit').disabled = false;

    // Disable all answer buttons once selected
    answerButtons.forEach(button => {
        button.disabled = true; // Disable all buttons after an answer is selected
    });
}

function submitAnswer() {
    const selectedAnswerIndex = Array.from(document.querySelectorAll('.answer'))
        .findIndex(button => button.classList.contains('selected'));

    const currentQuestion = questions[currentQuestionIndex];

    // Check if the selected answer is correct
    if (selectedAnswerIndex === currentQuestion.correct) {
        score++;
        document.querySelectorAll('.answer')[selectedAnswerIndex].classList.add('correct');
    } else {
        document.querySelectorAll('.answer')[selectedAnswerIndex].classList.add('incorrect');
        document.querySelectorAll('.answer')[currentQuestion.correct].classList.add('correct'); // Show the correct answer
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Load the next question
    } else {
        showResults(); // Show results after the last question
    }
}

function showResults() {
    clearTimeout(timer);
    document.getElementById('quiz').style.display = 'none';
    const resultContainer = document.getElementById('result');
    
    // Display the user's score
    resultContainer.innerHTML = `
        <h2>Your Score: ${score}/${questions.length}</h2>
        <div style="color: ${score >= 5 ? 'green' : 'red'};">
            ${score >= 5 ? 'Congratulations!' : 'Try again!'}
        </div>
        <h3>Results:</h3>
    `;
    
    questions.forEach((q, index) => {
        resultContainer.innerHTML += `
            <div>${index + 1}. ${q.question}<br>
            Your answer: <span class="${q.correct === 0 ? 'correct' : 'incorrect'}">${q.answers[q.correct]}</span></div>
        `;
    });
    
    // Add a button to restart the quiz
    resultContainer.innerHTML += '<button id="restart-btn">Restart Quiz</button>';
    resultContainer.style.display = 'block';
    
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
}

function restartQuiz() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
}

function resetTimer() {
    let timeLeft = totalTime;
    document.getElementById('timer').innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer(); // Automatically submit when time runs out
        }
    }, 1000);
    }
