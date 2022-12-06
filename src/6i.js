module.exports = (input) => markerFinder(input, 4);

const markerFinder = (input, lengthOfMarker) => {
  const window = new FreqTable();

  for (let bi = 0; bi < input.length; bi++) {
    const b = input[bi];
    window.addOne(b);

    const ai = bi - lengthOfMarker;
    if (ai >= 0) {
      const a = input[ai];
      window.removeOne(a);
    }

    if (window.numberOfUniqueItems === lengthOfMarker) {
      return bi + 1;
    }
  }

  return -1;
};

class FreqTable {
  _table = new Map();

  addOne(c) {
    this._table.set(c, this._table.get(c) + 1 || 1);
  }

  removeOne(c) {
    if (this._table.get(c) > 1) {
      this._table.set(c, this._table.get(c) - 1);
    } else {
      this._table.delete(c);
    }
  }

  get numberOfUniqueItems() {
    return this._table.size;
  }
}

module.exports.markerFinder = markerFinder;
