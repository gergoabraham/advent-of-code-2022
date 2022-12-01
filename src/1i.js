module.exports = (input) => {
  let maxCalorie = 0;
  let currentInventory = 0;

  for (const line of [...input.split("\n"), ""]) {
    if (line === "") {
      maxCalorie = Math.max(maxCalorie, currentInventory);
      currentInventory = 0;
    } else {
      currentInventory += +line;
    }
  }

  return maxCalorie;
};
