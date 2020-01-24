// Cache DOM elements
const playBtn = document.getElementById('play')
const buttons = [
  document.getElementById('green'),
  document.getElementById('red'),
  document.getElementById('yellow'),
  document.getElementById('blue')
]

// Store state
let sequence = []

buttons.forEach(btn => btn.addEventListener('click', () => onButtonClick(btn)))

function onButtonClick (btn) {

}

playBtn.click()
