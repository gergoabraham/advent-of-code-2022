module.exports = (input) => {
  const root = buildDirectoryTree(input);

  let sumOfSmallFolderSizes = 0;
  const folderPostOrderCallback = (folderSize) => {
    if (folderSize <= 100000) {
      sumOfSmallFolderSizes += folderSize;
    }
  };

  traverse(root, folderPostOrderCallback);

  return sumOfSmallFolderSizes;
};

class Node {
  name;
  size;
  children = new Map();
  parent;

  constructor(parent, name, size) {
    this.parent = parent;
    this.name = name;
    this.size = size;
  }

  addChild(name, childNode) {
    if (!this.children.has(name)) {
      this.children.set(name, childNode);
    }
  }
}

const buildDirectoryTree = (input) => {
  const commandGroups = parseCommandGroups(input);

  const root = new Node(null, "/", "dir");
  let currentNode = root;

  for (const commandGroup of commandGroups) {
    const [command, args] = commandGroup[0];

    if (command === "cd") {
      if (args === "/") {
        currentNode = root;
      } else if (args === "..") {
        currentNode = currentNode.parent;
      } else {
        currentNode = currentNode.children.get(args);
      }
    } else if (command === "ls") {
      for (let i = 1; i < commandGroup.length; i++) {
        const [size, name] = commandGroup[i];

        const child = new Node(currentNode, name, size);
        currentNode.addChild(name, child);
      }
    } else {
      throw new Error(`Unknown command ${command[0]}`);
    }
  }

  return root;
};

const parseCommandGroups = (input) =>
  input
    .split("$ ")
    .filter((x) => x)
    .map((cmd) =>
      cmd
        .split("\n")
        .filter((x) => x)
        .map((line) => line.split(" "))
    );

const traverse = (node, folderPostOrderCallback) => {
  // for files
  if (node.size !== "dir") {
    return +node.size;
  }

  // for folders
  let folderSize = 0;
  for (const [, child] of node.children) {
    folderSize += traverse(child, folderPostOrderCallback);
  }

  // post order callback on folder sizes
  folderPostOrderCallback(folderSize);

  return folderSize;
};

module.exports.buildDirectoryTree = buildDirectoryTree;
module.exports.traverse = traverse;
