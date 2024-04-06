class Interpreter {
    constructor() {
      this.variables = {};
    }
  
    interpret(input) {
      // Regular expressions to match different patterns
      const assignmentRegex = /^(\w+)\s*=\s*(.+)$/;
      const printRegex = /^print\s+(.+)$/;
      const arithmeticRegex = /^\s*(\d+)\s*([+\-*\/])\s*(\d+)\s*$/;
  
      const lines = input.split('\n');
      for (const line of lines) {
        let match;
        if ((match = line.match(assignmentRegex))) {
          const [, variable, value] = match;
          this.variables[variable] = this.evaluateExpression(value);
        } else if ((match = line.match(printRegex))) {
          const [, value] = match;
          console.log(this.evaluateExpression(value));
        } else if ((match = line.match(arithmeticRegex))) {
          const [, num1, operator, num2] = match;
          const result = this.performArithmetic(num1, operator, num2);
          console.log(result);
        } else {
          console.error(`Syntax Error: Invalid input '${line}'`);
        }
      }
    }
  
    evaluateExpression(expr) {
      if (!isNaN(expr)) {
        return parseFloat(expr); // Handle numeric literals
      } else if (this.variables[expr]) {
        return this.variables[expr]; // Handle variable references
      } else {
        console.error(`NameError: '${expr}' is not defined`);
        return null;
      }
    }
  
    performArithmetic(num1, operator, num2) {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);
      switch (operator) {
        case '+':
          return num1 + num2;
        case '-':
          return num1 - num2;
        case '*':
          return num1 * num2;
        case '/':
          if (num2 === 0) {
            console.error("ZeroDivisionError: division by zero");
            return null;
          }
          return num1 / num2;
        default:
          console.error(`Invalid Operator: '${operator}'`);
          return null;
      }
    }
  }
  
  // Example usage
  const interpreter = new Interpreter();
  const code = `
  x = 10
  y = 5
  print x + y
  print x - y
  print x * y
  print x / y
  print z  # This line will cause a NameError
  `;
  interpreter.interpret(code);
  