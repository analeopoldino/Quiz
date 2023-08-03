// JavaScript
const $startGameButton = document.querySelector(".start-quiz");
const $questionsConteiner = document.querySelector(".questions-conteiner");
const $answersConteiner = document.querySelector(".answers-conteiner");
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion)

let currentQuestionIndex = 0
let totalCorrect = 0

function startGame() {
    $startGameButton.classList.add("hide");
    $questionsConteiner.classList.remove("hide");
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if (questions.length == currentQuestionIndex) {
        return finishGame()
    }

    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answers => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answers")
        newAnswer.textContent = answers.text
        if (answers.correct) {
            newAnswer.dataset.correct = answers.correct
        }
        $answersConteiner.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    while ($answersConteiner.firstChild) {
        $answersConteiner.removeChild($answersConteiner.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerClicked = event.target
    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answers").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }

        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}


function finishGame(params) {
    const totalQuestion = questions.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = ""

    switch (true) {
        case (performance >= 90):
            message = "Você foi execelente. Parabéns!"
            break;
        case (performance >= 70):
            message = "Você foi muito bem. Parabéns!"
            break;
        case (performance >= 50):
            message = "Você foi bom. Parabéns!"
            break;
        default:
             message = "Você pode melhorar. Tente novamente!"
    }

    $questionsConteiner.innerHTML =
    `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestion} questões!
            <span> ${message} </span>
            <button onclick=window.location.reload() class="button">
                Refazer o Quiz
            </button>
        </p>
    `
}



const questions = [
    {
        question: "Quem é considerado o fundador da Apple Inc.?",
        answers: [
            { text: "Steve Wozniak", correct: false },
            { text: "Tim Cook", correct: false },
            { text: "Bill Gates", correct: false },
            { text: "Steve Jobs", correct: true },
        ]
    },
    {
        question: "O que significa a sigla HTML em termos de programação web?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HyperText Markup", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false },
        ]
    },
    {
        question: "Quem fundou a Microsoft?",
        answers: [
            { text: "Steve Jobs", correct: false },
            { text: "Jeff Bezos", correct: false },
            { text: " Bill Gates", correct: true },
            { text: "Larry Page", correct: false },
        ]
    },
    {
        question: "Qual é o personagem fictício da Nintendo, conhecido por ser um encanador que vive no Reino dos Cogumelos?",
        answers: [
            { text: "Mario", correct: true },
            { text: "Luigi", correct: false },
            { text: "Pac-Man", correct: false },
            { text: "Sonic", correct: false },
        ]
    },
    {
        question: "Quem escreveu a famosa peça de teatro Romeu e Julieta?",
        answers: [
            { text: "Jane Austen", correct: false },
            { text: " Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Mark Twain", correct: false },
        ]
    },
    {
        question: "Qual é o elemento químico símbolo Fe?",
        answers: [
            { text: "Flúo", correct: false },
            { text: "Ferro", correct: true },
            { text: "Fósforo", correct: false },
            { text: "Prata", correct: false },
        ]
    },
    {
        question: "Qual é o planeta mais próximo do Sol?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Marte", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mercúrio", correct: true },
        ]
    }
]
