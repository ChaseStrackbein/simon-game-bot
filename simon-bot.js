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
let currentSequenceSpot = 0

// Attach observer
const config = { attributes: true, attributeFilter: ['class', 'disabled'], attributeOldValue: true }
const observer = new MutationObserver(onButtonActive)
buttons.forEach(btn => observer.observe(btn, config))

function onButtonActive (mutationsList) {
  const mutation = mutationsList[0]
  // If the button is being marked as active
  if (mutation.attributeName === 'class' &&
  mutation.target.classList.contains('active') &&
  !mutation.oldValue.split(' ').includes('active')) {
    // If it's the latest button, add to sequence
    if (currentSequenceSpot === sequence.length) {
      sequence.push(mutation.target)
      return
    }
    currentSequenceSpot++
    return
  }
  
  // If the buttons are no longer disabled, it's my turn!
  if (mutation.attributeName === 'disabled' &&
    !mutation.target.disabled) {
    myTurn()
  }
}

async function myTurn () {
  for (let i = 0; i < sequence.length; i++) {
    sequence[i].dispatchEvent(new Event('mousedown'))
    await wait(50)
  }
  // Reset sequence to prepare to listen
  currentSequenceSpot = 0
}

async function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Begin play
playBtn.click()
