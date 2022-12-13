module.exports = (input) => {
  const pairs = input
    .split("\n\n")
    .map((pair) => pair.split("\n").map((signal) => JSON.parse(signal)));

  return pairs
    .map(([a, b]) => comparePackets(a, b))
    .map((result, index) => (result ? index + 1 : 0))
    .reduce((sum, value) => sum + value);
};

const comparePackets = (arrA, arrB) => {
  for (let i = 0; i < arrA.length; i++) {
    const a = arrA[i];
    const b = arrB[i];
    let currentResult = null;

    if (b === undefined) {
      currentResult = false;
    } else if (Array.isArray(a) || Array.isArray(b)) {
      currentResult = comparePackets(toArr(a), toArr(b));
    } else if (a < b) {
      currentResult = true;
    } else if (b < a) {
      currentResult = false;
    }

    if (currentResult !== null) {
      return currentResult;
    }
  }

  if (arrA.length < arrB.length) {
    return true;
  }

  return null;
};

const toArr = (x) => (Array.isArray(x) ? x : [x]);

module.exports.comparePackets = comparePackets;
