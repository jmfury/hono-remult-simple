import { describeBackendMethods, remult } from "remult";
import { Job } from "../models/job";

export class JobsController {
  static async findAll() {
    const jobRepo = remult.repo(Job);
    return await jobRepo.find();
  }

  static async insertJob(job: { title: string }) {
    return await remult.repo(Job).insert(job);
  }

  static async saveJob(job: Job) {
    return await remult.repo(Job).save(job);
  }

  static async deleteJob(job: Job) {
    return await remult.repo(Job).delete(job);
  }
  static async find({ id }: Job) {
    return await remult.repo(Job).find({ limit: 1, where: { id } });
  }

  static async setAllCompleted(completed: boolean) {
    for (const job of await remult.repo(Job).find()) {
      await remult.repo(Job).save({ ...job, completed });
    }
  }
}
describeBackendMethods(JobsController, {
  insertJob: {
    allowed: true,
  },
  setAllCompleted: { allowed: true },
});
