const menu = document.querySelector("#mobile-menu")
const menuLinks = document.querySelector(".navbar__menu")
const navLogo = document.querySelector("#navbar__logo")
// Quiz selections
const quizHtml = document.querySelector(".html")
const quizCss = document.querySelector(".css")
const quizFlexboxGrid = document.querySelector(".flexbox-grid")
const quizJavascript = document.querySelector(".javascript")

//text changes

const topicName = document.querySelector(".topicName")
const topicDescription = document.querySelector(".topicDescription")

//Displays mobile menu by switching to active
const mobileMenu = () => {
    menu.classList.toggle("is-active") 
    menuLinks.classList.toggle('active')
}

menu.addEventListener("click", mobileMenu)

//Show active menu when scrolling
const menuHighlight = () =>{
    const elem = document.querySelector(".highlight")
    const home = document.querySelector("#home-page")
    const quiz = document.querySelector("#quiz-page")
    const study = document.querySelector("#study-page")
    let scrollPosition = window.scrollY
    // console.log(scrollPosition)

    //adds our highlight class to the menu items
    if(window.innerWidth > 960 && scrollPosition < 590){  //not available on phones
       home.classList.add('highlight')
       quiz.classList.remove('highlight')
       return //getting error on click
} else if (window.innerWidth > 960 && scrollPosition <1400){
    quiz.classList.add('highlight')
    home.classList.remove('highlight')
    study.classList.remove('highlight')
    return
} else if (window.innerWidth > 960 && scrollPosition <2345){
    quiz.classList.remove('highlight')
    study.classList.add('highlight')
    return
}

if (elem && window.innerWidth < 960 && scrollPos < 590 || elem){
    elem.classList.remove('highlight')
}
}

document.addEventListener('scroll', menuHighlight)
document.addEventListener('click', menuHighlight)

//close mobile menu when clicking on item

const hideMobileMenu = () =>{
    const menuBars = document.querySelector('is-active')
    if (window.innerWidth <= 768 && menuBars) {
       menu.classList.toggle('is-active')
       menuLinks.classList.remove('active') 
    }
}

menuLinks.addEventListener('click', hideMobileMenu)
navLogo.addEventListener('click', hideMobileMenu)




quizHtml.addEventListener('mouseover', htmlText)
quizHtml.addEventListener('mouseout', removeText)

quizCss.addEventListener('mouseover', cssText)
quizCss.addEventListener('mouseout', removeText)

quizFlexboxGrid.addEventListener('mouseover', flexboxGridText)
quizFlexboxGrid.addEventListener('mouseout', removeText)

quizJavascript.addEventListener('mouseover', javascriptText)
quizJavascript.addEventListener('mouseout', removeText)

quizCss.addEventListener("click", console.log(" Css has been clicked"))

function htmlText(){
    topicName.innerText = "Hypertext Markup Language"
}
function cssText(){
    topicName.innerText = "Cascading Style Sheets"
}
function flexboxGridText(){
    topicName.innerText = "FLEXBOX vs GRID"
}
function javascriptText(){
    topicName.innerText = "JAVASCRIPT"
}

function removeText(){
    topicName.innerText = ""
    topicDescription.innerText = ""

}