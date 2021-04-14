const express = require('express')
const routes = express. Router()

const views = __dirname + "/views/"

const profile = {
	name : "Renato",
	avatar : "https://github.com/zembrani.png",
	"monthly-budget" : 5000,
	"hours-per-day" : 7,
	"days-per-week" : 4,
	"vacation-per-year" : 4,
	"hour-value": 20,
}

const jobs = [
	{
		id: 1,
		name: "Pizzaria",
		"daily-hours": 2,
		"total-hours": 1,
		created_at: Date.now()
	},
	{
		id: 2,
		name: "Cafetetia",
		"daily-hours": 3,
		"total-hours": 47,
		created_at: Date.now()
	}
]

function remainingDays(job) {
	const expectedDays = (job["total-hours"] / job["daily-hours"]).toFixed()

	const createdDate = new Date(job.created_at)
	const deadline = createdDate.getDate() + Number(expectedDays)
	const deadlineInMs = createdDate.setDate(deadline)

	const remainingDaysInMs = deadlineInMs - Date.now()

	const dayInMs = 1000 * 60 * 60 * 24
	const remainingDays = Math.floor(remainingDaysInMs / dayInMs)
	return remainingDays
}


routes.get('/', (req, res) => {

	const updatedJobs = jobs.map((job) =>
	{
		const remaining = remainingDays(job)
		const status = remaining <= 0 ? 'done' : 'progress'
	

		return {
			...job,
			remaining,
			status,
			budget: profile['hour-value'] * job["total-hours"]
		}
	})

	return res.render(views + "index", { jobs : updatedJobs})
})
routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {

	const id = jobs[jobs.length - 1]?.id + 1 || 1

	jobs.push({
		id: id,
		name: req.body.name,
		"daily-hours": req.body["daily-hours"],
		"total-hours": req.body["total-hours"],
		created_at: Date.now()
	})
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))

module.exports = routes;