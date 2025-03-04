const fs = require('fs');

// const filepath = "./2024/day1/testInput.txt";
const filepath = "./2024/day1/input.txt";

async function getData() {
  const data = await fs.promises.readFile(filepath, 'utf8');
  const space = "   ";
  return data.split("\n").join(space).split(space);
}

function fillLists(array, list1, list2) {
  for (let i = 0; i < array.length; i++) {
    i % 2 === 0 ? list1.push(array[i]) : list2.push(array[i]);
  }
}

function findDistance(list1, list2) {
  let i = 0;
  return list1.reduce((acc, cur) => {
    const distance = Math.abs(cur - list2[i]);
    i++;
    return acc + distance;
  }, 0);
}

function createListNumHash(list) {
  const numHash = {};

  list.forEach(num => {
    let count = numHash[num];
    count === undefined ? numHash[num] = 1 : numHash[num] = count + 1;
  });

  return numHash;
}

function generateSimularityScore(list, numHash) {
  return list.reduce((acc, cur) => {
    score = numHash[cur] === undefined ? 0 : cur * numHash[cur];
    return acc + score;
  }, 0);
}

async function generatePart1Answer() {
  const dataArray = await getData();
  let list1 = [];
  let list2 = [];
  fillLists(dataArray, list1, list2);

  const totalDistance = findDistance(list1.sort(), list2.sort());
  console.log(totalDistance);
}

async function generatePart2Answer() {
  const dataArray = await getData();
  let list1 = [];
  let list2 = [];
  fillLists(dataArray, list1, list2);

  const list2NumHash = createListNumHash(list2);
  const simularityScore = generateSimularityScore(list1, list2NumHash);
  console.log(simularityScore);

}

generatePart1Answer();
generatePart2Answer();


