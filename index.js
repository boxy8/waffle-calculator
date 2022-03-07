const calculator = {
    displayValue: "0",
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

    calculator.displayValue = (displayValue === "0") 
        ? digit 
        : displayValue + digit 
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

    if (!calculator.displayValue.includes(dot)) {
        if (calculator.displayValue === "0") {
            calculator.displayValue = dot;
        } else {
            calculator.displayValue = displayValue + dot;
        }
    }
}

function evaluate() {
    calculator.displayValue = eval(calculator.displayValue).toString();
}

function resetCalculator() {
    calculator.displayValue = "0";
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
        return;
    }
      
    if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains("equal-sign")) {
        evaluate();
        updateDisplay();
        resetCalculator();
        return;
    }
    
    if (target.classList.contains("all-clear")) {
        resetCalculator();
        updateDisplay();
        return;
    }
    
    inputDigit(target.value);
    updateDisplay();
 });