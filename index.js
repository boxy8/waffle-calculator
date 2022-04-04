const calculator = {
    displayValue: "0",
    isEvaluated: true
};

function updateDisplay() {
    const display = document.querySelector(".calculator-screen");
    console.log("Currently: " + calculator.displayValue);
    display.innerHTML = calculator.displayValue.toString()
        .replace(/([\/*+-])(?=\d)/g, " $1 ")
        .replace(/([\/*+-])$/g, " $1")
        .replaceAll("*", "&times")
        .replaceAll("/", "&divide");
}
updateDisplay();

function inputDigit(digit) {
    const {displayValue} = calculator;
    console.log("isEvaluted = ", calculator.isEvaluated);
    calculator.displayValue = (calculator.isEvaluated)    // if expression has been evaluated (or is 0 from beginning)
        ? digit // then we replace the current number 
        : displayValue + digit  // otherwise we append
    ;
}

function inputOperator(operator) {
    const {displayValue} = calculator;
    
    calculator.displayValue = (displayValue.slice(-1).match(/[\/*+-]/))
        ? displayValue.slice(0, -1) + operator
        : displayValue + operator
    ;
}

function inputDecimal(dot) {
    const {displayValue} = calculator;

    if (!(/\.\d*$/).test(calculator.displayValue)) {    // prevent invalid decimal points
        if (calculator.isEvaluated) {
            calculator.displayValue = dot;
        } else {
            calculator.displayValue = displayValue + dot;
        }
    }
}

function evaluate() {
    calculator.displayValue = (Math.round(eval(calculator.displayValue) * 1e10) / 1e10).toString();
}

function resetCalculator() {
    calculator.displayValue = "0";
    calculator.isEvaluated = true;
}

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
    const { target } = event;

    // return if the clicked element is not a button
    if (!target.matches("button")) {
        return;
    }

    if (target.classList.contains("operator")) {
        inputOperator(target.value);
        updateDisplay();
        calculator.isEvaluated = false; // pressing a new key means the new expression is not evaluated yet
        return;
    }
      
    if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
        calculator.isEvaluated = false; // pressing a new key means the new expression is not evaluated yet
        return;
    }

    if (target.classList.contains("equal-sign")) {
        // return if the expression isn't valid i.e. doesn't end in a number
        if (calculator.displayValue.slice(-1).match(/[\/*+-.]/)) {
            return;
        }
        
        evaluate();
        updateDisplay();

        calculator.isEvaluated = true;
        return;
    }
    
    if (target.classList.contains("all-clear")) {
        resetCalculator();  // resets calculator object back to default
        updateDisplay();
        return;
    }
    
    inputDigit(target.value);
    updateDisplay();
    calculator.isEvaluated = false; // pressing a new key means the new expression is not evaluated yet
 });