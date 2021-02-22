const eventTitle = document.querySelector('#title')
const eventDate = document.querySelector('#date-picker')
const eventForm = document.querySelector('#countdownForm')
const datePicker = document.querySelector('#date-picker')
const today = new Date().toISOString().split('T')[0]

const countdownTitle = document.querySelector('#countdown-title')
const timeEl = document.querySelectorAll('span')

const inputContainer = document.querySelector('#input-container')
const countdownContainer = document.querySelector('#countdown')

// set event listener on countdown Form to monitor all input values at once
function updateCountdown() {
  eventForm.addEventListener('submit', (e) => {
    let inputTitle = ''
    let inputDate = ''

    e.preventDefault()
    checkInput()

    inputTitle = e.target.children[0].children[1].value
    inputDate = e.target.children[1].children[1].value

    const timeRemaining = getCountdownTime(inputDate) // get timeRemaining
    updateDOM(inputTitle, timeRemaining)
    // hide input page and switch to countdown page
    inputContainer.hidden = true
    countdownContainer.hidden = false
  })
}

function updateDOM(inputTitle, timeRemaining) {
  countdownTitle.innerText = inputTitle
  const remaining = calculateTime(timeRemaining)
  timeEl[0].innerText = remaining[0]
  timeEl[1].innerText = remaining[1]
  timeEl[2].innerText = remaining[2]
  timeEl[3].innerText = remaining[3]
}


function calculateTime(time) {
  const sec = 1000
  const min = sec * 60
  const hr = min * 60
  const day = hr * 24
  const days = Math.floor(time / day)
  const hours = Math.floor((time % day) / hr)
  const minutes = Math.floor((time % hr) / min)
  const seconds = Math.floor((time % min) / sec)
  const remaining = [days, hours, minutes, seconds]
  return remaining
}


function getCountdownTime(input) {
  let countdownValue = new Date(input).getTime()
  let now = Date.now()
  let timeRemaining = countdownValue - now
  return timeRemaining
}

function checkInput() {
  if (eventTitle.value === '') {
    return alert('please type an event name')
  }
  if (datePicker.value === '') {
    return alert('please select a date')
  }
}

inputContainer.hidden = false
datePicker.setAttribute("min", today)
updateCountdown()