import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { invoicesController } from "./controllers/invoicesController";
import { timesheetsController } from "./controllers/timesheetsController";
import { Invoice } from "./domain/models/invoice";
import { Timesheet } from "./domain/models/timesheet";
import { Project } from "./domain/models/project";

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
    entities: [Invoice, Timesheet, Project],
  });

  app.use(cors());
  app.use(express.json());
  app.use("/api/invoices", invoicesController);
  app.use("/api/timesheets", timesheetsController);

  app.get("/", (req, res) => {
    res.send(
      JSON.stringify({ "Available Controllers": ["invoices", "timesheets"] })
    );
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

main();
