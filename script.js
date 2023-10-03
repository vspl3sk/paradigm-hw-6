// для решения будем использовать парадигмы:
// - структурную (нет goto, всё в рамках трех управляющих конструкций),
// - процедурную парадигмы (есть процедуры changeTime, start, stop, pause)

// формируем DOM структуру элементов
let timer = document.getElementById("timer");
let startButton = document.getElementById("startButton");
let pauseButton = document.getElementById("pauseButton");
let stopButton = document.getElementById("stopButton");
const startTimer = [0, 0, 0];
// задаем переменные для секунд, минут и часов
let [s, m, h] = startTimer;
console.log(s);

// задаем переменную для счетчика
let gap;

// метод, который производит изменение времени на 1 сек,
// выстраивает структуру вида чч:мм:сс
// и передает ее в DOM элемент timer, который отрисовывается на странице
function changeTime() {
  s++;
  if (s === 60) {
    m++;
    s = 0;
  }
  if (m === 60) {
    h++;
    m = 0;
  }
  timer.textContent = `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// метод для запуска / продолжения отсчета времени
function start() {
  //создаем элемент gap - метод ежесекундного выполнения (1000 ms) при помощи setInterval
  // или запускаем его, если он уже создан
  gap = setInterval(changeTime, 1000);
  startButton.disabled = true; // деактивируем кнопку Запустить
  pauseButton.disabled = false; // активируем кнопку Пауза
  stopButton.disabled = false; // активируем кнопку Стоп
}

// метод для приостановки таймера
function pause() {
  // останавливаем ранее созданный метод для ежесекндного выполнения
  clearInterval(gap);
  startButton.disabled = false; // активируем кнопку Запустить
  pauseButton.disabled = true; // деактивируем кнопку Пауза
  startButton.textContent = "Продолжить"; // меняем текст на кнопке Запустить на Продолжить
}

// метод для остановки таймера и его очистки
function stop() {
  // останавливаем ранее созданный метод для ежесекндного выполнения
  clearInterval(gap);
  // обнуляем секунды, минуты и часы
  [s, m, h] = startTimer;
  startButton.disabled = false; // активируем кнопку Запустить
  pauseButton.disabled = true; // деактивируем кнопку Пауза
  stopButton.disabled = true; // деактивируем кнопку Стоп
  // выводим обнуленный таймер на страницу
  timer.textContent = "00:00:00";
  startButton.textContent = "Запуск"; // меняем текст на кнопке Продолжить на Запустить
}

// создаем слушателей для события нажатия на кнопки
startButton.addEventListener("click", () => start());
stopButton.addEventListener("click", stop);
pauseButton.addEventListener("click", pause);
