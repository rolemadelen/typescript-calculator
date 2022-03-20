window.onload = () => {
    const buttons: NodeList = document.querySelectorAll("button");
    const screen: HTMLInputElement = document.querySelector("input[name='screen']") as HTMLInputElement;
    let operandA: number | null = null;
    let operandB: number | null = null;
    let screenValue: string | null = '';
    let isOperatorSelected: boolean = false;
    let isDecimal: boolean = false;
    let selectedOperator: string = '';

    function clearScreen(): void {
        screen.setAttribute('value', '0');
        operandA = null;
        operandB = null;
        screenValue = '';
        isOperatorSelected = false;
        isDecimal = false;
        selectedOperator = '';
    }

    function invertSign(): void {
        let num: number = Number(screen.value);
        num *= -1;
        screen.setAttribute('value', String(num));
    }

    function percentify(): void {
        const num: number = Number(screen.value) / 100;
        screenValue = String(num);
        screen.setAttribute('value', screenValue);
    }

    function add(op: string): void {
        if(operandA == null) {
            operandA = Number(screenValue);
        } else {
            operandB = Number(screenValue);
            operandA += operandB;
            screen.setAttribute('value', String(operandA));
        }

        selectedOperator = op;
        isOperatorSelected = true;
    }

    function subtract(op: string): void {
        if(operandA == null) {
            operandA = Number(screenValue);
        } else {
            operandB = Number(screenValue);
            operandA -= operandB;
            screen.setAttribute('value', String(operandA));
        }

        selectedOperator = op;
        isOperatorSelected = true;
    }

    function multiply(op: string): void {
        if(operandA == null) {
            operandA = Number(screenValue);
        } else {
            operandB = Number(screenValue);
            operandA *= operandB;
            screen.setAttribute('value', String(operandA));
        }

        selectedOperator = op;
        isOperatorSelected = true;   
    }

    function divide(op: string): void {
        if(operandA == null) {
            operandA = Number(screenValue);
        } else {
            operandB = Number(screenValue);
            operandA /= operandB;
            screen.setAttribute('value', String(operandA));
        }

        selectedOperator = op;
        isOperatorSelected = true;   
    }

    function process(op: string | null): void {
        console.log("screenValue: ", screenValue);
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
            add(op);
        }
        else if(op === "−") {
            subtract(op);
        }
        else if(op === "×") {
            multiply(op);
        }
        else if(op === "÷") {
            divide(op);
        }
        else if(op === ".") {
            if(!isDecimal) {
                isDecimal = true;
            }
        }
        else if(op === "=") {
            if(selectedOperator !== '') {
                let temp: string = selectedOperator;
                selectedOperator = '';
                process(temp);
            }
        }
    }

    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].addEventListener("click", (e: Event) => {
            let target: HTMLElement = e.target as HTMLElement;
            let value: number = Number(target.textContent);
            if(value >= 0 && value < 10) {
                let currentValue: string = screen.value;
                if (currentValue == "0" || isOperatorSelected ) { 
                    currentValue = ""; 
                    isOperatorSelected = false;
                }

                if(isDecimal) {
                    currentValue += ".";
                }
                currentValue = currentValue + target.textContent;
                screenValue = currentValue;
                console.log(screenValue);
                screen.setAttribute('value', currentValue);
            } else {
                let operator: string | null = target.textContent;
                process(operator);
            }
        })
    }
};