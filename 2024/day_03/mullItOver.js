import fs from 'fs';

function extractMul(data) {
  const regexp = /mul\(\d{1,3},\d{1,3}\)/g;
  const array = [...data.matchAll(regexp)];
  return array.map(extractedMul => extractedMul[0]);
}

function extractConditionalMul(data) {
  const regexp = /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/gm;
  const array = [...data.matchAll(regexp)];
  return array.map(extractedMul => extractedMul[0]);
}

function multiplyMul(mul) {
  const values = mul.slice(4, -1).split(",");
  return values[0] * values[1];
}

async function generatePart1Answer() {
  // const filepath = "./testInput.txt"; // relative to directory the file is being run in.
  const filepath = "./input.txt";
  const data = await fs.promises.readFile(filepath, 'utf8');
  const mul = extractMul(data);

  const mulSum = mul.reduce((acc, cur) => {
    const product = multiplyMul(cur);
    return acc + product;
  }, 0)

  console.log(mulSum);
}

async function generatePart2Answer() {
  // const filepath = "./part2TestInput.txt"; // relative to directory the file is being run in.
  const filepath = "./input.txt";
  const data = await fs.promises.readFile(filepath, 'utf8');
  const mul = extractConditionalMul(data);

  let mulEnabled = true;
  const mulSum = mul.reduce((acc, cur) => {
    let product = 0;
    if (cur === "don't()") {
      mulEnabled = false;
    } else if (cur === "do()") {
      mulEnabled = true;
    } else if (mulEnabled) {
      product = multiplyMul(cur)
    }

    return acc + product;
  }, 0)

  console.log(mulSum);
}

generatePart1Answer();
generatePart2Answer();