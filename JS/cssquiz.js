/*-------------------------------- Constants --------------------------------*/
const questions = [
    {
        q:' Which of the following selector matches a element based on its id? ',
        options:['The Id Selector', 'The Universal Selector', 'The Descendant Selector', 'The Class Selector'],
        answer:0
    },
    {
        q:'Which of the following defines a relative measurement for the height of a font in em spaces? ',
        options:['%', 'cm', 'em', 'ex'],
        answer:2
    },
    {
        q:'Which of the following property is used to increase or decrease how bold or light a font appears?',
        options:['font-family', 'font-style', 'font-variant', 'font-weight'],
        answer:3
    },
    {
        q:'Which of the following property is used to control the flow and formatting of text?',
        options:['white-space', 'text-shadow', 'text-decoration', 'text-transform'],
        answer:0
    },
    {
        q:'Which of the following property changes the style of top border?',
        options:['border-bottom-style', 'border-top-style', 'border-left-style', 'border-right-style'],
        answer:1
    },
    {
        q:'The property in CSS used to change the background color of an element is -?',
        options:['bgcolor', 'color', 'background-color', 'All of the above'],
        answer:2
    },
    {
        q:'The property in CSS used to change the text color of an element is -',
        options:['bgcolor', 'color', 'background-color', 'All of the above'],
        answer:1
    },
    {
        q:'The CSS property used to control the elements font-size is -',
        options:['text-style', 'text-size', 'font-size', 'None of the above'],
        answer:2
    },
    {
        q:'The HTML attribute used to define the inline styles is -',
        options:['style', 'styles', 'class', 'None of the above'],
        answer:0
    },
    {
        q:'Are there any negative values allowed in padding property?',
        options:['Yes', 'No', 'Cant say', 'May be'],
        answer:1
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
const navbar = document.querySelector(".navbar")
const nextButton2 = document.querySelector("#nextButton")

const winLoseReview = document.querySelector("#timeTook")
const yourTime = document.querySelector("#yourTime")

const questionBox = document.querySelector(".box")

const boo = new Audio("../Sounds/boo.wav")
const clap = new Audio("../Sounds/clapping.mp3")

totalQuestions.innerText = questions.length //how many questions we have











/*----------------------------- Event Listeners -----------------------------*/

nextButton.addEventListener('click', next)
tryAgainButton.addEventListener('click', tryAgain)
// opt1.addEventListener('click', check)
// opt2.addEventListener('click', check)
// opt3.addEventListener('click', check)
// opt4.addEventListener('click', check)
toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
  })

// startButton.addEventListener('click', hidePage)
// startButton.addEventListener('click', unhidePage)

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
        // document.body.style.backgroundColor = "green"
        
        score++
    }
    else {
        element.className="wrong"
        review.innerHTML = "You will get it next time!"
        // document.body.style.backgroundImage = "url('wrongwallpaper.jpg')"
        
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

// if (Math.round((score/questions.length)*100) < 50){
//     overReview.innerText = "Really? under 50 is terrible"
// } else {
//     overReview.innerText = "at least you got above a 50"
// }

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

// function hidePage(){
//     startSection.classList.add("hide")
// }

// function unhidePage(){
//     wholeGame.classList.remove("hide")
// }


function changeTheme(){
    document.body.classList.toggle('dark')
    timerEl.classList.toggle('dark')
    navbar.classList.toggle('dark')
    nextButton2.classList.toggle('dark')
    questionBox.classList.toggle('dark')
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
        winLoseReview.innerText = "A perfect score! You are a CSS expert."
        clap.play()
        clap.volume = .2
    }  else {
        winLoseReview.innerText = "You Won!"
        clap.play()
        clap.volume = .2
    }
}
