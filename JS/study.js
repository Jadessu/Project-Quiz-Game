const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const colorInput = document.querySelector("#change-it")


toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

//Event Listeners
colorInput.addEventListener("click", addColor)



//function
function addColor(){
  let userColor = prompt("what color do you want the background to be?")
  document.body.style.backgroundColor = " "+ userColor +" "  
}