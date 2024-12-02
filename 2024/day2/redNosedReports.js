import { open } from 'node:fs/promises';

async function compileReports() {
  const file = await open('./input.txt');
  // const file = await open('./testInput.txt');
  const reports = [];
  for await (const line of file.readLines()) {
    reports.push(line.split(" "));
  }

  return reports;
}

function isSafe(report) {
  const decreasing = (report[0] - report[1]) > 0;
  let result = true;

  for (let i = 0; i < report.length - 1; i++) {
    const difference = decreasing ? parseInt(report[i]) - parseInt(report[i + 1]) : parseInt(report[i + 1]) - parseInt(report[i]);
    if (difference <= 0 || difference > 3) {
      result = false;
      break;
    }
  }

  return result;
}

function calculateSafeReportQty(reports) {
  return reports.reduce((acc, cur) => {
    const valueToAdd = isSafe(cur) ? 1 : 0;
    return acc + valueToAdd;
  }, 0)
}

async function generatePart1Answer() {
  let reports = await compileReports();
  let totalSafe = calculateSafeReportQty(reports);
  console.log(totalSafe);
}

generatePart1Answer();