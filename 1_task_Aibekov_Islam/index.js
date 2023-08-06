const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector(".timer");

const formatTime = (seconds) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${secs}`;
};

const createTimerAnimator = () => {
  let intervalId;

  return (seconds) => {
    clearInterval(intervalId);

    let currentSeconds = seconds;

    intervalId = setInterval(() => {
      if (currentSeconds >= 0) {
        timerEl.textContent = formatTime(currentSeconds);
        currentSeconds--;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  const inputText = inputEl.value;
  const cleanedInput = inputText.replace(/[^\d:]/g, "");

  // Вставляем двоеточия после каждых 2 символов (для часов и минут)
  const formattedInput = cleanedInput
    .replace(/(\d{2})(?=\d)/g, "$1:")
    .substr(0, 8); // Максимальная длина формата "чч:мм:сс"

  inputEl.value = formattedInput;
});

buttonEl.addEventListener("click", () => {
  const timeString = inputEl.value;
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (!isNaN(totalSeconds)) {
    animateTimer(totalSeconds);
    inputEl.value = "";
  }
});
