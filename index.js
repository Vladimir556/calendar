const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
let date = new Date()

const days = document.querySelector('#days')
const month = document.querySelector('#month')

const next = document.querySelector('#next')
const prev = document.querySelector('#prev')


document.addEventListener('DOMContentLoaded', () => {
  fillCalendar(date, days, month)
})

next.addEventListener('click', () => {
  if (date.getMonth() === 11) {
    date = new Date(date.getFullYear() + 1, 0, date.getDate(), 0,0,0)
  } else {
    date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0,0,0)
  }
  fillCalendar(date, days, month)
})


prev.addEventListener('click', () => {
  if (date.getMonth() === 0) {
    date = new Date(date.getFullYear() - 1, 11, date.getDate(), 0,0,0)
  } else {
    date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(), 0, 0, 0)
  }

  fillCalendar(date, days, month)
})

document.addEventListener('DOMContentLoaded', () => {
  fillCalendar(date, days, month)
})


function fillCalendar(date, calendar, calendarTitle) {
  calendar.textContent = ''
  calendarTitle.textContent = `${monthNames[date.getMonth()]} - ${date.getFullYear()}`
  const currentDay = date.getDate()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1,0,0,0)
  const lastDay = getLastDayInMonth(date)

  const lastDayInPrevMonth = new Date(firstDay.getTime() - 86400)

  if (firstDay.getDay() === 0) {
    for (let i = 0, day = lastDayInPrevMonth.getDate(); i < 6; i++, day--) {
      addDayToCalendar(day, calendar, 'prev-month-day')
    }
  } else {
    for (let i = 0, day = lastDayInPrevMonth.getDate() - firstDay.getDay() + 2; i < firstDay.getDay() - 1; i++, day++) {
      addDayToCalendar(day, calendar, 'prev-month-day')
    }
  }

  for (let i = 0, day = 1; i < lastDay.getDate(); i++, day++) {
    if (currentDay === day){
      addDayToCalendar(day, calendar, 'current-day')
    } else {
      addDayToCalendar(day, calendar)
    }
  }

  for (let i = 0; i < 7 - lastDay.getDay(); i++) {
    addDayToCalendar(i + 1, calendar, 'prev-month-day')
  }
}

function getLastDayInMonth(date) {
  if (date.getMonth() === 11) {
    const firstDayInNextMonth = new Date(date.getFullYear() + 1, 0, 1,0,0,0)
    return new Date(firstDayInNextMonth.getTime() - 86400)
  } else {
    const firstDayInNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1,0,0,0)
    return new Date(firstDayInNextMonth.getTime() - 86400)
  }
}

function addDayToCalendar(day, calendar, className) {
  const dayElement = document.createElement('div')
  dayElement.classList.add('day')
  if (className) {
    dayElement.classList.add(className)
  }
  dayElement.textContent = `${day}`
  calendar.append(dayElement)
}
