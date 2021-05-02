const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  save(req, res) {
    const jobs = Job.getData();
    const id = jobs[jobs.length - 1]?.id + 1 || 1;

    jobs.push({
      id: id,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(),
    })

    Job.update(jobs);

    res.redirect("/");
  },

  show(req, res) {
    const jobId = req.params.id;

    const job = Job.getData().find((job) => Number(job.id) === Number(jobId));

    if (!job) return res.send("job not found");

    job.budget = JobUtils.calculateBudget(
      job,
      Profile.getData()["hour-value"]
    );

    return res.render("job-edit", { job });
  },

  update(req, res) {
    const jobId = Number(req.params.id);

    const job = Job.getData().find((job) => Number(job.id) === Number(jobId));

    if (!job) return res.send("job not found");

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    const newJobs = Job.getData().map((job) => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob;
        }
        return job;
      });

    Job.update(newJobs)

    res.redirect("/job/" + jobId);
  },

  delete(req, res) {
    const jobId = req.params.id;

    Job.remove(jobId);

    return res.redirect("/");
  },
};
