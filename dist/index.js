"use strict";
window.onload = () => {
    const buttons = document.querySelectorAll("button");
    const screen = document.querySelector("input[name='screen']");
    let operandA = null;
    let operandB = null;
    let screenValue = '';
    let isOperatorSelected = false;
    let isDecimal = false;
    let selectedOperator = '';
    function clearScreen() {
        screen.setAttribute('value', '0');
        operandA = null;
        operandB = null;
        screenValue = '';
        isOperatorSelected = false;
        isDecimal = false;
        selectedOperator = '';
    }
    function invertSign() {
        let num = Number(screen.value);
        num *= -1;
        screen.setAttribute('value', String(num));
    }
    function percentify() {
        const num = Number(screen.value) / 100;
        screenValue = String(num);
        screen.setAttribute('value', screenValue);
    }
    function add(op) {
        if (operandA == null) {
            operandA = Number(screenValue);
        }
        else {
            operandB = Number(screenValue);
            operandA += operandB;
            screen.setAttribute('value', String(operandA));
        }
        selectedOperator = op;
        isOperatorSelected = true;
    }
    function subtract(op) {
        if (operandA == null) {
            operandA = Number(screenValue);
        }
        else {
            operandB = Number(screenValue);
            operandA -= operandB;
            screen.setAttribute('value', String(operandA));
        }
        selectedOperator = op;
        isOperatorSelected = true;
    }
    function multiply(op) {
        if (operandA == null) {
            operandA = Number(screenValue);
        }
        else {
            operandB = Number(screenValue);
            operandA *= operandB;
            screen.setAttribute('value', String(operandA));
        }
        selectedOperator = op;
        isOperatorSelected = true;
    }
    function divide(op) {
        if (operandA == null) {
            operandA = Number(screenValue);
        }
        else {
            operandB = Number(screenValue);
            operandA /= operandB;
            screen.setAttribute('value', String(operandA));
        }
        selectedOperator = op;
        isOperatorSelected = true;
    }
    function process(op) {
        console.log("screenValue: ", screenValue);
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
            add(op);
        }
        else if (op === "−") {
            subtract(op);
        }
        else if (op === "×") {
            multiply(op);
        }
        else if (op === "÷") {
            divide(op);
        }
        else if (op === ".") {
            if (!isDecimal) {
                isDecimal = true;
            }
        }
        else if (op === "=") {
            if (selectedOperator !== '') {
                let temp = selectedOperator;
                selectedOperator = '';
                process(temp);
            }
        }
    }
    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].addEventListener("click", (e) => {
            let target = e.target;
            let value = Number(target.textContent);
            if (value >= 0 && value < 10) {
                let currentValue = screen.value;
                if (currentValue == "0" || isOperatorSelected) {
                    currentValue = "";
                    isOperatorSelected = false;
                }
                if (isDecimal) {
                    currentValue += ".";
                }
                currentValue = currentValue + target.textContent;
                screenValue = currentValue;
                console.log(screenValue);
                screen.setAttribute('value', currentValue);
            }
            else {
                let operator = target.textContent;
                process(operator);
            }
        });
    }
};
