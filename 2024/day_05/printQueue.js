import { open } from 'node:fs/promises';

async function extractRules(test = false) {
  const file = await open(test ? './testRules.txt' : './inputRules.txt');
  const rules = {};

  for await (const line of file.readLines()) {
    const pr = line.split("|");
    const page = pr[0];
    const rule = pr[1];

    rules[page] ? rules[page].push(rule) : rules[page] = [rule];
  }

  return rules;
}

async function extractPages(test = false) {
  const file = await open(test ? './testPages.txt' : './inputPages.txt');
  const pages = [];

  for await (const line of file.readLines()) {
    pages.push(line.split(","));
  }

  return pages;
}

function sumCorrectPageUpdates(rules, allPageUpdates) {
  // sum up the middle page of all page update sets that are in the correct order
  let validPageSum = 0;
  for (const pageUpdate of allPageUpdates) {
    const pages = [...pageUpdate];
    let validPageSet = true;
    while (pages.length > 1) {
      let currentPage = pages.pop();
      let pageRules = rules[currentPage];
      for (let page of pages) {
        if (pageRules && pageRules.includes(page)) {
          validPageSet = false
        }
      }
    }
    validPageSum = validPageSum + (validPageSet ? Number(pageUpdate[(pageUpdate.length - 1) / 2]) : 0);
  }
  return validPageSum;
}

async function generatePart1Answer() {
  const rules = await extractRules();
  const allPageUpdates = await extractPages();

  const sum = sumCorrectPageUpdates(rules, allPageUpdates);
  // console.log(rules);
  // console.log(pagesToPrint);
  console.log(sum);



}

generatePart1Answer();