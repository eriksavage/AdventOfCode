// For example:

// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet
// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

// Consider your entire calibration document. What is the sum of all of the calibration values?
const fs = require("fs");
const text = fs.readFileSync("./calibrationInput.txt", "utf-8");
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const calibrationData = text.split("\n");
let calibrationValues = calibrationData.map(s => {
  let firstNum = null, lastNum = null;

  for (let char in s) {
    if (numbers.includes(s[char])) {
      lastNum = s[char];
      if (firstNum == null) firstNum = s[char];
    }
  }
  return parseInt(`${firstNum}${lastNum}`);
})

let calibrationSum = calibrationValues.reduce((acc, cur) => acc + cur, 0);
console.log(calibrationSum);
