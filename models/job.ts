import { Fields, describeEntity } from "remult";

export class Job {
  id!: string;
  title = "";
  completed = false;
}

describeEntity(
  Job,
  "jobs",
  {
    id: Fields.uuid(),
    title: Fields.string(),
    completed: Fields.boolean(),
  },
  {
    allowApiCrud: true,
  }
);
