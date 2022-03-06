const calculator = {
    displayValue: '0',
    prevType: 'digit'
};

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.innerHTML = calculator.displayValue;
}

function inputDigit(digit) {
    const {displayValue} = calculator;

    calculator.displayValue = (displayValue === '0') 
        ? digit 
        : calculator.prevType === 'operator' ? displayValue + ' ' + digit : displayValue + digit 
    ;
    calculator.prevType = 'digit';
}

function inputOperator(operator) {
    const {displayValue} = calculator;

    calculator.displayValue = displayValue + ' ' + operator;
    calculator.prevType = 'operator';
}



updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;

    // return if the clicked element is not a button
    if (!target.matches('button')) {
        return;
      }
      
      if (target.classList.contains('operator')) {
        inputOperator(target.value);
        updateDisplay();
        return;
      }
      
      if (target.classList.contains('decimal')) {
        console.log('decimal', target.value);
        return;
      }
    
      if (target.classList.contains('all-clear')) {
        console.log('clear', target.value);
        return;
      }
    
      inputDigit(target.value);
      updateDisplay();
 });