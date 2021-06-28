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


const firstAnswer = document.querySelector(".option1")
const secondAnswer = document.querySelector(".option2")
const thirdAnswer = document.querySelector(".option3")
const fourthAnswer = document.querySelector(".option4")

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










/*-------------------------------- Functions --------------------------------*/



