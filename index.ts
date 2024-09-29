import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { remultHono } from "remult/remult-hono";
import { JobsController } from "./controllers/job";
import { repo, SqlDatabase } from "remult";
import * as sqlite3 from "sqlite3";
import { Sqlite3DataProvider } from "remult/remult-sqlite3";
import { Job } from "./models/job";

const app = new Hono();

app.get("/", (c) => c.text("Hono meets Node.js"));

const api = remultHono({
  controllers: [JobsController],
  entities: [Job],
  // getUser: async (c: any) => {
  //   const session = c.get("session");
  //   return session.get("user");
  // },
  dataProvider: new SqlDatabase(
    new Sqlite3DataProvider(new sqlite3.Database(".database.sqlite"))
  ),
});

app.get("/job/specific-add", api.withRemult, async (c) => {
  const job = await repo(Job).insert({ title: "Flight Attendant" });

  return c.text(`Added Job: ${job.id}, ${job.title}`);
});

app.route("", api);
serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`); // Listening on http://localhost:3000
});
