const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  index(req, res) {

    const statusCount = {
      total : Job.getData().length,
      done : 0,
      progress : 0
    }

    let jobsHours = 0;

    const updatedJobs = Job.getData().map((job) => {

      const remaining = JobUtils.remainingDays(job);

      const status = remaining <= 0 ? "done" : "progress";

      if (status === "progress") jobsHours += Number(job["daily-hours"])

      statusCount[status] += 1
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, Profile.getData()["hour-value"]),
      };
    });

    const freeHours = Number(Profile.getData()["hours-per-day"]) - jobsHours;

    return res.render("index", { jobs: updatedJobs, profile : Profile.getData(), statusCount, freeHours });
  },
};
