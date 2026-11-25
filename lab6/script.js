// 1. Questions Array: Stores questions, possible options, and the correct answer
const questions = [
    {
        question: "Which HTML tag is used to define semantic navigation links?",
        options: ["<navigate>", "<nav>", "<links>", "<section>"],
        answer: "<nav>"
    },
    {
        question: "Which CSS property controls the space inside an element's border?",
        options: ["margin", "spacing", "padding", "border-gap"],
        answer: "padding"
    },
    {
        question: "Which JavaScript method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "append()"],
        answer: "push()"
    },
    {
        question: "What does DOM stand for in web development?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Ordinance Model",
            "Desktop Oriented Mode"
        ],
        answer: "Document Object Model"
    },
    {
        question: "Which CSS layout module is best suited for two-dimensional rows and columns?",
        options: ["Flexbox", "Float", "CSS Grid", "Inline-Block"],
        answer: "CSS Grid"
    }
];

// State variables
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timerInterval = null;
const TIME_LIMIT = 15;
let timeLeft = TIME_LIMIT;
let isAnswered = false;

// DOM Elements
const questionProgressEl = document.getElementById("question-progress");
const timerBoxEl = document.getElementById("timer-box");
const timerEl = document.getElementById("timer");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackSectionEl = document.getElementById("feedback-section");
const feedbackTextEl = document.getElementById("feedback-text");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplayEl = document.getElementById("score-display");

// 2. shuffleQuestions(): Randomly shuffles the questions array (Fisher-Yates algorithm)
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// 3. startTimer(): Sets a countdown timer for answering each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIME_LIMIT;
    timerEl.textContent = timeLeft;
    timerBoxEl.classList.remove("urgent");

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 5) {
            timerBoxEl.classList.add("urgent");
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

// Handles behavior when the timer hits 0 before submission
function handleTimeOut() {
    if (isAnswered) return;
    isAnswered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainerEl.querySelectorAll(".option-btn");

    optionButtons.forEach((btn) => {
        btn.disabled = true;
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add("correct");
        }
    });

    feedbackSectionEl.className = "incorrect-feedback";
    feedbackTextEl.textContent = `Time's up! The correct answer was: ${currentQuestion.answer}`;
    feedbackSectionEl.classList.remove("hidden");

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 4. displayQuestion(): Displays the current question and answer options
function displayQuestion() {
    isAnswered = false;
    selectedOption = null;

    // Reset UI states
    feedbackSectionEl.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    submitBtn.disabled = true;
    nextBtn.classList.add("hidden");
    optionsContainerEl.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];
    questionProgressEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionTextEl.textContent = currentQuestion.question;

    // Create buttons for each option
    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            if (isAnswered) return;

            // Highlight selected option
            const allButtons = optionsContainerEl.querySelectorAll(".option-btn");
            allButtons.forEach((btn) => btn.classList.remove("selected"));
            button.classList.add("selected");

            selectedOption = option;
            submitBtn.disabled = false;
        });

        optionsContainerEl.appendChild(button);
    });
}

// 5. checkAnswer(): Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    if (!selectedOption || isAnswered) return;

    isAnswered = true;
    clearInterval(timerInterval);

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainerEl.querySelectorAll(".option-btn");

    optionButtons.forEach((btn) => {
        btn.disabled = true;
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add("correct");
        } else if (btn.textContent === selectedOption) {
            btn.classList.add("incorrect");
        }
    });

    if (selectedOption === currentQuestion.answer) {
        score++;
        feedbackSectionEl.className = "correct-feedback";
        feedbackTextEl.textContent = "Correct! Well done.";
    } else {
        feedbackSectionEl.className = "incorrect-feedback";
        feedbackTextEl.textContent = `Incorrect! The correct answer is: ${currentQuestion.answer}`;
    }

    feedbackSectionEl.classList.remove("hidden");
    scoreDisplayEl.textContent = `Current Score: ${score} / ${questions.length}`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 6. nextQuestion(): Moves to the next question, resetting the timer and updating the score
function nextQuestion() {
    currentQuestionIndex++;
    scoreDisplayEl.textContent = `Current Score: ${score} / ${questions.length}`;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

// Displays final quiz completion screen
function endQuiz() {
    clearInterval(timerInterval);
    questionProgressEl.textContent = "Quiz Completed!";
    timerBoxEl.classList.add("hidden");
    questionTextEl.textContent = `You finished the quiz! Your final score is ${score} out of ${questions.length}.`;
    optionsContainerEl.innerHTML = "";
    feedbackSectionEl.classList.add("hidden");
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    scoreDisplayEl.textContent = `Final Score: ${score} / ${questions.length}`;
}

// 7. startQuiz(): Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timerBoxEl.classList.remove("hidden");
    restartBtn.classList.add("hidden");
    scoreDisplayEl.textContent = `Current Score: 0 / ${questions.length}`;

    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Event Listeners
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

// Initialize quiz on page load
startQuiz();