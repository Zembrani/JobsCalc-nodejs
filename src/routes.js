const express = require('express')
const routes = express. Router()

const views = __dirname + "/views/"

const Profile = {
    data: {
        name : "Renato",
        avatar : "https://github.com/zembrani.png",
        "monthly-budget" : 5000,
        "hours-per-day" : 7,
        "days-per-week" : 4,
        "vacation-per-year" : 4,
        "hour-value": 20,
    },
    controllers: {
        index(req, res) {
            return  res.render(views + "profile", { profile: Profile.data })
        },
        update(req, res) {
            const data = req.body

            const weekPerYear = 52

            const weeksPerMonth = (weekPerYear - data["vacation-per-year"]) / 12

            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            const monthlyTotalHours = weekTotalHours * weeksPerMonth

            const valueHour = data["monthly-budget"] / monthlyTotalHours 

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "hour-value" : valueHour
            }

            return res.redirect('/profile')
        }
    }
}

const Job = {
    data: [
            {
                id: 1,
                name: "Pizzaria",
                "daily-hours": 2,
                "total-hours": 31,
                created_at: Date.now()
            },
            {
                id: 2,
                name: "Cafetetia",
                "daily-hours": 3,
                "total-hours": 47,
                created_at: Date.now()
            }
        ],
    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) =>
            {
                const remaining = Job.service.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
        
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data['hour-value'] * job["total-hours"]
                }
            })
        
            return res.render(views + "index", { jobs : updatedJobs})
        },

        create(req, res) {
            return res.render(views + "job")
        },

        save(req, res) {
            const id = Job.data[Job.data.length - 1]?.id + 1 || 1
            
            Job.data.push({
                id: id,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            })
            
            res.redirect('/')
        },

        show(req, res) {
            const jobId = req.params.id
    
            const job = Job.data.find(job => Number(job.id) === Number(jobId))
    
            if (!job) return res.send("job not found")

            job.budget = Job.service.calculateBudget(job, Profile.data["hour-value"])
    
            return res.render(views + "job-edit", { job })
        },

        update(req, res) {
            const jobId = Number(req.params.id)

            const job = Job.data.find(job => Number(job.id) === Number(jobId))
    
            if (!job) return res.send("job not found")

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            }

            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)) {
                    job = updatedJob
                }
                return job
            })
            console.log(Job.data);
            
            res.redirect('/job/' + jobId)
        },

        delete(req, res) {
            const jobId = Number(req.params.id)
            
            Job.data = Job.data.filter(job => Number(job.id) !== jobId)

            return res.redirect('/')
        }
    },

    service: {
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
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes;