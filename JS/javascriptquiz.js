/*-------------------------------- Constants --------------------------------*/
const questions = [
    {
        q:' In JavaScript, what is a block of statement? ',
        options:['Conditional block', 'block that combines a number of statements into a single compound statement', 'both conditional block and a single statement', 'block that contains a single statement'],
        answer:1
    },
    {
        q:'When interpreter encounters an empty statements, what it will do: ',
        options:['Shows a warning', 'Prompts to complete the statement', 'Throws an error', 'Ignores the statement'],
        answer:3
    },
    {
        q:'The function and var are known as:',
        options:['Keywords', 'Data types', 'Declaration statements', 'Prototypes'],
        answer:2
    },
    {
        q:'Which of the following variables takes precedence over the others if the names are the same?',
        options:['Glorbal variable', 'The local element', 'The two of the above', 'None of the above'],
        answer:1
    },
    {
        q:'Which one of the following is the correct way for calling the JavaScript code?',
        options:['Preprocessor', 'Triggering Event', 'RMI', 'Funtion/Method'],
        answer:3
    },
    {
        q:'Which of the following type of a variable is volatile?',
        options:['Mutable Variable', 'Dynamic Variable', 'Volatile Variable', 'Immutable Variable'],
        answer:0
    },
    {
        q:'TWhen there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints',
        options:['Prints an esception error', 'Prints an overflow error', 'Displays infinity', 'Prints the value as such'],
        answer:2
    },
    {
        q:'In the JavaScript, which one of the following is not considered as an error:',
        options:['Syntax error', 'Missing of semi colons', 'Division by zero', 'Missing of Bracket'],
        answer:2
    },
    {
        q:'In JavaScript, what will be used for calling the function definition expression:',
        options:['Function prototype', 'Function literal', 'Function calling', 'Function declaration'],
        answer:1
    },
    {
        q:'Which of the following one is the property of the primary expression:',
        options:['Contains only keywords', 'basic expressions containing all necessary functions', 'contains variable references alone', 'stand-alone expressions'],
        answer:3
    }
]











/*-------------------------------- Variables --------------------------------*/

let currentIndex;
let index = 0;
let answeredQuestions =[]; // This will be the array of anwered question indexes(target later)
let score = 0;


//timer
let timerIntervalId;
let min, sec, seconds = 0

let endScore = Math.round((score/questions.length)*100)




/*------------------------ Cached Element References ------------------------*/
// navbar toggle
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]


const review = document.querySelector(".review")
const options = document.querySelector(".answers").children
const questionOn = document.querySelector(".questionOutOf")
const question=document.querySelector(".question")
const totalQuestions =document.querySelector(".totalQuestions")
const correctAnswers =document.querySelector(".correctAnswers")
const totalQuestions2 =document.querySelector(".totalQuestions2")
const percentage =document.querySelector(".percentage")

const nextButton = document.querySelector(".btn")
const tryAgainButton = document.querySelector("#tryAgainButton")
const overReview = document.querySelector("#overReview")


const firstAnswer = document.querySelector(".option1")
const secondAnswer = document.querySelector(".option2")
const thirdAnswer = document.querySelector(".option3")
const fourthAnswer = document.querySelector(".option4")

//timer
const timerEl = document.getElementById('timer');
const timeTook = document.querySelector("#timeTook")

//start button
const startButton = document.querySelector("#start-btn")
const startSection = document.querySelector(".start")
const wholeGame = document.querySelector(".hide")

//Theme Changer
const checkbox = document.querySelector(".checkbox")

const winLoseReview = document.querySelector("#timeTook")
const yourTime = document.querySelector("#yourTime")

//Audio

const boo = new Audio("../Sounds/boo.wav")
const clap = new Audio("../Sounds/clapping.mp3")


totalQuestions.innerText = questions.length //how many questions we have











/*----------------------------- Event Listeners -----------------------------*/

nextButton.addEventListener('click', next)
tryAgainButton.addEventListener('click', tryAgain)
toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
  })
checkbox.addEventListener('change', changeTheme)

//Clear interval on page switched.
navbarLinks.addEventListener('click', clearIt)








