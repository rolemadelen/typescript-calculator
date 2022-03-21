"use strict";
window.onload = () => {
    const buttons = document.querySelectorAll("button");
    const screen = document.querySelector("input[name='screen']");
    let screenValue = '';
    let operandA = '';
    let shouldGetNextInput = true;
    let isDecimal = false;
    let selectedOperator = '';
    function init() {
        screen.setAttribute('value', '0');
        screenValue = '';
        operandA = '';
        shouldGetNextInput = true;
    }
    function evaluate(op) {
        if (shouldGetNextInput)
            return;
        if (op !== selectedOperator)
            op = selectedOperator;
        if (operandA === '' || selectedOperator === '') {
            operandA = screenValue || "";
            shouldGetNextInput = true;
        }
        else {
            operandA = String(Function("return " + operandA + op + screenValue)());
            screen.setAttribute('value', operandA);
            shouldGetNextInput = true;
        }
        isDecimal = false;
    }
    function clearScreen() {
        init();
    }
    function invertSign() {
        operandA = String(Number(operandA) * -1);
        screen.setAttribute('value', operandA);
    }
    function percentify() {
        operandA = String(Number(screenValue) / 100.0);
        screenValue = operandA;
        screen.setAttribute('value', operandA);
    }
    function add() {
        evaluate("+");
        selectedOperator = "+";
    }
    function subtract() {
        evaluate("-");
        selectedOperator = "-";
    }
    function multiply() {
        evaluate("*");
        selectedOperator = "*";
    }
    function divide() {
        evaluate("/");
        selectedOperator = "/";
    }
    function process(op) {
        if (op === "C") {
            clearScreen();
        }
        else if (op === "+/−") {
            invertSign();
        }
        else if (op === "%") {
            percentify();
        }
        else if (op === "+") {
            add();
        }
        else if (op === "−") {
            subtract();
        }
        else if (op === "×") {
            multiply();
        }
        else if (op === "÷") {
            divide();
        }
        else if (op === ".") {
            isDecimal = true;
        }
        else if (op === "=") {
            if (selectedOperator === '')
                return;
            operandA = String(Function("return " + operandA + selectedOperator + screenValue)());
            screen.setAttribute('value', operandA);
            shouldGetNextInput = true;
            isDecimal = false;
        }
    }
    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].addEventListener("click", (e) => {
            let target = e.target;
            let value = Number(target.textContent);
            if (value >= 0 && value < 10) {
                let currentValue = screen.value;
                if (shouldGetNextInput) {
                    currentValue = "";
                    shouldGetNextInput = false;
                }
                if (isDecimal && !currentValue.includes(".")) {
                    currentValue += ".";
                }
                currentValue = currentValue + target.textContent;
                screenValue = currentValue;
                screen.setAttribute('value', currentValue);
            }
            else {
                let operator = target.textContent;
                process(operator);
            }
        });
    }
};
