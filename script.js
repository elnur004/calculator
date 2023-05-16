const prevInputEl = document.querySelector('.prev-number');
const currentInputEl = document.querySelector('.current-number');
const numbersEl = document.querySelectorAll('.number');
const operatorEl = document.querySelectorAll('.operator');
const clearAllEl = document.querySelector('.all-clear');
const clearEl = document.querySelector('.clear');
const equalEl = document.querySelector('.equal');

let prevNumber = '';
let currentNumber = '';
let lastOperation = '';
let result = null;
let haveDot = false;

const numberHandler = (e) => {
  const number = e.target.innerText;
  // Check if don't have a '.' then add one.
  if (number === '.' && !haveDot) {
    haveDot = true;
    // If there is a dot then return
  } else if (number === '.' && haveDot) {
    return;
  }
  currentNumber += number;
  currentInputEl.innerText = currentNumber;
};

numbersEl.forEach((number) => {
  number.addEventListener('click', numberHandler);
});

const operation = (e) => {
  const operationName = e.target.innerText;

  if (!currentNumber) return;
  haveDot = false;

  if (prevNumber && currentNumber) {
    mathOperation();
  } else {
    result = +currentNumber;
  }
  clearCurrentNum(operationName);
  lastOperation = operationName;
};

// Cut unnecessary decimals
const correctNum = (num) => {
  return +num.toFixed(6);
};

const mathOperation = () => {
  switch (lastOperation) {
    case '*':
      result = +result * +currentNumber;
      correctNum(result);
      break;
    case '-':
      result = +result - +currentNumber;
      correctNum(result);
      break;
    case '+':
      result = +result + +currentNumber;
      correctNum(result);
      break;
    case '/':
      result = +result / +currentNumber;
      correctNum(result);
      break;
    case '%':
      result = +result % +currentNumber;
      correctNum(result);
      break;
  }
};

const clearCurrentNum = (operatorName) => {
  const editedResult = correctNum(result);
  prevNumber += `${currentNumber} ${operatorName} `;

  prevInputEl.innerText = prevNumber;
  currentInputEl.innerText = editedResult;
  currentNumber = '';
};

operatorEl.forEach((operand) => {
  operand.addEventListener('click', operation);
});

const checkEquality = () => {
  if (!prevNumber || !currentNumber) return;
  haveDot = false;

  mathOperation();
  clearCurrentNum();
  currentInputEl.innerText = '';
  currentNumber = '';
  prevInputEl.innerText = '';
  prevNumber = '';
};

equalEl.addEventListener('click', checkEquality);

const clearAll = () => {
  prevInputEl.innerText = '';
  currentInputEl.innerText = '';
  prevNumber = '';
  currentNumber = '';
  result = '';
};

clearAllEl.addEventListener('click', clearAll);

const clearOne = () => {
  currentInputEl.innerText = currentInputEl.innerText.slice(0, -1);
  if (currentInputEl.innerText === '') {
    prevInputEl.innerText = prevInputEl.innerText = '';
    prevNumber = '';
  }
  currentNumber = currentNumber.slice(0, -1);
};

clearEl.addEventListener('click', clearOne);

const buttonNumbers = (key) => {
  numbersEl.forEach((button) => {
    if (button.innerText === key) button.click();
  });
};

const buttonOperator = (key) => {
  operatorEl.forEach((button) => {
    if (button.innerText === key) button.click();
  });
};

const clickEqualButton = () => equalEl.click();

window.addEventListener('keydown', (e) => {
  if (
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '0'
  ) {
    buttonNumbers(e.key);
  }

  switch (e.key) {
    case '/':
      buttonOperator('/');
      break;
    case '+':
      buttonOperator('+');
      break;
    case '-':
      buttonOperator('-');
      break;
    case '%':
      buttonOperator('%');
      break;
    case '=':
    case 'Enter':
      clickEqualButton();
      break;
    case 'Backspace':
      clearOne();
      break;
    case 'Escape':
      clearAll();
      break;
  }
});