/*-------------------------------- Functions --------------------------------*/
//pulls a question from the index on load
function pullQuestions(){
    questionOn.innerHTML = index + 1
    question.innerHTML = questions[currentIndex].q;
    firstAnswer.innerHTML = questions[currentIndex].options[0]    
    secondAnswer.innerHTML = questions[currentIndex].options[1]
    thirdAnswer.innerHTML = questions[currentIndex].options[2]
    fourthAnswer.innerHTML = questions[currentIndex].options[3]
    index++
}

//Function to select a random question from our index of questions
function randomQuestionGenerator(){
    let randomNumber = Math.floor(Math.random()*questions.length);
    if(index == questions.length){
        quizOver();
    }
    else{
        if(answeredQuestions.length > 0){
            if(answeredQuestions.includes(randomNumber)){
                randomQuestionGenerator();
            }
            else {
                currentIndex = randomNumber;
                pullQuestions();
            }
        }
        if(answeredQuestions.length == 0){
            currentIndex = randomNumber
            pullQuestions()
        }
        //add the question to list of anwered questions
        answeredQuestions.push(randomNumber)
    }
}

//Function to make user select option before moving on
function stopNext(){
    for(let i=0; i<options.length; i++){
        options[i].classList.add("disabled")

        if(options[i].id == questions[currentIndex].answer){
            options[i].classList.add('correct');
        }
    }
}

//Function to activate next button
function allowNext(){
    for(let i=0; i<options.length; i++){
        options[i].classList.remove("disabled", "correct", "wrong")

    }
}

//Check if the answer is wrong or right
function checkAnswer(element){
    if(element.id == questions[currentIndex].answer){
        element.className="correct"
        review.innerHTML = "You know your stuff!"
        score++
    }
    else {
        element.className="wrong"
        review.innerHTML = "You will get it next time!"   
    }
    stopNext();
}

//Forces user to select an answer before clicking on the Next button
function forceUserToSelect(){
    if(!options[0].classList.contains("disabled")){
        alert("Please select an option")
    }
    else{
        randomQuestionGenerator();
        allowNext();
    }
}

//function to listen to click event on Next button
function next(){
    forceUserToSelect();
    review.innerHTML = ""
}

//Function to restart the quiz
window.onload=function(){
    this.randomQuestionGenerator();
    startTimer()
}

//Displays the quiz-over page if quiz is over
function quizOver(){
    document.querySelector(".quizOver").classList.add("show")
    correctAnswers.innerHTML = score;
    totalQuestions2.innerHTML = questions.length
    percentage.innerHTML=Math.round((score/questions.length)*100) + "%"
    winTime()
    clearInterval(timerIntervalId)
    winLose()
    
}

function tryAgain(){
    window.location.reload();
    startTimer()
}


//TIMER
function startTimer() {
	// Check for an active timer interval
    // If interval exists, clear it and reset seconds to zero
    if (timerIntervalId){
        seconds = 0 
        clearInterval(timerIntervalId)
    }
	
	// Start a new timer interval
    timerIntervalId = setInterval(tick, 1000)
}

function tick() {
	// Increment seconds by 1
    seconds++
	// Call render function
    render()
}

function render() {
	// Calculate min/sec
    min = Math.floor(seconds/60)
    sec = seconds % 60
	// Display current min/sec in the timerEl element
    if (sec < 10){
        timerEl.innerText = `${min}:0${sec}`
    } else {
        timerEl.innerText = `${min}:${sec}`
    }
}

function winTime(){
    winTime = seconds;
	if (min < 1) { yourTime.innerText = `It took you ${sec} seconds to complete the quiz` }
	else if (min < 2) {yourTime.innerText = `It took you ${min} minute and ${sec} seconds to complete the quiz`}
	else {yourTime.innerText = `It took you ${min} minutes and ${sec} seconds to complete the quiz`}
}



function changeTheme(){
    document.body.classList.toggle('dark')
    timerEl.classList.toggle('dark')
}

function clearIt() {
    clearInterval(timerIntervalId)
    /** Do whatever else you need to **/
  }

  function winLose(){
    if(score <= 7){
        winLoseReview.innerText = "You failed. A minimum score of 70% is required to win the game." 
        boo.play()
        boo.volume = .2
    } else if (score >= 10){
        winLoseReview.innerText = "A perfect score! You are a Javascript expert."
        clap.play()
        clap.volume = .2
    }  else {
        winLoseReview.innerText = "You Won!"
        clap.play()
        clap.volume = .2
    }
}
