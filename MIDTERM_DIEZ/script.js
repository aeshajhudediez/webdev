let display = document.getElementById("display");
let expression = "";

function appendCharacter(char) {
    if (char === "%" && expression !== "") {
        expression = eval(expression + "/100");
    } else if (char === "." && expression.includes(".")) {
        return;
    } else {
        expression += char;
    }
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    updateDisplay();
}

function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    try {
        if (expression.includes("/0")) {
            display.innerText = "Error";
        } else {
            let result = eval(expression);
            expression = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(4)).toString(); 
            updateDisplay();
        }
    } catch (error) {
        display.innerText = "Error"; 
    }
}

function calculateSquareRoot() {
    try {
        let result = Math.sqrt(eval(expression));
        expression = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(4)).toString();
        updateDisplay();
    } catch (error) {
        display.innerText = "Error";
    }
}

function updateDisplay() {
    display.innerText = expression === "" ? "0" : expression;
}

document.addEventListener("keydown", function(event) {
    if (!isNaN(event.key) || "+-*/.".includes(event.key)) {
        appendCharacter(event.key);
    } else if (event.key === "Enter") {
        calculateResult();
    } else if (event.key === "Backspace") {
        backspace();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});
