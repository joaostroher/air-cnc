class Spot {
  get rules() {
    return {
      company: 'required',
      price: 'required',
    };
  }
}

module.exports = Spot;
