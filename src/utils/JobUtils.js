module.exports = {
  remainingDays(job) {
  const expectedDays = (job["total-hours"] / job["daily-hours"]).toFixed()

  const createdDate = new Date(job.created_at)
  const deadline = createdDate.getDate() + Number(expectedDays)
  const deadlineInMs = createdDate.setDate(deadline)

  const remainingDaysInMs = deadlineInMs - Date.now()

  const dayInMs = 1000 * 60 * 60 * 24
  const remainingDays = Math.floor(remainingDaysInMs / dayInMs)
  return remainingDays
},

  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}