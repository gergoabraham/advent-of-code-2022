const { buildDirectoryTree, traverse } = require("./7i");

const CAPACITY = 70000000;
const NEEDED_FREE_SPACE = 30000000;

module.exports = (input) => {
  const root = buildDirectoryTree(input);

  const folderSizes = [];
  const folderPostOrderCallback = (folderSize) => {
    folderSizes.push(folderSize);
  };

  const takenCapacity = traverse(root, folderPostOrderCallback);

  const freeSpace = CAPACITY - takenCapacity;
  const needToDelete = NEEDED_FREE_SPACE - freeSpace;

  folderSizes.sort((a, b) => a - b);
  const folderSizeToDelete = folderSizes.find((size) => size >= needToDelete);

  return folderSizeToDelete;
};
