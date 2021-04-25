import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { invoicesController } from "./controllers/invoicesController";
import { timesheetsController } from "./controllers/timesheetsController";
import { timeEntriesController } from "./controllers/timeEntriesController";
import { Invoice } from "./domain/models/invoice";
import { Project } from "./domain/models/project";
import { Timesheet } from "./domain/models/timesheet";
import { TimeEntry } from "./domain/models/timeEntry";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

async function main(): Promise<void> {
  await createConnection({
    type: "mariadb",
    host: "192.168.0.171",
    port: 3306,
    username: "sa",
    password: "abc123",
    database: "paidDb",
    logging: true,
    entities: [Invoice, Timesheet, TimeEntry, Project],
  });

  app.use(cors());
  app.use(express.json());
  app.use("/api/invoices", invoicesController);
  app.use("/api/timesheets", timesheetsController);
  app.use("/api/timeEntries", timeEntriesController);

  app.get("/", (req, res) => {
    res.send(
      "<div>Available Controllers:<p>api/invoices</p><p>api/timesheets</p><p>api/timeEntries</p></div>"
    );
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

main();
