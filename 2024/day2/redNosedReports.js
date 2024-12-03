import { open } from 'node:fs/promises';

async function compileReports() {
  const file = await open('./input.txt');
  // const file = await open('./testInput.txt');
  // const file = await open('./inputEdgeCases.txt'); // should be 10 true
  const reports = [];
  for await (const line of file.readLines()) {
    reports.push(line.split(" "));
  }

  return reports;
}

function isSafe(report) {
  const decreasing = (report[0] - report[1]) > 0;
  const result = {
    safe: true,
    index: null
  }

  for (let i = 0; i < report.length - 1; i++) {
    const difference = decreasing ? parseInt(report[i]) - parseInt(report[i + 1]) : parseInt(report[i + 1]) - parseInt(report[i]);
    if (difference <= 0 || difference > 3) {
      result.safe = false;
      result.index = i + 1;

      return result;
    }
  }

  return result;
}

function calculateSafeReportQty(reports, withDampener = false) {
  return reports.reduce((acc, cur) => {
    let valueToAdd = 0;
    const { safe, index } = isSafe(cur);
    if (safe) {
      valueToAdd = 1;
    } else if (withDampener) {
      const suspectedUnsafeLevelRemoved = [...cur]
      suspectedUnsafeLevelRemoved.splice(index, 1);

      const firstLevelRemoved = [...cur]
      firstLevelRemoved.splice(0, 1);

      const firstSameLevelRemoved = [...cur]
      firstSameLevelRemoved.splice((index - 1), 1);

      valueToAdd = isSafe(suspectedUnsafeLevelRemoved).safe || isSafe(firstLevelRemoved).safe || isSafe(firstSameLevelRemoved).safe ? 1 : 0;
    }

    return acc + valueToAdd;
  }, 0)
}

// I will never remove the first level if that is the issue, need to evaluate if the first level needs to be removed...

// edge test cases gathered from AoC subreddit...
// 7 10 8 10 11, need to remove first 10
// 29 28 27 25 26 25 22 20, need to remove first 25
// if the number before and the number after the index are the same, see what happens if you remove the number before?

async function generatePart1Answer() {
  let reports = await compileReports();
  let totalSafe = calculateSafeReportQty(reports);
  console.log(`Part1 Answer ${totalSafe}`);
}

async function generatePart2Answer() {
  let reports = await compileReports();
  let totalSafe = calculateSafeReportQty(reports, true);
  console.log(`Part2 Answer ${totalSafe}`);
}

generatePart1Answer();
generatePart2Answer();