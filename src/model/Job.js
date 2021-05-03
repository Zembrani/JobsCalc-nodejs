let data = [
  {
    id: 1,
    name: "Pizzaria",
    "daily-hours": 2,
    "total-hours": 31,
    created_at: Date.now(),
  },
  {
    id: 2,
    name: "Cafetetia",
    "daily-hours": 3,
    "total-hours": 47,
    created_at: Date.now(),
  },
];

module.exports = {
  getData() {
    return data;
  },

  // Permite apenas alterar
  update(newData) {
    if (newData.length === data.length) {
      data = newData
    }
  },

  remove(id) {
    data = data.filter((job) => Number(job.id) !== Number(id))
  },

  insert(newJob) {
    data.push(newJob)
  }
};
