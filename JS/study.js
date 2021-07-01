const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const colorInput = document.querySelector("#change-it")
const colorText = document.querySelector("#userColor")
const icon = document.getElementById("icon")
const mySong = new Audio("../Sounds/studyMix.mp3")
const prevButton = document.querySelector("#previous")
const nextButton = document.querySelector("#next")



toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

//Event Listeners
colorInput.addEventListener("click", addColor)
icon.addEventListener("click", play)
prevButton.addEventListener("click", prevSong)
nextButton.addEventListener("click", nextSong)





//function
function addColor(){
  let userColor = prompt("what color do you want the background to be?")
  document.body.style.backgroundColor = userColor
  if (userColor === "yellow" || userColor === "white"){
    colorText.style.color = "black"
  
  } else {
    colorText.style.color = "white"
  }
}

let isPlaying = false
function play(){
  if(isPlaying === false){
      isPlaying = true
      mySong.play()
      mySong.loop = true
      mySong.volume = .1
      icon.src = "../images/pause.png"
  } else{
      isPlaying = false
      mySong.pause()
      mySong.volume = .1
      icon.src = "../images/play.png"
  }
 
}

function prevSong(){
  mySong.currentTime -= 120.00
}

function nextSong(){
  mySong.currentTime += 120.00
}



