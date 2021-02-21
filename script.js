const eventTitle = document.querySelector('#title')
const eventDate = document.querySelector('#date-picker')
const eventForm = document.querySelector('#countdownForm')
const datePicker = document.querySelector('#date-picker')
const today = new Date().toISOString().split('T')[0]

// set event listener on countdown Form to monitor all input values at once
function checkInput() {
  eventForm.addEventListener('submit', () => {
    if (eventTitle.value === '') {
      return alert('please type an event name')
    }
    if (datePicker.value === '') {
      return alert('please select a date')
    }
  })
}

datePicker.setAttribute("min", today)
checkInput()