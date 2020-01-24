// Cache DOM elements
const playBtn = document.getElementById('play')
const buttons = [
  document.getElementById('green'),
  document.getElementById('red'),
  document.getElementById('yellow'),
  document.getElementById('blue')
]

// Store state
let myTurn = false
let sequence = []

const config = { attributes: true, attributeFilter: ['class'], attributeOldValue: true }
const observer = new MutationObserver(onButtonActive)
buttons.forEach(btn => observer.observe(btn, config))

function onButtonActive (mutationsList) {
  const mutation = mutationsList[0]
  debugValue = mutation.oldValue
  if (mutation.target.classList.contains('active') && !mutation.oldValue.split(' ').includes('active')) {
    sequence.push(mutation.target)
  }
}

playBtn.click()
