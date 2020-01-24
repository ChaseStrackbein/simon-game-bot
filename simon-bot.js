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
let currentSequenceSpot = 0

const config = { attributes: true, attributeFilter: ['class', 'disabled'], attributeOldValue: true }
const observer = new MutationObserver(onButtonActive)
buttons.forEach(btn => observer.observe(btn, config))

function onButtonActive (mutationsList) {
  const mutation = mutationsList[0]
  if (mutation.attributeName === 'class' &&
  mutation.target.classList.contains('active') &&
  !mutation.oldValue.split(' ').includes('active')) {
    if (currentSequenceSpot === sequence.length) {
      sequence.push(mutation.target)
      return
    }
    currentSequenceSpot++
    return
  }
  
  if (mutation.attributeName === 'disabled' && !mutation.target.disabled) {
    myTurn = true
    takeTurn()
  }
}

async function takeTurn () {
  for (let i = 0; i < sequence.length; i++) {
    sequence[i].dispatchEvent(new Event('mousedown'))
    await wait(50)
  }
  currentSequenceSpot = 0
}

async function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

playBtn.click()
