const startButtonEl = document.querySelector("button[data-start]");
const stopButtonEl = document.querySelector("button[data-stop]");
const bodyEl = document.querySelector("body");

startButtonEl.addEventListener("click", onButtonStart);
stopButtonEl.addEventListener("click", onButtonStop);

stopButtonEl.disabled = true;
let bind = null;

function onButtonStart(evt){
    startButtonEl.disabled = true;
    stopButtonEl.disabled = false;

    bind = bodyColorChange();
}

function onButtonStop(evt){
    startButtonEl.disabled = false;
    stopButtonEl.disabled = true;

    clearInterval(bind);
}

function bodyColorChange(){
    return setInterval(() => {
        const randomColor = getRandomHexColor();

        bodyEl.style.backgroundColor = randomColor;
    }, 1000);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
