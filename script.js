const eventTitle = document.querySelector('#title')
const eventDate = document.querySelector('#date-picker')
const eventForm = document.querySelector('#countdownForm')
const datePicker = document.querySelector('#date-picker')
const today = new Date().toISOString().split('T')[0]

const countdownTitle = document.querySelector('#countdown-title')
const timeEl = document.querySelectorAll('span')

const inputContainer = document.querySelector('#input-container')
const countdownContainer = document.querySelector('#countdown')

let countdownActive
const resetBtn = document.querySelector('#reset-button')

function updateDOM(inputTitle, timeRemaining) {
  countdownTitle.innerText = inputTitle
  const remaining = calculateTime(timeRemaining)
  timeEl[0].innerText = remaining[0]
  timeEl[1].innerText = remaining[1]
  timeEl[2].innerText = remaining[2]
  timeEl[3].innerText = remaining[3]
  // hide input page and switch to countdown page
  inputContainer.hidden = true
  countdownContainer.hidden = false
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
  if (eventTitle.value.trim('') === '') {
    alert('please type an event name')
    return false
  }
  if (datePicker.value === '') {
    alert('please select a date')
    return false
  }
}

function submitCountdown(e) {
  let inputTitle = ''
  let inputDate = ''

  e.preventDefault()
  if (checkInput() === false) {
    return
  }

  inputTitle = e.target.children[0].children[1].value
  inputDate = e.target.children[1].children[1].value

  countdownActive = setInterval(() => {
    const timeRemaining = getCountdownTime(inputDate)
    updateDOM(inputTitle, timeRemaining)
  }, 1000)
}

function resetCountdown(e) {
  // hide countdowns and show input
  inputContainer.hidden = false
  countdownContainer.hidden = true

  clearInterval(countdownActive)
  inputTitle = ''
  inputDate = ''
}

// main code
inputContainer.hidden = false
datePicker.setAttribute("min", today)
eventForm.addEventListener('submit', (e) => submitCountdown(e))
resetBtn.addEventListener('click', (e) => resetCountdown(e))