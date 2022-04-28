import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInputEl = document.querySelector('#datetime-picker');
const startButtonEl = document.querySelector('button[data-start]');
const daysSpanEl = document.querySelector('span[data-days]');
const hoursSpanEl = document.querySelector('span[data-hours]');
const minutesSpanEl = document.querySelector('span[data-minutes]');
const secondsSpanEl = document.querySelector('span[data-seconds]');

startButtonEl.disabled = true;

startButtonEl.addEventListener("click", () => {
    timer.startTimer();
});

const fp = flatpickr(dateInputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if(selectedDate <= Date.now()){
        Notiflix.Notify.failure("Please choose a date in the future");
    } else{
        startButtonEl.disabled = false;
    }
  },
});

const timer = {
    timerID: null,
    startTimer(){
        this.timerID = setInterval(() =>{
            const currentTime = Date.now();
            const getTime = new Date(dateInputEl.value).getTime();
            const deltaTime = getTime - currentTime;
            const convertTime = convertMs(deltaTime);

            if(deltaTime < 0){
                clearInterval(this.timerID);
                return;
            }

            dateInputEl.disabled = true;
            startButtonEl.disabled = true;
            
            updateSpanTime(convertTime);

        }, 1000)
    }
}



function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, "0");
}

function updateSpanTime({ days, hours, minutes, seconds }){
    daysSpanEl.textContent = pad(days);
    hoursSpanEl.textContent = pad(hours);
    minutesSpanEl.textContent = pad(minutes);
    secondsSpanEl.textContent = pad(seconds)
}