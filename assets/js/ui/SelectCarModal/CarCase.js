class CarCase {
  constructor(data, server) {
    {
      this._data = { ...data };
      this._server = server;
    }
  }

  get caseName() {
    return this._data.caseName || '';
  }

  get id() {
    return this._data.id;
  }

  get name() {
    return this._data.name || '';
  }

  get manufacturer() {
    return this._data.manufacturer || '';
  }

  get yearFrom() {
    return this._data.yearFrom || '';
  }

  get yearTill() {
    return this._data.yearTill || '';
  }
}

export default CarCase;
