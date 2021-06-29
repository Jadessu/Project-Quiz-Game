/*-------------------------------- Constants --------------------------------*/
const questions = [
    {
        q:'HTML stands for : ',
        options:['HighText Machine Language', 'HyperText and links Markup Language', 'HyperText Markup Language', 'None of these'],
        answer:2
    },
    {
        q:'The correct sequence of HTML tags for starting a webpage is: ',
        options:['Head - Title - HTML - body', 'HTML - Body - Title - Head', 'HTML - Head - Body - Title', 'HTML - Head - Title - Body'],
        answer:3
    },
    {
        q:'Which of the following element is responsible for making the text bold in HTML?',
        options:['&ltpre&gt', '&lta&gt', '&ltb&gt', '&ltbr&gt'],
        answer:2
    },
    {
        q:'Which of the following tag is used for inserting the largest heading in HTML?',
        options:['&lth3&gt', '&lth1&gt', '&lth5&gt', '&lth6&gt'],
        answer:1
    },
    {
        q:'Which of the following tag is used to insert a line-break in HTML',
        options:['&ltbr&gt', '&lta&gt', '&ltpre&gt', '&ltb&gt'],
        answer:0
    },
    {
        q:'How do you create an unordered list (a list with the list items in bullets) in HTML?',
        options:['&ltul&gt', '&ltol&gt', '&ltli&gt', '&lti&gt'],
        answer:0
    },
    {
        q:'Which of the following tag is used to make the underlined text?',
        options:['&lti&gt', '&ltul&gt', '&ltu&gt', '&ltpre&gt'],
        answer:2
    },
    {
        q:'Which of the following tag is used to add rows in the table?',
        options:['&lttd&gt and &lt/td&gt', '&ltth&gt and &lt/th&gt', '&lttr&gt and &lt/tr&gt', 'None of the above'],
        answer:2
    },
    {
        q:'The &lthr&gt tag in HTML is used for :',
        options:['new line', 'vertical ruler', 'new paragraph', 'horizontal ruler'],
        answer:3
    },
    {
        q:'Which of the following attribute is used to provide a unique name to an element??',
        options:['class', 'id', 'type', 'None of the above'],
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

const navbar = document.querySelector(".navbar-links").children

const winLoseReview = document.querySelector("#timeTook")

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

function winLose(){
    if(endScore <= 70){
        winLoseReview.innerText = "You failed. A minimum score of 70% is required to win the game."
    } else if (endScore >= 100){
        winLoseReview.innerText = "A perfect score! You really are an expert."
    }  else {
        winLoseReview.innerText = "You Won!"
    }
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
	if (min < 1) { timeTook.innerText = `It took you ${sec} seconds to complete the quiz` }
	else if (min < 2) {timeTook.innerText = `It took you ${min} minute and ${sec} seconds to complete the quiz`}
	else {timeTook.innerText = `It took you ${min} minutes and ${sec} seconds to complete the quiz`}
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
}

function clearIt() {
    clearInterval(timerIntervalId)
    /** Do whatever else you need to **/
  }


 