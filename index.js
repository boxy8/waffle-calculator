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
    
    calculator.displayValue = (calculator.prevType === 'operator')
        ? displayValue.slice(0, -1) + operator
        : displayValue + ' ' + operator
    ;

    calculator.prevType = 'operator';
}

function inputDecimal(dot) {
    const {displayValue} = calculator;

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue = calculator.prevType === 'operator' ? displayValue + ' ' + dot : displayValue + dot;
    }
    calculator.prevType = 'decimal';
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
        inputDecimal(target.value);
        updateDisplay();
        return;
      }
    
      if (target.classList.contains('all-clear')) {
        console.log('clear', target.value);
        return;
      }
    
      inputDigit(target.value);
      updateDisplay();
 });