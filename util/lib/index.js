const states = require('./states.json');

module.exports = {
  getAbbreviation: (fullName) => {
    const state = states.find((state) => state.name.toLowerCase() === fullName.toLowerCase());
    return state.abbr;
  }
}