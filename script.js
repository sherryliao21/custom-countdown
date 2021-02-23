// input page assignments
const inputContainer = document.querySelector('#input-container')
const eventTitle = document.querySelector('#title')
const eventDate = document.querySelector('#date-picker')
const eventForm = document.querySelector('#countdownForm')
const datePicker = document.querySelector('#date-picker')
const today = new Date().toISOString().split('T')[0]
let inputTitle = ''
let inputDate = ''
// countdown page assignments
const countdownContainer = document.querySelector('#countdown')
const countdownTitle = document.querySelector('#countdown-title')
const timeEl = document.querySelectorAll('span')
let savedCountdown
// complete page assignments
const completeContainer = document.querySelector('#complete')
let countdownActive
const resetBtn = document.querySelector('#reset-button')
const completeInfo = document.querySelector('.complete-info')
const completeBtn = document.querySelector('#complete-button')

// functions
function submitCountdown(e) {
  e.preventDefault()
  if (checkInput() === false) {
    return
  }
  inputTitle = e.target.children[0].children[1].value
  inputDate = e.target.children[1].children[1].value
  activateCountdown()
}

function activateCountdown() {
  countdownActive = setInterval(() => {
    const timeRemaining = getCountdownTime(inputDate)
    if (timeRemaining < 0) {
      clearInterval(countdownActive)
      showCompleteInfo()
    } else {
      updateDOM(inputTitle, timeRemaining)
      savedCountdown = { // store countdown info in loaclstorage
        event: inputTitle,
        date: inputDate
      }
      localStorage.setItem('countdown', JSON.stringify(savedCountdown))
    }
  }, 1000)
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

function getCountdownTime(input) {
  let countdownValue = new Date(input).getTime()
  let now = Date.now()
  let timeRemaining = countdownValue - now
  return timeRemaining
}

function showCompleteInfo() {
  completeInfo.innerHTML = `${inputTitle} completed on ${inputDate}`
  completeContainer.hidden = false
  inputContainer.hidden = true
}

function updateDOM(inputTitle, timeRemaining) {
  countdownTitle.innerText = inputTitle
  const remaining = calculateTime(timeRemaining)
  for (let i = 0; i < 4; i++) {
    timeEl[i].innerText = remaining[i]
  }
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

function resetCountdown(e) {
  inputContainer.hidden = false
  completeContainer.hidden = true
  countdownContainer.hidden = true
  clearInterval(countdownActive)
  eventTitle.value = ''
  eventDate.value = ''
  localStorage.removeItem('countdown')
}

function restoreSavedCountdown() {
  if (localStorage.getItem('countdown')) {
    savedCountdown = JSON.parse(localStorage.getItem('countdown'))
    inputTitle = savedCountdown.event
    inputDate = new Date(savedCountdown.date).getTime()
    activateCountdown()
    countdownContainer.hidden = false
  } else {
    inputContainer.hidden = false
  }
}

// main code
restoreSavedCountdown()
datePicker.setAttribute("min", today)
eventForm.addEventListener('submit', (e) => submitCountdown(e))
resetBtn.addEventListener('click', (e) => resetCountdown(e))
completeBtn.addEventListener('click', (e) => resetCountdown(e))