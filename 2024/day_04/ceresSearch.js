import { open } from 'node:fs/promises';

const MAS = ["M", "A", "S"];

async function searchArray() {
  const file = await open('./input.txt');
  // const file = await open('./testInput.txt');
  const search = [];

  for await (const line of file.readLines()) {
    search.push(line.split(""));
  }

  return search;
}

function checkDirection(search, position, direction) {
  const limit = { u: 2, r: search[0].length - 3, d: search.length - 3, l: 2 };
  let i = 1;
  let result = true;

  MAS.forEach(l => {
    let letterToCheck;
    switch (direction) {
      case "up":
        letterToCheck = position.y > limit.u ? search[position.y - i][position.x] : null;
        break;
      case "upRight":
        letterToCheck = (position.y > limit.u && position.x < limit.r) ? search[position.y - i][position.x + i] : null;
        break;
      case "right":
        letterToCheck = position.x < limit.r ? search[position.y][position.x + i] : null;
        break;
      case "downRight":
        letterToCheck = (position.y < limit.d && position.x < limit.r) ? search[position.y + i][position.x + i] : null;
        break;
      case "down":
        letterToCheck = position.y < limit.d ? search[position.y + i][position.x] : null;
        break;
      case "downLeft":
        letterToCheck = (position.y < limit.d && position.x > limit.l) ? search[position.y + i][position.x - i] : null;
        break;
      case "left":
        letterToCheck = position.x > limit.l ? search[position.y][position.x - i] : null;
        break;
      case "upLeft":
        letterToCheck = (position.y > limit.u && position.x > limit.l) ? search[position.y - i][position.x - i] : null;
        break;
      default:
        letterToCheck = null;
        console.log(`Error: Invalid direction of ${direction}!`);
    }

    if (letterToCheck !== l) result = false;
    i += 1;
  })

  return result;
}

function xmasSearch(search) {
  const size = { x: search[0].length, y: search.length };
  const directions = ["up", "upRight", "right", "downRight", "down", "downLeft", "left", "upLeft"];
  let count = 0;

  for (let row = 0; row < size.x; row++) {
    for (let col = 0; col < size.y; col++) {
      const position = { x: col, y: row };

      if (search[row][col] === "X") {
        directions.forEach(direction => {
          count = checkDirection(search, position, direction) ? count + 1 : count + 0;
        })
      }
    }
  }

  return count;
}

function validateMasX(search, position) {
  const masX = { upRight: "", downRight: "", downLeft: "", upLeft: "" };
  const MS = ["M", "S"];
  let letterToCheck;

  for (const dir of Object.keys(masX)) {
    switch (dir) {
      case "upRight":
        masX.upRight = search[position.y - 1][position.x + 1];
        if (masX.upRight !== "M" && masX.upRight !== "S") return false;
        masX.downLeft = masX.upRight === "M" ? "S" : "M";
        break;
      case "downRight":
        masX.downRight = search[position.y + 1][position.x + 1];
        if (masX.downRight !== "M" && masX.downRight !== "S") return false;
        masX.upLeft = masX.downRight === "M" ? "S" : "M";
        break;
      case "downLeft":
        letterToCheck = search[position.y + 1][position.x - 1];
        if (letterToCheck !== masX.downLeft) return false
        break;
      case "upLeft":
        letterToCheck = search[position.y - 1][position.x - 1];
        if (letterToCheck !== masX.upLeft) return false;
        break;
      default:
        console.log(`Bad Direction: ${dir}`);
        return null;
    }
  }

  return true;
}

function validPosition(position, size) {
  return position.x > 0 && position.x < size.x - 1 && position.y > 0 && position.y < size.y - 1;
}

function masXSearch(search) {
  const size = { x: search[0].length, y: search.length };
  let count = 0;

  for (let row = 0; row < size.x; row++) {
    for (let col = 0; col < size.y; col++) {
      const position = { x: col, y: row };

      if (search[row][col] === "A" && validPosition(position, size)) {
        count = validateMasX(search, position) ? count + 1 : count + 0;
      }
    }
  }

  return count;
}


async function generatePart1Answer() {
  const search = await searchArray();
  const xmasCount = xmasSearch(search);

  console.log(xmasCount);
}

async function generatePart2Answer() {
  const search = await searchArray();
  const masXCount = masXSearch(search);

  console.log(masXCount);
}

generatePart1Answer();
generatePart2Answer();