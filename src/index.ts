window.onload = () => {
    const buttons: NodeList = document.querySelectorAll("button");
    const screen: HTMLInputElement = document.querySelector("input[name='screen']") as HTMLInputElement;
    let screenValue: string | null = '';
    let operandA: string = '';
    let shouldGetNextInput: boolean = true;
    let isDecimal: boolean = false;
    let selectedOperator: string = '';
    
    function init() {
        screen.setAttribute('value', '0');
        screenValue = '';
        operandA = '';
        shouldGetNextInput = true;
    }

    function evaluate(op: string) {
        if(shouldGetNextInput) return;

        if(op !== selectedOperator) op = selectedOperator;

        if(operandA === '' || selectedOperator === '') {
            operandA = screenValue || "";
            shouldGetNextInput = true
        } else {
            operandA = String(Function("return " + operandA + op + screenValue)());
            screen.setAttribute('value', operandA);
            shouldGetNextInput = true
        }
        isDecimal = false;
    }

    function clearScreen(): void {
        init();
    }

    function invertSign(): void {
        operandA = String(Number(operandA) * -1);
        screen.setAttribute('value', operandA);
    }

    function percentify(): void {
        operandA = String(Number(screenValue) / 100.0);
        screenValue = operandA;
        screen.setAttribute('value', operandA);
    }

    function add(): void {
        evaluate("+");
        selectedOperator = "+";
    }

    function subtract(): void {
        evaluate("-");
        selectedOperator = "-";
    }

    function multiply(): void { 
        evaluate("*");
        selectedOperator = "*";
    }

    function divide(): void {
        evaluate("/");
        selectedOperator = "/";
    }

    function process(op: string | null): void {
        if(op === "C") { 
            clearScreen(); 
        }
        else if(op === "+/−") { 
            invertSign(); 
        }
        else if(op === "%") { 
            percentify(); 
        }
        else if(op === "+") { 
            add();
        }
        else if(op === "−") {
            subtract();
        }
        else if(op === "×") {
            multiply();
        }
        else if(op === "÷") {
            divide();
        }
        else if(op === ".") {
            isDecimal = true;
        }
        else if(op === "=") {
            if(selectedOperator === '') return;
            operandA = String(Function("return " + operandA + selectedOperator + screenValue)());
            screen.setAttribute('value', operandA);
            shouldGetNextInput = true
            isDecimal = false;
        }

        let t: HTMLElement = document.querySelector(".screen > input") as HTMLElement;
        if(operandA.length > 10) {
            t.style.fontSize = String((48 - String(operandA).length)/10) + "rem";
        } else {
            t.style.fontSize = "5.4rem";
        }
    }

    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].addEventListener("click", (e: Event) => {
            let target: HTMLElement = e.target as HTMLElement;
            let value: number = Number(target.textContent);
            if(value >= 0 && value < 10) {
                let currentValue: string = screen.value;
                if (shouldGetNextInput) { 
                    currentValue = ""; 
                    shouldGetNextInput = false;
                }

                if(isDecimal && !currentValue.includes(".")) {
                    currentValue += ".";
                }

                currentValue = currentValue + target.textContent;
                screenValue = currentValue;
                screen.setAttribute('value', currentValue);
            } else {
                let operator: string | null = target.textContent;
                process(operator);
            }
        })
    }
};