const questions = [
    {
        question: "Which is the largest animal in the world?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Tiger", correct: false },
            { text: "Whale", correct: true },
            { text: "Elephant", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answer: [
            { text: "Vatican City", correct: true },
            { text: "India", correct: false },
            { text: "Japan", correct: false },
            { text: "Georgia", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answer: [
            { text: "Kalahari", correct: false },
            { text: "Sahara", correct: false },
            { text: "Gobi", correct: false },
            { text: "Antarctica", correct: true }, // Fixed answer (Antarctica is the largest)
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answer: [
            { text: "Europe", correct: false },
            { text: "Antarctica", correct: false },
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerElement.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectionBtn = e.target;
    const isCorrect = selectionBtn.dataset.correct === "true";

    if (isCorrect) {
        selectionBtn.classList.add("correct");
        score++;
    } else {
        selectionBtn.classList.add("incorrect");
    }

    Array.from(answerElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
