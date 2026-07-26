const display = document.getElementById('display');
const history = document.getElementById('history');

let currentExpression = '';
let lastResult = null;

function appendNumber(num) {
  if (num === '.' && currentExpression.includes('.')) return;
  currentExpression += num;
  updateDisplay();
}

function appendOperator(op) {
  if (currentExpression === '' && op !== '-') return;
  const operators = ['+', '-', '*', '/', '%'];
  const lastChar = currentExpression.slice(-1);
  if (operators.includes(lastChar) && op !== '-') {
    currentExpression = currentExpression.slice(0, -1) + op;
  } else {
    currentExpression += op;
  }
  updateDisplay();
}

function clearDisplay() {
  currentExpression = '';
  lastResult = null;
  display.textContent = '0';
  history.textContent = '';
}

function deleteLast() {
  currentExpression = currentExpression.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  if (currentExpression === '') {
    display.textContent = '0';
    return;
  }
  const displayExpr = currentExpression
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/-/g, '−')
    .replace(/\./g, ',');
  display.textContent = displayExpr;
}

function calculate() {
  if (currentExpression === '') return;
  try {
    const result = eval(currentExpression);
    if (!isFinite(result)) {
      history.textContent = 'Hata: Sıfıra bölünemez';
      currentExpression = '';
      display.textContent = '0';
      return;
    }
    const displayExpr = currentExpression
      .replace(/\*/g, '×')
      .replace(/\//g, '÷')
      .replace(/-/g, '−')
      .replace(/\./g, ',');
    const displayResult = Number(result.toFixed(10)).toString().replace(/\./g, ',');
    history.textContent = displayExpr + ' =';
    display.textContent = displayResult;
    currentExpression = result.toString();
    lastResult = result;
  } catch (e) {
    history.textContent = 'Hata';
    currentExpression = '';
    display.textContent = '0';
  }
}

document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') appendNumber(e.key);
  else if (e.key === '+') appendOperator('+');
  else if (e.key === '-') appendOperator('-');
  else if (e.key === '*') appendOperator('*');
  else if (e.key === '/') { e.preventDefault(); appendOperator('/'); }
  else if (e.key === '%') appendOperator('%');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearDisplay();
});
