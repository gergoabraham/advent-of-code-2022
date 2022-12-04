const fs = require("fs");
const prompt = require("prompt-sync")();

const doStuff = async () => {
  const clipboard = (await import("clipboardy")).default;

  console.log(`\n🎄🎄🎄 Advent of Code generator - 2022 🎄🎄🎄\n`);

  const defaultDay = new Date().getDate();
  const day = prompt(`🗓  Which day is it for? (${defaultDay}) `, defaultDay);
  validateNumber(day, "Day");

  const fileNames = {
    input: `./inputs/${day}.js`,
    task1: `./src/${day}i.js`,
    test1: `./src/${day}i.test.js`,
    task2: `./src/${day}ii.js`,
    test2: `./src/${day}ii.test.js`,
  };

  checkForExistingFiles(fileNames);

  console.log(
    "\n📋 Copy the following to the clipboard and then press [Enter]:"
  );
  prompt("👉 Example input...");
  const exampleInput = clipboard.readSync();

  prompt("👉 Example output...");
  const exampleOutputString = clipboard.readSync();
  const exampleOutput = validateNumber(exampleOutputString, "Example output");

  prompt("👉 Riddle input...");
  const input = clipboard.readSync().replace(/[`$\\]/g, (c) => "\\" + c);

  validateIntention(day, exampleInput, exampleOutput, input);

  const test1 = generateTestFileContent(day, "i", exampleInput, exampleOutput);
  const test2 = generateTestFileContent(day, "ii", exampleInput, '"?"');

  try {
    fs.writeFileSync(fileNames.input, generateInputFileContent(input));
    fs.writeFileSync(fileNames.task1, CODE_FILE);
    fs.writeFileSync(fileNames.task2, CODE_FILE);
    fs.writeFileSync(fileNames.test1, test1);
    fs.writeFileSync(fileNames.test2, test2);
  } catch (e) {
    console.log("😿 Something went wrong...");
    console.log(e);
  }
};

const CODE_FILE = `module.exports = (input) => {
  return input;
};
`;

const generateTestFileContent = (day, task, exampleInput, exampleOutput) =>
  `const solver = require("./${day}${task}");

const input = \`${exampleInput}\`;

it("${day}${task}", () => {
  solver(input).should.equal(${exampleOutput});
});
`;

const generateInputFileContent = (input) => `module.exports = \`${input}\`;
`;

const checkForExistingFiles = (fileNames) => {
  const existingFiles = [];

  for (const file in fileNames) {
    if (Object.hasOwnProperty.call(fileNames, file)) {
      const filename = fileNames[file];

      if (fs.existsSync(filename)) {
        existingFiles.push(filename);
      }
    }
  }

  if (existingFiles.length > 0) {
    console.log(
      existingFiles.length > 1
        ? "\n❗️ The following files already exist:"
        : "\n❗️ The following file already exists:"
    );
    existingFiles.forEach((filename) => console.log(`   - ${filename}`));
    console.log("");

    const answer = prompt("Enter [y] if you want to overwrite these files: ");
    if (answer === "y") {
      console.log("Continuing... 💚");
    } else {
      console.log("\nGoodbye then 👋\n");
      process.exit();
    }
  }
};

const validateIntention = (day, exampleInput, exampleOutput, input) => {
  console.log("\nYou added the following inputs:");
  console.log(`   - Day:            ${day}`);
  console.log(`   - Example input:  ${getFirstLine(exampleInput)}`);
  console.log(`   - Example output: ${exampleOutput}`);
  console.log(`   - Riddle input:   ${getFirstLine(input)}`);
  console.log("");

  const answer = prompt("🎄 Ready to generate? [Enter]/Anything else: ");
  if (answer === "") {
    console.log("Generating... 💚\n");
  } else {
    console.log("\nGoodbye then 👋\n");
    process.exit();
  }
};

const getFirstLine = (s) =>
  s.includes("\n") ? s.substring(0, s.indexOf("\n")) + "..." : s;

function validateNumber(userInput, subject) {
  if (userInput === "" || isNaN(userInput)) {
    console.log(`\n❌ ${subject} should be a number! ❌\n`);
    process.exit();
  }

  return Number(userInput);
}

doStuff();
