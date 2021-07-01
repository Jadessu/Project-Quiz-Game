const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const colorInput = document.querySelector("#change-it")
const colorText = document.querySelector("#userColor")


toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

//Event Listeners
colorInput.addEventListener("click", addColor)



//function
function addColor(){
  let userColor = prompt("what color do you want the background to be?")
  document.body.style.backgroundColor = " "+ userColor +" "  
  if (userColor === "yellow" || userColor === "white"){
    colorText.style.color = "black"
  
  } else {
    colorText.style.color = "white"
  }
}

// function contrast(){
// if (userColor === "yellow"){
//   colorText.style.color = "black"

// }
// }
