const fs = require('fs');
// Interpreter made with Javascript
// Programming Language Name: Baksan
class Interpreter {
  // The design is interpreter design pattern
  // Where each line of code is parsed and executed one by one
  constructor() {
      // Regular expressions for language features
      this.arithmeticRegex = /^(\d+)(\s*[\+\-\*\/%]\s*\d+)+$/;; // 1. doing basic operations (+,-,*,/,%)
      this.printRegex = /^imprenta\s+['"](.*)['"]/;              // 2. prints a string or any pattern to the screen or file
      this.fileInputRegex = /^file_input\s+['"](.*)['"]/;     // 3. Uses data from a file as input
  }

  interpretFile(fileName) {
      // Read the contents of the file
      fs.readFile(fileName, 'utf8', (err, data) => {
          if (err) {
              console.error(err);
              return;
          }
          // Split the contents by lines and interpret each line
          const lines = data.split('\n');
          for (let i = 0; i < lines.length; i++) {
              try {
                  this.interpretLine(lines[i]);
              } catch (error) {
                  console.error(`Syntax error in line ${i + 1}:`, error.message);
                  break;
              }
          }
      });
  }

  // Checks if the line is in either valid regex and run the respective function
  interpretLine(line) {
      if (this.arithmeticRegex.test(line)) {
          this.evaluateArithmetic(line);
      } else if (this.printRegex.test(line)) {
          this.printString(line);
      } else if (this.fileInputRegex.test(line)) {
          this.readFileInput(line);
      } else {
          throw new Error("Invalid syntax");
      }
  }

  evaluateArithmetic(expression) {
      // Code to evaluate arithmetic expressions
      console.log(eval(expression));
  }

  printString(statement) {
      const match = statement.match(this.printRegex);
      const stringToPrint = match[1];
      console.log(stringToPrint);
      // Code to print string
  }

  readFileInput(statement) {
      const match = statement.match(this.fileInputRegex);
      const fileName = match[1];
      // Read the contents of the file
      fs.readFile(fileName, 'utf8', (err, data) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log("File content:", data);
          // Interpret the contents line by line
          data.split('\n').forEach(line => this.interpretLine(line));
      });
  }
}

module.exports = Interpreter;
