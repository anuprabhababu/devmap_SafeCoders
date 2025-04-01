function evaluateExpression() {
    const expression = document.getElementById('expression').value;
    try {
        const result = eval(expression);
        document.getElementById('result').innerText = 'Result: ' + result;
    } catch (error) {
        document.getElementById('result').innerText = 'Error: Invalid expression';
    }
}
