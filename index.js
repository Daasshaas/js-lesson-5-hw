const keys = ['a','s','d','f','j','k','l',';','1','2'];
let currentKeyIndex = 0;
let gameActive = true;

const elKey = document.getElementById('key');
const elHint = document.getElementById('hint');
const elBar = document.getElementById('bar');
const newGameBtn = document.getElementById('newGame');
const showStepsBtn = document.getElementById('showSteps');

const p = window.PNotify || {};
function pSuccess(text){
  if (p && typeof p.success === 'function') return p.success({ text });
  alert(text);
}
function pError(text){
  if (p && typeof p.error === 'function') return p.error({ text });
  alert(text);
}
function pInfo(text){
  if (p && typeof p.info === 'function') return p.info({ text });
  alert(text);
}


function updateUI(){
  const k = keys[currentKeyIndex];
  if (k) {
    elKey.textContent = k.toUpperCase();
    elHint.textContent = `Натисніть клавішу «${k}»`;
  } else {
    elKey.textContent = '✓';
    elHint.textContent = 'Ви пройшли всі клавіші!';
  }
  const progress = Math.round((currentKeyIndex / keys.length) * 100);
  elBar.style.width = `${progress}%`;
}

function startNewGame(startIndex = 0){
  currentKeyIndex = startIndex;
  gameActive = true;
  updateUI();
  pInfo(`Нова гра: натисніть клавішу «${keys[currentKeyIndex]}».`);
}

window.addEventListener('keydown', (e) => {
  if (!gameActive) return;

  
  const pressed = String(e.key).toLowerCase();
  const expected = String(keys[currentKeyIndex]).toLowerCase();

  e.preventDefault();

  if (pressed === expected) {
    currentKeyIndex++;
    if (currentKeyIndex >= keys.length) {
      elBar.style.width = '100%';
      pSuccess('Вітаю! Ви пройшли всі клавіші. Натисніть «Нова гра», щоб зіграти ще.');
      elKey.textContent = '✓';
      elHint.textContent = 'Готово!';
      gameActive = false;
      return;
    }
    updateUI();
    pSuccess('Правильно! Йдемо далі.');
  } else {
    pError(`Неправильно: ви натиснули «${e.key}», очікувалась «${keys[currentKeyIndex]}».`);
  }
});


window.addEventListener('keypress', (e) => {
  if (gameActive) e.preventDefault();
});


newGameBtn.addEventListener('click', () => {
  const start = Math.floor(Math.random() * keys.length);
  startNewGame(start);
  pInfo('Нова гра запущена. Дивіться підказку та натискайте клавіші по черзі.');
});

showStepsBtn.addEventListener('click', () => {
  const steps = [
    '1) Натисніть «Нова гра» — вибереться поточна клавіша.',
    '2) Дивіться на велику підказку в полі — це клавіша, яку треба натиснути.',
    '3) Натисніть клавішу на клавіатурі. Подія keydown перевірить правильність.',
    '4) Якщо правильно — гра перейде до наступної клавіші. Якщо ні — отримаєте повідомлення про помилку (PNotify).',
    '5) Подія keypress блокує стандартну поведінку сторінки під час гри (щоб пробіл не прокручував сторінку тощо).',
    '6) Коли пройдете всі клавіші — побачите повідомлення про перемогу. Натисніть «Нова гра», щоб почати заново.'
  ].join('<br>');
  pInfo(steps);
});


startNewGame(0);



const chartData = {
  labels: ["1","2","3","4","5","6","7","8","9","10",
           "11","12","13","14","15","16","17","18","19","20",
           "21","22","23","24","25","26","27","28","29","30"],
  datasets: [{
    label: "Продажі за останній місяць",
    data: [150,220,180,200,250,300,280,350,400,380,420,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300],
    borderColor: "#2196f3",
    backgroundColor: "rgba(33,150,243,0.2)",
    borderWidth: 2,
    fill: true
  }]
};

if (typeof Chart === 'undefined') {
  console.error('Chart.js не знайдено — перевір підключення CDN.');
} else {
  const ctx = document.getElementById('sales-chart').getContext('2d');
  const salesChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}