let data = {
  name: "Renato",
  avatar: "https://github.com/zembrani.png",
  "monthly-budget": 5000,
  "hours-per-day": 3,
  "days-per-week": 4,
  "vacation-per-year": 4,
  "hour-value": 20,
};

module.exports = {
  getData() {
    return data;
  },

  update(newData) {
    data = newData
  }
}