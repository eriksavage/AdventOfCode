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

function sumCorrectPageUpdates(rules, allPageUpdates, unorderedUpdates = []) {
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
    if (validPageSet) {
      validPageSum = validPageSum + Number(pageUpdate[(pageUpdate.length - 1) / 2])
    } else {
      unorderedUpdates.push(pageUpdate);
    }
  }
  return validPageSum;
}

function sumCorrectedPageUpdates(rules, pageUpdates) {
  // sum up the middle page of all page update sets that are in the correct order
  let validPageSum = 0;
  for (const pageUpdate of pageUpdates) {
    const correctedPageUpdate = [];
    for (let i = 0; i < pageUpdate.length; i++) {
      let page = pageUpdate[i];
      let pageRules = rules[page] ?? [];
      const cpuLength = correctedPageUpdate.length;
      if (cpuLength > 0) {
        let corrected = false;
        for (let j = 0; j < cpuLength; j++) {
          if (pageRules.includes(correctedPageUpdate[j])) {
            correctedPageUpdate.splice(j, 0, page);
            corrected = true;
            break;
          }
        }
        if (!corrected) { correctedPageUpdate.push(page); }
      } else {
        correctedPageUpdate.push(page);
      }
    }
    validPageSum = validPageSum + Number(correctedPageUpdate[(correctedPageUpdate.length - 1) / 2]);
  }
  return validPageSum;
}

async function generatePart1Answer() {
  const rules = await extractRules();
  const allPageUpdates = await extractPages();

  const sum = sumCorrectPageUpdates(rules, allPageUpdates);
  console.log(sum);
}

async function generatePart2Answer() {
  const test = false;
  const rules = await extractRules(test);
  const allPageUpdates = await extractPages(test);

  const unorderedUpdates = [];
  sumCorrectPageUpdates(rules, allPageUpdates, unorderedUpdates);
  const sum = sumCorrectedPageUpdates(rules, unorderedUpdates);
  console.log(sum);
}

generatePart1Answer();
generatePart2Answer();