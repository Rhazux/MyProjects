document.addEventListener('DOMContentLoaded', function() {
    const calculatorScreen = document.querySelector('.calculator-screen');
    const calculatorKeys = document.querySelector('.calculator-keys');

    let prevInput = '0';
    let calculationOperator = '';
    let currentInput = '0';

    function updateScreen(number) {
        calculatorScreen.value = number;
    }

    calculatorKeys.addEventListener('click', function(event) {
        const target = event.target;
        if (!target.matches('button')) {
            return;
        }

        const value = target.value;

        if (target.classList.contains('operator')) {
            calculationOperator = value;
            prevInput = currentInput;
            currentInput = '0';
        } else if (target.classList.contains('decimal')) {
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
        } else if (target.classList.contains('all-clear')) {
            prevInput = '0';
            calculationOperator = '';
            currentInput = '0';
        } else if (value === '=') {
            let result;
            const prev = parseFloat(prevInput);
            const current = parseFloat(currentInput);

            switch (calculationOperator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    result = prev / current;
                    break;
                default:
                    return;
            }

            currentInput = result.toString();
            calculationOperator = '';
        } else {
            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }

        updateScreen(currentInput);
    });
});